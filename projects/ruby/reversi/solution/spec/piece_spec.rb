require 'rspec'

require 'piece'
require 'position'

require 'spec_helper'

describe Piece do
  let(:board) { board_double }

  context "with basic piece" do
    subject(:piece) { Piece.new(board, pos(3, 2), :black) }

    it "sets board" do; expect(piece.board).to eq(board); end
    it "sets pos" do; expect(piece.pos).to eq(pos(3, 2)); end
    it "sets color" do; expect(piece.color).to eq(:black); end
  end

  describe "::positions_to_flip_in_dir" do
    it "flips a single position" do
      expect(Piece.positions_to_flip_in_dir(
        board,
        pos(3, 2),
        :black,
        pos(0, 1)
      )).to eq([pos(3, 3)])
    end

    it "flips a line of pieces" do
      board[pos(2, 2)] = Piece.new(board, pos(2, 2), :black)

      expect(Piece.positions_to_flip_in_dir(
        board,
        pos(5, 5),
        :black,
        pos(-1, -1)
      )).to match_array([pos(3, 3), pos(4, 4)])
    end

    it "will return [] if no pieces to flip" do
      expect(Piece.positions_to_flip_in_dir(
        board,
        pos(2, 2),
        :black,
        pos(1, 1)
      )).to be_empty
    end
  end

  describe "::valid_move?" do
    it "returns false if space is occupied" do
      board[pos(2, 2)] = Piece.new(board, pos(2, 2), :black)

      expect(Piece.valid_move?(
        board,
        pos(4, 4),
        :black
      )).to eq(false)
    end

    it "returns false if no piece is flipped" do
      expect(Piece.valid_move?(
        board,
        pos(2, 2),
        :black
      )).to eq(false)
    end

    it "returns true for valid move" do
      expect(Piece.valid_move?(
        board,
        pos(2, 3),
        :black
      )).to eq(true)
    end
  end

  describe "#flip" do
    subject(:piece) { Piece.new(board, pos(0, 0), :black) }

    it "swaps color" do
      piece.flip!
      expect(piece.color).to eq(:white)
    end
  end

  describe "#flip_neighbors" do
    let(:piece) do
      piece = Piece.new(board, pos(3, 2), :black)
      board[pos(3, 2)] = piece

      piece
    end

    before do
      piece.flip_neighbors!
    end

    it "flips a neighbor" do
      expect(board[pos(3, 3)].color).to eq(:black)
    end

    it "doesn't flip non-neighbors" do
      expect(board[pos(4, 4)].color).to eq(:white)
    end
  end

  describe "::place" do
    it "doesn't place in an invalid pos" do
      expect do
        Piece.place(board, pos(2, 2), :white)
      end.to raise_error(InvalidMoveError)
    end

    context "with valid pos" do
      it "places the piece in the board" do
        piece = Piece.place(board, pos(3, 2), :black)

        expect(board[pos(3, 2)]).to eq(piece)
      end

      it "flips pieces" do
        Piece.place(board, pos(3, 2), :black)
        expect(board[pos(3, 3)].color).to eq(:black)
      end
    end
  end
end
