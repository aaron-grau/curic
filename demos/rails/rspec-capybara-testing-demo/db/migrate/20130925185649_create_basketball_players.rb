class CreateBasketballPlayers < ActiveRecord::Migration
  def change
    create_table :basketball_players do |t|
      t.string :name
      t.integer :team_id

      t.timestamps
    end
  end
end
