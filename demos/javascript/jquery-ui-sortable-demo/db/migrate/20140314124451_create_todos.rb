class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.string :body
      t.integer :list_id
      t.float :todo_order

      t.timestamps
    end
    add_index :todos, :list_id
  end
end
