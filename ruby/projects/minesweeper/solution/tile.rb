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


