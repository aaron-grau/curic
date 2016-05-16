class Piece
  attr_reader :board, :color
  attr_accessor :pos

  def initialize(color, board, pos)
    raise 'invalid color' unless [:white, :black].include?(color)
    raise 'invalid pos' unless board.valid_pos?(pos)

    @color, @board, @pos = color, board, pos

    board.add_piece(self, pos)
  end

  def to_s
    " #{symbol} "
  end

  def empty?
    false
  end

  def symbol
    # subclass implements this with unicode chess char
    raise NotImplementedError
  end

  def valid_moves
    moves.reject { |to_pos| move_into_check?(to_pos) }
  end

  private

  def move_into_check?(to_pos)
    test_board = board.dup
    test_board.move_piece!(pos, to_pos)
    test_board.in_check?(color)
  end
end
