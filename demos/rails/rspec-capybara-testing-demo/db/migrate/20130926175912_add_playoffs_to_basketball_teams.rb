class AddPlayoffsToBasketballTeams < ActiveRecord::Migration
  def change
    add_column :basketball_teams, :playoffs, :boolean
  end
end
