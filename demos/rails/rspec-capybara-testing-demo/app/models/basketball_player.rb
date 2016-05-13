class BasketballPlayer < ActiveRecord::Base
  attr_accessible :name, :team_id
  belongs_to :basketball_team, foreign_key: :team_id
end
