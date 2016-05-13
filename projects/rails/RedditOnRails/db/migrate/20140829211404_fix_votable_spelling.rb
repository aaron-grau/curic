class FixVotableSpelling < ActiveRecord::Migration
  def change
    rename_column :user_votes, :voteable_id, :votable_id
    rename_column :user_votes, :voteable_type, :votable_type

  end
end
