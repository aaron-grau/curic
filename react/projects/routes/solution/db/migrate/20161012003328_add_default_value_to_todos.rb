class AddDefaultValueToTodos < ActiveRecord::Migration[5.0]
  def change
    change_column :todos, :done, :boolean, :default => false
  end
end
