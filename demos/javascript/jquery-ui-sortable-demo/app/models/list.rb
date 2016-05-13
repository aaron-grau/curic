class List < ActiveRecord::Base
  validate :title, :presence => true

  has_many :todos, :class_name => "Todo", :foreign_key => "list_id",
    :dependent => :destroy
end
