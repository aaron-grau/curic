require 'action_view'

class Cat < ApplicationRecord
  include ActionView::Helpers::DateHelper

  # freeze ensures that constants are immutable
  CAT_COLORS = %w(black white orange brown).freeze

  belongs_to(
    :owner,
    class_name: "User",
    foreign_key: :user_id
  )

  has_many(
    :rental_requests,
    class_name: :CatRentalRequest,
    dependent: :destroy
  )

  validates(
    :birth_date,
    :color,
    :name,
    :sex,
    :user,
    presence: true
  )

  validates :color, inclusion: CAT_COLORS, unless: -> { color.blank? }
  validates :sex, inclusion: %w(M F), if: -> { sex }
  validate :birth_date_in_the_past, if: -> { birth_date }

  def age
    time_ago_in_words(birth_date)
  end

  private

  def birth_date_in_the_past
    if birth_date && birth_date > Time.now
      errors[:birth_date] << 'must be in the past'
    end
  end
end
