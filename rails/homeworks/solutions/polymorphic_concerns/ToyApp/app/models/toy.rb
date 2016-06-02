class Toy < ActiveRecord::Base
  belongs_to :toyable, polymorphic: true
end
