require 'rspec'

require 'board'
require 'position'

describe Board do
  subject(:board) { Board.new }

  it "stores and retrieves a piece" do
    piece = double("piece")
    board[pos(2, 2)] = piece

    expect(board[pos(2, 2)]).to eq(piece)
  end

  it "sets itself up correctly initially" do
    expect(board[pos(3, 3)].color).to eq(:white)
    expect(board[pos(3, 4)].color).to eq(:black)
    expect(board[pos(4, 3)].color).to eq(:black)
    expect(board[pos(4, 4)].color).to eq(:white)

    expect(board[pos(3, 3)].board).to eq(board)
  end

  describe "#has_move?" do
    it "has initial move" do
      expect(board.has_move?(:white)).to eq(true)
      expect(board.has_move?(:black)).to eq(true)
    end

    it "doesn't have move at end" do
      board[pos(3, 3)].flip!
      board[pos(4, 4)].flip!

      expect(board.has_move?(:white)).to eq(false)
    end
  end

  describe "#result" do
    it "doesn't prematurely declare winner" do
      expect(board.result).to be_nil
    end

    it "declares winner with more squares" do
      board[pos(3, 3)].flip!
      board[pos(4, 4)].flip!
      expect(board.result).to eq(:black)
    end

    it "declares a draw if no valid move" do
      allow(Piece).to receive(:valid_move?).and_return(false)
      allow(Position).to receive(:new).and_return(true)
      expect(board.result).to eq(:draw)
    end
  end

  it "renders properly" do
    expect(board.render).to eq(" 01234567\n0        \n1        \n2        \n3   ◌◉   \n4   ◉◌   \n5        \n6        \n7        ")
  end
end
