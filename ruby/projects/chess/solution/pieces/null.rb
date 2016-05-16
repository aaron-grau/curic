require 'singleton'

class NullPiece
  include Singleton

  def moves
    []
  end

  def color
    :none
  end

  def to_s
    "   "
  end

  def empty?
    true
  end
end
