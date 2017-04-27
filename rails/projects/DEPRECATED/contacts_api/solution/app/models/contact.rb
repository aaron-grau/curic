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

class Contact < ActiveRecord::Base
  has_many :contact_shares
  has_many :shared_users, through: :contact_shares, source: :user
  belongs_to :owner, foreign_key: :user_id, class_name: "User"

  validates :name, :email, :owner, presence: true
  validates :email, uniqueness: { scope: :user_id }

  def self.contacts_for_user_id(user_id)
    joins_cond = <<-SQL
      LEFT OUTER JOIN
        contact_shares ON contacts.id = contact_shares.contact_id
    SQL
    where_cond = <<-SQL
      ((contacts.user_id = :user_id) OR (contact_shares.user_id = :user_id))
    SQL

    Contact
      .joins(joins_cond)
      .where(where_cond, :user_id => user_id)
      .uniq
  end
end
