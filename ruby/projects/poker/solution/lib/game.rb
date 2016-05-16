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
    game_over
  end

  def play_round
    deck.shuffle
    unfold_players
    deal_cards
    take_bets
    (end_round && return) if game_over?
    trade_cards
    take_bets
    end_round
  end

  def unfold_players
    players.each(&:unfold)
  end

  def deal_cards
    players.each do |player|
      next if player.folded?
      player.deal_in(deck.deal_hand)
    end
  end

  def take_bets
    high_bet = 0
    no_raises = false
    pivoted_players = players.dup
    pivot_point = 0
    betted_player = nil

    until no_raises
      no_raises = true
      # pivoted_players.rotate(pivot_point)
      pivoted_players.each_with_index do |player, i|
        next if player.folded?
        next if betted_player == player
        puts "High bet: $#{high_bet}"
        puts "Player #{i + 1}:"
        puts player.hand
        response = player.respond_bet
        case response
        when :call
          player.take_bet(high_bet)
          add_to_pot(high_bet)
        when :bet
          no_raises = false
          pivot_point = i
          betted_player = player
          bet = player.get_bet
          raise "bet must be at least $#{high_bet}" unless bet >= high_bet
          high_bet = add_to_pot(player.take_bet(bet))
        when :fold
          player.fold
        end

        return if game_over?
      end

    end

  end

  def trade_cards
    players.each_with_index do |player, i|
      next if player.folded?
      puts "Player #{i + 1}:"
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
    #raise 'game is not over' unless game_over?
    players.sort.last
  end

  def show_hands
    puts "HANDS"
    players.each_with_index do |player, i|
      next if player.folded?
      puts "#{player.hand} (#{player.hand.rank})"
    end
  end

  def add_to_pot(amount)
    (@pot += amount) && amount
  end

  def game_over?
    players.select { |player| !player.folded? }.count == 1
  end

  def add_players(n, buy_in)
    n.times { @players << Player.buy_in(buy_in) }
  end
end

def test
  g = Game.new
  g.add_players(2, 100)
  g.play_round
end
