class User < ActiveRecord::Base
  attr_accessible :password, :username
  validates :username, presence: true, uniqueness: true
  validates :password, presence: true
  
  # In real life, please please PLEASE use a password hash (e.g. BCrypt) and not
  # the direct password text.  This was just a quick and easy way of getting the app working.

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save
    session_token
  end
end
