class Position
  attr_reader :row, :col

  def initialize(row, col)
    @row, @col = row, col
  end

  def +(other_pos)
    Position.new(row + other_pos.row, col + other_pos.col)
  end

  def ==(other_pos)
    (row == other_pos.row) && (col == other_pos.col)
  end

  # must implement `#eql?` and `#hash` to use as key in Hash.
  def eql?(other_pos)
    (self.class == other_pos.class) && (self == other_pos)
  end

  def hash
    [@row.hash, @col.hash].hash
  end
end

# Convenience method for constructing a Position.
def pos(row, col)
  Position.new(row, col)
end
