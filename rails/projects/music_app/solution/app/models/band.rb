class Band < ActiveRecord::Base
  has_many :albums, dependent: :destroy

  validates :name, presence: true, uniqueness: true
end
