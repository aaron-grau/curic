class CreateSteps < ActiveRecord::Migration
  def change
    create_table :steps do |t|
      t.string :title, null: false
      t.string :body
      t.integer :todo_id
      t.boolean :done, null: false
    end

    add_index :steps, :todo_id
  end
end
