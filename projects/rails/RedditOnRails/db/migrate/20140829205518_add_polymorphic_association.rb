class AddPolymorphicAssociation < ActiveRecord::Migration
  def change
    remove_column :user_votes, :post_id

    add_column :user_votes, :voteable_id, :integer, null: false
    add_column :user_votes, :voteable_type, :string, null: false

    add_index :user_votes, [:voteable_id, :voteable_type]
    add_index :user_votes, [:user_id, :voteable_id, :voteable_type], unique: true
  end
end
