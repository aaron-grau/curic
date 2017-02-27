class User < ActiveRecord::Base
  has_many :artworks, foreign_key: :artist_id, dependent: :destroy
  has_many :artwork_shares, foreign_key: :viewer_id, dependent: :destroy
  has_many :shared_artworks, through: :artwork_shares, source: :artwork
  has_many :comments, foreign_key: :user_id

  validates :username, presence: true, uniqueness: true
end
