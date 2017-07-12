class Note < ApplicationRecord
  validates :content, :track_id, :user_id, presence: true

  belongs_to :user
  belongs_to :track
end
