require_relative 'display'
require_relative 'player'

class HumanPlayer < Player

  def make_move(board)
    from_pos, to_pos = nil, nil

    until from_pos && to_pos
      display.render

      if from_pos
        puts "#{color}'s turn. Move to where?"
        to_pos = display.cursor.get_input

        display.reset! if to_pos
      else
        puts "#{color}'s turn. Move from where?"
        from_pos = display.cursor.get_input

        display.reset! if from_pos
      end
    end

    [from_pos, to_pos]
  end

end
