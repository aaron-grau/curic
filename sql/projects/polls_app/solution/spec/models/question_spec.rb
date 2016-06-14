require 'rails_helper'
require 'debugger'

RSpec.describe Question, :type => :model do
  let!(:author) { User.create(user_name: "author") }
  let!(:poll) { Poll.create(author: author, title: "testpoll") }
  let!(:q) { Question.create(text: "which test suite is best?", poll: poll) }
  let!(:ac_rspec) { AnswerChoice.create(text: "RSpec", question: q) }
  let!(:ac_mocha) { AnswerChoice.create(text: "Mocha", question: q) }

  before(:each) do
    q.answer_choices = [ac_rspec, ac_mocha]
  end

  describe '#results' do
    it 'returns a hash of choices and counts' do
      expect(q.results).to be_instance_of(Hash)
    end

    it 'returns the choice text as the key' do
      expect(q.results).to include("RSpec" => 0, "Mocha" => 0)
    end

    it 'returns the choice text and correct count of responses' do
      respondent = User.create(user_name: "tester")
      Response.create(respondent: respondent, answer_choice: ac_rspec)
      expect(q.results).to include("RSpec" => 1, "Mocha" => 0)
    end
  end
end
