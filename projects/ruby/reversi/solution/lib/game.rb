#!/usr/bin/env ruby

# NB: this top line is what lets us invoke `./lib/game.rb`

require_relative './board'
require_relative './piece'
require_relative './player'
require_relative './position'

class Game
  attr_reader :board, :current_color

  def initialize(player1, player2, board = Board.new)
    @players = {
      :white => player1,
      :black => player2
    }
    @board = board
    @current_color = :white
  end

  def play
    until board.result
      begin
        move(current_player.get_move(board))
        change_player
      rescue InvalidMoveError
        retry
      end
    end
    
    print_game_result
  end

  private
  def current_player
    @players[current_color]
  end

  def change_player
    @current_color = (@current_color == :black) ? :white : :black
  end

  def move(move_pos)
    Piece.place(board, move_pos, current_color)
  end
  
  def print_game_result
    # TODO: this is annoying, because the result is printed in the test.
    # Ideally, I would extract the UI entirely from the game.
    board.print

    case board.result
    when :black
      puts "Black has won!"
    when :white
      puts "White has won!"
    when :draw
      puts "No one wins!"
    end
  end
end

if __FILE__ == $PROGRAM_NAME
  Game.new(Player.new, Player.new).play
end