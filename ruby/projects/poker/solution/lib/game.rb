require_relative './player'
require_relative './deck'

class Game
  attr_reader :players, :pot, :deck

  def initialize
    @players = []
    @pot = 0
    @deck = Deck.new
  end

  def play
    play_round until game_over?
    end_game
  end

  def play_round
    deck.shuffle
    reset_players
    deal_cards
    take_bets
    trade_cards
    take_bets
    end_round
  end

  def reset_players
    players.each(&:unfold)
  end

  def deal_cards
    players.each do |player|
      next if player.bankroll <= 0
      player.deal_in(deck.deal_hand)
    end
  end

  def take_bets
    players.each(&:reset_current_bet)
    high_bet = 0
    no_raises = false
    most_recent_better = nil

    until no_raises
      no_raises = true
      players.each_with_index do |player, i|
        next if player.folded?
        break if most_recent_better == player

        display_status(i, high_bet)

        response = player.respond_bet
        case response
        when :call
          add_to_pot(player.take_bet(high_bet))
        when :bet
          no_raises = false
          most_recent_better = player
          begin
            bet = player.get_bet
            raise "bet must be at least $#{high_bet}" unless bet >= high_bet
          rescue
            retry
          end
          rs = player.take_bet(bet)
          high_bet = bet
          add_to_pot(rs)
        when :fold
          player.fold
        end

        puts
        puts "pot: #{@pot}"
        puts

        return if round_over?
      end
    end
  end

  def display_status(index, high_bet)
    puts
    puts "High bet: $#{high_bet}"

    players.each_with_index do |player, i|
      puts "Player #{i} has $#{player.bankroll}"
    end

    puts
    puts "Current player: #{index + 1}"
    puts "Player #{index + 1} has bet: $#{players[index].current_bet}"
    puts "The bet is at $#{high_bet}"
    puts "Player #{index + 1}'s hand: #{players[index].hand}"
  end

  def trade_cards
    players.each_with_index do |player, i|
      next if player.folded?
      print "Player #{i + 1}, which cards do you want to trade: "
      puts player.hand
      cards = player.get_cards_to_trade
      deck.return(cards)
      player.trade_cards(cards, deck.take(cards.count))
    end
  end

  def end_round
    show_hands
    puts "WINNER"
    puts "#{winner.hand} wins $#{pot} with a #{winner.hand.rank}"
    winner.receive_winnings(pot)
    @pot = 0
  end

  def winner
    players.max
  end

  def show_hands
    puts "HANDS"
    players.each do |player|
      next if player.folded?
      puts "#{player.hand} (#{player.hand.rank})"
    end
  end

  def add_to_pot(amount)
    (@pot += amount) && amount
  end

  def round_over?
    players.count { |player| !player.folded? } <= 1
  end

  def game_over?
    players.count { |player| player.bankroll > 0 } <= 1
  end

  def add_players(n, buy_in)
    n.times { @players << Player.buy_in(buy_in) }
  end

  def end_game
    puts "The game is over"
  end
end

def test
  g = Game.new
  g.add_players(2, 100)
  g.play_round
end

if __FILE__ == $PROGRAM_NAME
  game = Game.new
  game.add_players(2, 100)
  game.play
end

