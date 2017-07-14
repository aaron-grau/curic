class AnswerChoice < ActiveRecord::Base
  validates :question, :text, presence: true

  belongs_to :question
  has_many :responses
end
