def board_double(positions = {})
  board = double("board")

  positions = {
    pos(3, 3) => Piece.new(board, pos(3, 3), :white),
    pos(3, 4) => Piece.new(board, pos(3, 4), :black),
    pos(4, 3) => Piece.new(board, pos(4, 3), :black),
    pos(4, 4) => Piece.new(board, pos(4, 4), :white)
  }.merge(positions)

  allow(board).to receive(:[]) do |piece_pos|
    positions[piece_pos]
  end
  allow(board).to receive(:[]=) do |piece_pos, piece|
    positions[piece_pos] = piece
  end
  allow(board).to receive(:out_of_bounds?) do |pos|
    !([pos.row, pos.col].all? { |coord| (0..7).include?(coord) })
  end

  board
end
