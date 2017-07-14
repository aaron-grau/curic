class Poll < ApplicationRecord
  validates :author, :title, presence: true

  # Remember, belongs_to is just a method where the first argument is
  # the name of the association, and the second argument is an options
  # hash.
  belongs_to :author,
    primary_key: :id,
    foreign_key: :author_id,
    class_name: 'User'

  has_many :questions,
    primary_key: :id,
    foreign_key: :poll_id,
    class_name: 'Question'
end
