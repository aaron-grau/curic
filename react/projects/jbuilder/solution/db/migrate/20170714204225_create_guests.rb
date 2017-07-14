class CreateGuests < ActiveRecord::Migration[5.1]
  def change
    create_table :guests do |t|
      t.string :name
      t.integer :age
      t.string :favorite_color

      t.timestamps
    end
  end
end
