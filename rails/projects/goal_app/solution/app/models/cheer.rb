class Cheer < ApplicationRecord
  CHEER_LIMIT = 12
  ##
  # Don't let others change the limit!
  ##
  CHEER_LIMIT.freeze

  validates :giver, :goal, presence: true
  validates :goal_id, uniqueness: { scope: :giver_id }

  belongs_to :giver, class_name: :User
  belongs_to :goal
end
