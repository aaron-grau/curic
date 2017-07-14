class AnswerChoice < ApplicationRecord
  validates :question, :text, presence: true

  # Remember, belongs_to is just a method where the first argument is
  # the name of the association, and the second argument is an options
  # hash.
  belongs_to :question,
    primary_key: :id,
    foreign_key: :question_id,
    class_name: 'Question'

  has_many :responses,
    primary_key: :id,
    foreign_key: :answer_choice_id,
    class_name: 'Response'
end
