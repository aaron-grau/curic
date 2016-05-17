class Poll < ActiveRecord::Base
  validates :author, :title, presence: true

  belongs_to :author, class_name: "User"
  has_many :questions
end
