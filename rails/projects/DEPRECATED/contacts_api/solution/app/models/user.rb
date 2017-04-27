# == Schema Information
#
# Table name: users
#
#  id         :integer          not null, primary key
#  username   :string(255)      not null
#  created_at :datetime
#  updated_at :datetime
#

class User < ActiveRecord::Base
  has_many :contacts, dependent: :destroy
  has_many :contact_shares, dependent: :destroy
  has_many :shared_contacts, through: :contact_shares, source: :contact

  validates :username, presence: true, uniqueness: true
end
