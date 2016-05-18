class CreateCats < ActiveRecord::Migration
  def change
    create_table :cats do |t|
      t.string :name
      t.integer :age
      t.string :sex
      t.text :biography
      t.string :coat_color

      t.timestamps
    end
  end
end
