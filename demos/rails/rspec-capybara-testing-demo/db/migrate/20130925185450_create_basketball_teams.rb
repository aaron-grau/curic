class CreateBasketballTeams < ActiveRecord::Migration
  def change
    create_table :basketball_teams do |t|
      t.string :name
      t.string :city

      t.timestamps
    end
  end
end
