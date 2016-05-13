class CreateUserVotes < ActiveRecord::Migration
  def change
    create_table :user_votes do |t|
      t.integer :user_id, null: false
      t.integer :post_id, null: false
      t.integer :value, null: false
      t.timestamps
    end

    add_index :user_votes, :post_id
    add_index :user_votes, [:post_id, :user_id], unique: true
  end
end
