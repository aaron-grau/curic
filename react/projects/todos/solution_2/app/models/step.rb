class Step < ActiveRecord::Base
  validates :title, :todo, presence: true
  validates :done, inclusion: [true, false], default: false
  after_initialize { self.done = false if self.done.nil? }

  belongs_to :todo

  has_one :user,
  through: :todo,
  source: :user
end
