require 'singleton'
require 'sqlite3'

class QuestionsDatabase < SQLite3::Database
  include Singleton

  def initialize
    super('questions.db')

    self.results_as_hash = true
    self.type_translation = true
  end

  def self.execute(*args)
    self.instance.execute(*args)
  end

  def self.get_first_row(*args)
    self.instance.get_first_row(*args)
  end

  def self.get_first_value(*args)
    self.instance.get_first_value(*args)
  end

  def self.last_insert_row_id
    self.instance.last_insert_row_id
  end
end
