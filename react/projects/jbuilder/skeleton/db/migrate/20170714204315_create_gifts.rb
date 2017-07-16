class CreateGifts < ActiveRecord::Migration[5.1]
  def change
    create_table :gifts do |t|
      t.string :title
      t.string :description
      t.integer :guest_id

      t.timestamps
    end
  end
end
