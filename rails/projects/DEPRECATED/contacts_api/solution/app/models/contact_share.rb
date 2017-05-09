# == Schema Information
#
# Table name: contact_shares
#
#  id         :integer          not null, primary key
#  contact_id :integer          not null
#  user_id    :integer          not null
#  created_at :datetime
#  updated_at :datetime
#

class ContactShare < ActiveRecord::Base
  belongs_to :contact
  belongs_to :user

  validates :contact, :user, presence: true
  validates :contact_id, uniqueness: { scope: :user_id }
end

