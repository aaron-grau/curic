class AddCheerCountToUsers < ActiveRecord::Migration
  def change
    add_column :users, :cheer_count, :integer
  end
end
