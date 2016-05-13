class Player
  attr_reader :bankroll, :hand

  def self.buy_in(bankroll)
    Player.new(bankroll)
  end

  def initialize(bankroll)
    @bankroll = bankroll
  end

  def deal_in(hand)
    @hand = hand
  end

  def respond_bet
    begin
      print "(c)all, (b)et, or (f)old? > "
      response = gets.chomp.downcase[0]
      raise 'must be (c)all, (b)et, or (f)old' unless ['c', 'b', 'f'].include?(response)
      case response
      when 'c' then :call
      when 'b' then :bet
      when 'f' then :fold
      end
    rescue
      retry
    end
  end

  def get_bet
    begin
      print "Bet (bankroll: $#{bankroll}) > "
      bet = gets.chomp.to_i
      raise 'not enough money' unless bet <= bankroll
    rescue
      retry
    end

    bet
  end

  def get_cards_to_trade
    print "Cards to trade? (ex. '1, 4, 5') > "
    card_indices = gets.chomp.split(', ').map(&:to_i)
    raise 'cannot trade more than three cards' unless card_indices.count <= 3
    cards = card_indices.map { |i| hand.cards[i - 1] }
  end

  def take_bet(amount)
    raise 'not enough money' unless amount <= bankroll
    @bankroll -= amount
    amount
  end

  def receive_winnings(amount)
    @bankroll += amount
  end

  def return_cards
    cards = hand.cards
    @hand = nil
    cards
  end

  def fold
    @folded = true
  end

  def unfold
    @folded = false
  end

  def folded?
    bankroll.zero? || @folded
  end

  def trade_cards(old_cards, new_cards)
    hand.trade_cards(old_cards, new_cards)
  end

  def <=>(other_player)
    p hand
    p other_player.hand
    hand <=> other_player.hand
  end
end
