# == Schema Information
#
# Table name: todos
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  body       :string
#  done       :boolean          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Todo < ActiveRecord::Base
  validates :title, presence: true
  validates :done, inclusion: [true, false], default: false
  after_initialize { self.done = false if self.done.nil? }

  has_many :steps
end
