class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :parent_comment_id
      t.string :text, null: false
      t.boolean :read, null: false

      t.timestamps
    end
  end
end
