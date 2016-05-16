class CreateGoals < ActiveRecord::Migration
  def change
    create_table :goals do |t|
      t.string :title
      t.boolean :private, :default => false
      t.text :details
      t.boolean :completed, :default => false
      t.integer :user_id
      t.timestamps
    end
    add_index :goals, :title
    add_index :goals, :user_id
  end
end
