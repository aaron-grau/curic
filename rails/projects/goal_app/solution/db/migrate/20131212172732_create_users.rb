class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, :null => true
      t.string :password_digest, :null => true
      t.string :session_token, :null => true
      t.timestamps
    end
    add_index :users, :username, :unique => true
    add_index :users, :session_token, :unique => true
  end
end
