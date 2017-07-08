class AddIndecesOnFk < ActiveRecord::Migration
  def change
    add_index :taggings, :tag_topic_id
    add_index :taggings, :shortened_url_id
  end
end
