# == Schema Information
#
# Table name: contacts
#
#  id         :integer          not null, primary key
#  name       :string(255)      not null
#  email      :string(255)      not null
#  user_id    :integer          not null
#  created_at :datetime
#  updated_at :datetime
#

require 'spec_helper'

describe Contact do
  describe '::contacts_for_user_id' do
    it 'returns contacts that are owned by or shared to the user' do
      u = User.create!(username: "tester")
      owned = Contact.create!(owner: u, name: "contact1", email: "c@c.com")

      sharer = User.create!(username: "sharer")
      shared = Contact.create!(owner: sharer, name: "contact2", email: "c2@c.com")
      ContactShare.create!(contact: shared, user: u)

      expect(Contact.contacts_for_user_id(u.id)).to include(owned, shared)
    end
  end
end
