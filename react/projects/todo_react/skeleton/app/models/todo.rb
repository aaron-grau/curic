class Todo < ActiveRecord::Base
  validates :title, presence: true
  validates :done, inclusion: [true, false], default: false
  after_initialize { self.done = false if self.done.nil? }
end
