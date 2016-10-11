class Todo < ApplicationRecord
  validates :title, :body, presence: true
  validates :done, inclusion: { in: [true, false] }

  has_many :steps
end
