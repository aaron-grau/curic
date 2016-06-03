class AddUniquenesstoName < ActiveRecord::Migration
  def change
    change_column :toys, :name, :string, unique: true
  end
end
