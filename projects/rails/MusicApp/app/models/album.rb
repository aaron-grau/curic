class Album < ActiveRecord::Base
  belongs_to :band
  has_many :tracks, dependent: :destroy

  # can't use presence validation with boolean field
  validates :band, :name, :year, presence: true
  validates :live, inclusion: { in: [true, false] }
  validates :name, uniqueness: { scope: :band_id }
  validates :year, numericality: { minimum: 1900, maximum: 9000 }
end
