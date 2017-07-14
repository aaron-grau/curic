class CreateCheers < ActiveRecord::Migration
  def change
    create_table :cheers do |t|
      t.integer :giver_id
      t.integer :goal_id
      t.timestamps
    end
    add_index :cheers, :giver_id
    add_index :cheers, :goal_id
  end
end
