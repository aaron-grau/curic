require "set"
require_relative "player"

class GhostGame
  ALPHABET = Set.new(("a".."z").to_a)
  MAX_LOSS_COUNT = 5

  def initialize(*players)
    words = File.readlines("dictionary.txt").map(&:chomp)
    @dictionary = Set.new(words)
    @players = players
    @losses = {}

    players.each { |player| losses[player] = 0 }
  end

  def run
    play_round until game_over?
    puts "#{winner} wins!"
  end

  private
  attr_reader :fragment, :dictionary, :losses, :players

  def add_letter(letter)
    fragment << letter
    puts "#{current_player} added the letter '#{letter}' to the fragment."
  end

  def current_player
    players.first
  end

  def display_standings
    return if losses.all? { |_, v| v == 0 }

    puts "Current standings:"
    players.each do |player|
      next if losses[player] == 0
      puts "#{player}: #{record(player)}"
    end

    sleep(2)
  end

  def game_over?
    remaining_players == 1
  end

  def is_word?(fragment)
    dictionary.include?(fragment)
  end

  def next_player!
    players.rotate!
    # keep rotating until we find a player who hasn't been eliminated
    players.rotate! until losses[current_player] < MAX_LOSS_COUNT
  end

  def play_round
    @fragment = ""
    welcome

    until round_over?
      take_turn(current_player)
      next_player!
    end

    update_standings
  end

  def previous_player
    players.last
  end

  def record(player)
    count = losses[player]
    "GHOST".slice(0, count)
  end

  def remaining_players
    losses.count { |_, v| v < MAX_LOSS_COUNT }
  end

  def round_over?
    is_word?(fragment)
  end

  def take_turn(player)
    system("clear")
    puts "It's #{player}'s turn!"
    letter = nil

    until letter && valid_play?(letter)
      letter = player.guess(fragment)
      player.alert_invalid_move(letter) unless valid_play?(letter)
    end

    add_letter(letter)
  end

  def update_standings
    puts "#{previous_player} spelled #{fragment}."
    puts "#{previous_player} gets a letter!"

    losses[previous_player] += 1

    if losses[previous_player] == MAX_LOSS_COUNT
      puts "#{previous_player} has been eliminated!"
    end

    sleep(2)
  end

  def valid_play?(letter)
    return false unless ALPHABET.include?(letter)

    new_fragment = fragment + letter
    dictionary.any? { |word| word.start_with?(new_fragment) }
  end

  def welcome
    system("clear")
    puts "Let's play a round of Ghost!"
    display_standings
  end

  def winner
    (player, _) = losses.find { |_, losses| losses < MAX_LOSS_COUNT }
    player
  end
end

if __FILE__ == $PROGRAM_NAME
  game = GhostGame.new(Player.new("Gizmo"), Player.new("Breakfast"))
  game.run
end
