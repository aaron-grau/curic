class CreateSubs < ActiveRecord::Migration
  def change
    create_table :subs do |t|
      t.integer :moderator_id, null: false
      t.string :name, null: false
      t.text :description, null: false
      t.timestamps
    end

    add_index :subs, :name, unique: true
  end
end
