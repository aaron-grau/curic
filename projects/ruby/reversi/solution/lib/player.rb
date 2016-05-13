class Player
  attr_reader :color

  def get_move(board)
    board.print

    begin
      print "Please input move (row,col) > "
      row, col = gets.chomp.split(",").map { |coord_s| Integer(coord_s) }

      pos(row, col)
    rescue
      retry
    end
  end
end
