require_relative './card'
require_relative './hand'

class Deck
  def self.all_cards
    Card.suits.product(Card.values).map do |suit, value|
      Card.new(suit, value)
    end
  end

  def initialize(cards = Deck.all_cards)
    @cards = cards
  end

  def deal_hand
    Hand.new(take(5))
  end

  def count
    @cards.count
  end

  def take(n)
    raise "not enough cards" if n > count
    @cards.shift(n)
  end

  def return(cards)
    @cards.push(*cards)
  end

  def shuffle
    @cards.shuffle!
  end
end
