require 'rspec'

require 'game'

describe Game do
  subject(:game) { Game.new(player1, player2, board) }
  let(:player1) { double("player1") }
  let(:player2) { double("player2") }
  let(:board) { double("board") }

  context "after initialization" do
    it "sets current color" do
      expect(game.current_color).to eq(:white)
    end
  end

  describe "#play" do
    before do
      # modify @game_result when you want game to end.
      @game_result = nil
      allow(board).to receive(:result) do
        @game_result
      end

      # don't bother printing.
      allow(board).to receive(:print)

      # don't actually try to place pieces.
      allow(Piece).to receive(:place)
      allow(Position).to receive(:new)
    end

    context "in a single move game" do
      before do
        # play the one turn
        allow(player1).to receive(:get_move) do
          @game_result = :white
          pos(0, 0)
        end
      end

      it "asks player one for his move" do
        expect(player1).to receive(:get_move)
        game.play
      end

      it "plays the player's move" do
        expect(Piece).to receive(:place).with(board, pos(0, 0), :white)
        game.play
      end

      it "ends after one turn" do
        expect(player2).not_to receive(:get_move)
        game.play
      end
    end

    context "with two moves" do
      before do
        # play the one turn
        allow(player1).to receive(:get_move) do
          pos(0, 0)
        end

        allow(player2).to receive(:get_move) do
          @game_result = :black
          pos(1, 1)
        end
      end

      it "ends after two turns" do
        expect(player1).to receive(:get_move)
          .ordered
        expect(Piece).to receive(:place)
          .with(board, pos(0, 0), :white)
          .ordered
        expect(player2).to receive(:get_move)
          .ordered
        expect(Piece).to receive(:place)
          .with(board, pos(1, 1), :black)
          .ordered

        game.play
      end
    end
  end
end
