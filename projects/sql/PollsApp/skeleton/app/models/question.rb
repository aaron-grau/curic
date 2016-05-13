class Question < ActiveRecord::Base
  validates :poll, :text, presence: true

  has_many :answer_choices
  belongs_to :poll

  has_many :responses, through: :answer_choices

  def results_n_plus_1
    # N+1 way:
    results = {}
    self.answer_choices.each do |ac|
      results[ac.text] = ac.responses.count
    end
    results
  end

  def results_2_queries
    # 2-queries; all responses transferred:
    results = {}
    self.answer_choices.includes(:responses).each do |ac|
      results[ac.text] = ac.responses.length
    end
    results
  end

  def results_1_query_SQL
    # 1-query way all SQL
    acs = AnswerChoice.find_by_sql([<<-SQL, id])
      SELECT
        answer_choices.text, COUNT(responses.id) AS num_responses
      FROM
        answer_choices
        LEFT OUTER JOIN responses
          ON answer_choices.id = responses.answer_choice_id
      WHERE
        answer_choices.question_id = ?
      GROUP BY
        answer_choices.id
    SQL

    acs.inject({}) do |results, ac|
      results[ac.text] = ac.num_responses; results
    end
  end

  def results
    # 1-query way w/ ActiveRecord
    # less efficient solutions are given above ^
    acs = self.answer_choices
      .select("answer_choices.text, COUNT(responses.id) AS num_responses")
      .joins(<<-SQL).group("answer_choices.id")
        LEFT OUTER JOIN responses
          ON answer_choices.id = responses.answer_choice_id
      SQL

    acs.inject({}) do |results, ac|
      results[ac.text] = ac.num_responses; results
    end
  end
end
