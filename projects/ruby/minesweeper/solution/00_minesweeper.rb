#!/usr/bin/env ruby

require 'yaml'

class Tile
  DELTAS = [
    [-1, -1],
    [-1,  0],
    [-1,  1],
    [ 0, -1],
    [ 0,  1],
    [ 1, -1],
    [ 1,  0],
    [ 1,  1]
  ]

  attr_reader :pos

  def initialize(board, pos)
    @board, @pos = board, pos
    @bombed, @explored, @flagged = false, false, false
  end

  # ugh. can't have an ivar ending in a '?' means we can't use
  # attr_reader.
  def bombed?
    @bombed
  end

  def explored?
    @explored
  end

  def flagged?
    @flagged
  end

  def adjacent_bomb_count
    neighbors.select(&:bombed?).count
  end

  def explore
    # don't explore a location user thinks is bombed.
    return self if flagged?

    # don't revisit previously explored tiles
    return self if explored?

    @explored = true
    if !bombed? && adjacent_bomb_count == 0
      neighbors.each { |adj_tile| adj_tile.explore }
    end

    self
  end

  def inspect
    # don't show me the whole board when inspecting a Tile; that's
    # information overload.
    { :pos => pos,
      :bombed => bombed?,
      :flagged => flagged?,
      :explored => explored? }.inspect
  end

  def neighbors
    adjacent_coords = DELTAS.map do |(dx, dy)|
      [pos[0] + dx, pos[1] + dy]
    end.select do |row, col|
      [row, col].all? do |coord|
        coord.between?(0, @board.grid_size - 1)
      end
    end

    adjacent_coords.map { |pos| @board[pos] }
  end

  def plant_bomb
    @bombed = true
  end

  def render
    if flagged?
      "F"
    elsif explored?
      adjacent_bomb_count == 0 ? "_" : adjacent_bomb_count.to_s
    else
      "*"
    end
  end

  def reveal
    # used to fully reveal the board at game end
    if flagged?
      # mark true and false flags
      bombed? ? "F" : "f"
    elsif bombed?
      # display a hit bomb as an X
      explored? ? "X" : "B"
    else
      adjacent_bomb_count == 0 ? "_" : adjacent_bomb_count.to_s
    end
  end

  def toggle_flag
    # ignore flagging of explored squares
    @flagged = !@flagged unless @explored
  end
end

class Board
  attr_reader :grid_size, :num_bombs

  def initialize(grid_size, num_bombs)
    @grid_size, @num_bombs = grid_size, num_bombs

    generate_board
  end

  def [](pos)
    row, col = pos
    @grid[row][col]
  end

  def lost?
    @grid.flatten.any? { |tile| tile.bombed? && tile.explored? }
  end

  def render(reveal = false)
    # reveal is used to fully reveal the board at game end
    @grid.map do |row|
      row.map do |tile|
        reveal ? tile.reveal : tile.render
      end.join("")
    end.join("\n")
  end

  def reveal
    render(true)
  end

  def won?
    @grid.flatten.none? { |tile| tile.bombed? != tile.explored? }
  end

  private
  def generate_board
    @grid = Array.new(@grid_size) do |row|
      Array.new(@grid_size) { |col| Tile.new(self, [row, col]) }
    end

    plant_bombs
  end

  def plant_bombs
    total_bombs = 0
    while total_bombs < @num_bombs
      rand_pos = Array.new(2) { rand(@grid_size) }

      tile = self[rand_pos]
      next if tile.bombed?

      tile.plant_bomb
      total_bombs += 1
    end

    nil
  end
end

class MinesweeperGame
  LAYOUTS = {
    :small => { :grid_size => 9, :num_bombs => 10 },
    :medium => { :grid_size => 16, :num_bombs => 40 },
    :large => { :grid_size => 32, :num_bombs => 160 } # whoa.
  }

  def initialize(size)
    layout = LAYOUTS[size]
    @board = Board.new(layout[:grid_size], layout[:num_bombs])
  end

  def play
    until @board.won? || @board.lost?
      puts @board.render

      action, pos = get_move
      perform_move(action, pos)
    end

    if @board.won?
      puts "You win!"
    elsif @board.lost?
      puts "**Bomb hit!**"
      puts @board.reveal
    end
  end

  private
  def get_move
    action_type, row_s, col_s = gets.chomp.split(",")

    [action_type, [row_s.to_i, col_s.to_i]]
  end

  def perform_move(action_type, pos)
    tile = @board[pos]

    case action_type
    when "f"
      tile.toggle_flag
    when "e"
      tile.explore
    when "s"
      # won't quit on save, just hit ctr-c to do that.
      save
    end
  end

  def save
    puts "Enter filename to save at:"
    filename = gets.chomp

    File.write(filename, YAML.dump(self))
  end
end

if $PROGRAM_NAME == __FILE__
  # running as script

  case ARGV.count
  when 0
    MinesweeperGame.new(:small).play
  when 1
    # resume game, using first argument
    YAML.load_file(ARGV.shift).play
  end
end
