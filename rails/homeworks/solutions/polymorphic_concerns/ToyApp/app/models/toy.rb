class Toy < ActiveRecord::Base
  validates :name, uniqueness: { scope: [:toyable] }
  belongs_to :toyable, polymorphic: true
end
