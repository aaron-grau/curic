class CreateArtworkShares < ActiveRecord::Migration[5.1]
  def change
    create_table :artwork_shares do |t|
      t.integer :artwork_id
      t.integer :viewer_id

      t.timestamps
    end
  end
end
