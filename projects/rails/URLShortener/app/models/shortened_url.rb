class ShortenedUrl < ActiveRecord::Base
  validates :long_url, :short_url, :submitter_id, presence: true
  validates :short_url, uniqueness: true

  belongs_to(
    :submitter,
    class_name: 'User',
    foreign_key: :submitter_id,
    primary_key: :id
  )

  has_many :visits
  # TA: Again, the association would return the same user multiple times. You
  # may uncomment the lambda below to eliminate duplicates in the result set.
  has_many(
    :visitors,
    # -> { distinct },
    through: :visits,
    source: :visitor
  )

  def self.create_for_user_and_long_url!(user, long_url)
    ShortenedUrl.create!(
      submitter_id: user.id,
      long_url: long_url,
      short_url: ShortenedUrl.random_code
    )
  end

  def self.random_code
    loop do
      random_code = SecureRandom.urlsafe_base64(16)
      return random_code unless ShortenedUrl.exists?(short_url: random_code)
    end
  end

  def num_clicks
    visits.count
  end

  def num_uniques
    # TA: You can just write `visitors.count` if you're using the lambda above.
    # visitors.count
    # TA: Alternatively, if your `#visitors` returns duplicates, you can count
    # the unique values like so:
    visits.select("user_id").distinct.count
  end

  def num_recent_uniques
    visits
      .select('user_id')
      .where("created_at > ?", 10.minutes.ago)
      .distinct
      .count
  end
end
