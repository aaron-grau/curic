# == Schema Information
#
# Table name: goals
#
#  id         :integer          not null, primary key
#  title      :string(255)
#  private    :boolean          default(FALSE)
#  details    :text
#  completed  :boolean          default(FALSE)
#  user_id    :integer
#  created_at :datetime
#  updated_at :datetime
#

class Goal < ActiveRecord::Base
  validates :title, presence: true, length: { minimum: 6 }
  belongs_to(
    :author,
    class_name: "User",
    foreign_key: :user_id
  )
  has_many :cheers

  include Commentable
  # **NB**: comments association is created in Commentable
  # concern
  # has_many :comments, as: :commentable

  def cheered_by?(user)
    cheers.exists?(giver_id: user.id)
  end
end
