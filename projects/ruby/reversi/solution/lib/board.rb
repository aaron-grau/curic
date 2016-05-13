require 'colorize'

require_relative './piece'
require_relative './position'

class Board
  def initialize
    setup_grid
  end

  def [](pos)
    @rows[pos.row][pos.col]
  end

  def []=(pos, piece)
    @rows[pos.row][pos.col] = piece
  end

  def out_of_bounds?(pos)
    !([pos.row, pos.col].all? { |coord| (0..7).include?(coord) })
  end

  def has_move?(color)
    (0...8).any? do |row|
      (0...8).any? do |col|
        Piece.valid_move?(self, pos(row, col), color)
      end
    end
  end

  def result
    return nil unless [:white, :black].none? { |color| has_move?(color) }

    black = 0
    white = 0
    @rows.flatten.each do |piece|
      next if piece.nil?

      black += 1 if piece.color == :black
      white += 1 if piece.color == :white
    end

    if white > black
      :white
    elsif black > white
      :black
    else
      :draw
    end
  end

  def render
    str = " 01234567"

    @rows.each_with_index do |row, index|
      str << "\n#{index}"
      str << row.map { |piece| render_piece(piece) }.join
    end

    str
  end

  def print
    puts render
  end

  private
  INIT_COLORS = {
    pos(3, 3) => :white,
    pos(3, 4) => :black,
    pos(4, 3) => :black,
    pos(4, 4) => :white
  }

  def setup_grid
    @rows = (0...8).map do |row|
      (0...8).map do |col|
        nil
      end
    end

    INIT_COLORS.each do |pos, color|
      self[pos] = Piece.new(self, pos, color)
    end
  end

  def render_piece(piece)
    if piece.nil?
      " "
    elsif piece.color == :black
      "◉"
    else
      "◌"
    end
  end
end
