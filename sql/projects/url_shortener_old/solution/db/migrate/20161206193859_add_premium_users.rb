class AddPremiumUsers < ActiveRecord::Migration
  def change
    add_column :users, :premium, :boolean, default: false
  end
end
