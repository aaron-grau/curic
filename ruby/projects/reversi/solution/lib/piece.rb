require_relative './position.rb'

class InvalidMoveError < ArgumentError
end

class Piece
  DIRECTIONS = [
    [-1, -1],
    [-1,  0],
    [-1,  1],
    [ 0, -1],
    [ 0,  1],
    [ 1, -1],
    [ 1,  0],
    [ 1,  1]
  ].map { |(row, col)| pos(row, col) }

  attr_reader :board, :pos, :color

  def self.place(board, pos, color)
    raise InvalidMoveError unless Piece.valid_move?(board, pos, color)

    piece = Piece.new(board, pos, color)
    board[pos] = piece
    piece.flip_neighbors!

    piece
  end

  def initialize(board, pos, color)
    @board, @pos, @color = board, pos, color
  end

  def self.valid_move?(board, pos, color)
    # square occupied:
    return false if board.out_of_bounds?(pos)
    return false unless board[pos].nil?

    # has no valid neighbors to flip:
    DIRECTIONS.any? do |direction|
      not positions_to_flip_in_dir(
        board,
        pos,
        color,
        direction
      ).empty?
    end
  end

  def self.positions_to_flip_in_dir(board, pos, color, direction)
    positions_to_flip = []

    cur_pos = pos + direction
    loop do
      if board.out_of_bounds?(cur_pos)
        return []
      elsif board[cur_pos].nil?
        return []
      elsif board[cur_pos].color == color
        return positions_to_flip
      else
        positions_to_flip << cur_pos
      end

      cur_pos += direction
    end

    raise "should never get here"
  end

  def flip_neighbors!
    DIRECTIONS.each do |direction|
      Piece.positions_to_flip_in_dir(
        board,
        pos,
        color,
        direction
      ).each { |pos| board[pos].flip! }
    end

    nil
  end

  def flip!
    @color = (color == :black) ? :white : :black

    nil
  end
end
