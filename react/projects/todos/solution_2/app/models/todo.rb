class Todo < ApplicationRecord
  validates :title, :body, presence: true
  validates :done, inclusion: { in: [true, false] }

  belongs_to :user

  has_many :steps
  has_many :taggings
  has_many :tags, through: :taggings, source: :tag

  def update_tags(tag_names)
    tags_ids = tag_names.map do |tag_name|
      Tag.find_or_create_by({ name: tag_name }).id
    end
    self.tag_ids = tags.map(&:id)
  end
end
