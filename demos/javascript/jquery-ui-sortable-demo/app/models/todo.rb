class Todo < ActiveRecord::Base
  validate :body, :presence => true
  validate :list_id, :presence => true
  validate :todo_order, :presence => true, :uniqueness => { :scope => :list_id }, :numericality => { greater_than: 0 }

  belongs_to :list, :class_name => "List", :foreign_key => "list_id"

end
