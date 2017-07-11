class CreateNotes < ActiveRecord::Migration[5.1]
  def change
    create_table :notes do |t|
      t.integer :track_id
      t.integer :user_id
      t.text :content

      t.timestamps
    end
  end
end
