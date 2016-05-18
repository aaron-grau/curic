class BasketballTeam < ActiveRecord::Base
  attr_accessible :city, :name, :playoffs
  validates :city, :name, presence: true
  validates :name, uniqueness: true
  scope :playoff_teams, where(:playoffs => true)

  has_many :basketball_players, foreign_key: :team_id
  has_one :fan

  def self.ordered_by_city
    BasketballTeam.order("city")
  end
end
