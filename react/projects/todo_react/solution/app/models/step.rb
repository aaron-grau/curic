# == Schema Information
#
# Table name: steps
#
#  id      :integer          not null, primary key
#  title   :string           not null
#  body    :string
#  todo_id :integer
#  done    :boolean          not null
#

class Step < ActiveRecord::Base
  validates :title, :todo, presence: true
  validates :done, inclusion: [true, false], default: false
  after_initialize { self.done = false if self.done.nil? }

  belongs_to :todo
end
