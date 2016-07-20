# Poker

Today we will be using TDD to write a poker game, specifically [five card draw][five-card-draw].  

You'll want to use betterspecs as a cheatsheet/reference: http://betterspecs.org

## Rules

* Each player is dealt five cards.
* Players bet; each player may fold, see the current bet, or raise.
* In turn, each player can choose to discard up to three cards.
    * They are dealt new cards from the deck to replace their old cards.
* Players bet again.
* If any players do not fold, then players reveal their hands; [strongest
  hand][poker-hands] wins the pot.

[five-card-draw]: http://en.wikipedia.org/wiki/Five-card_draw
[poker-hands]: http://en.wikipedia.org/wiki/List_of_poker_hands

## Design

Classes you will want:

* Card
* Deck
    * **Request a TA Code review**
* Hand
    * The logic of calculating pair, three-of-a-kind, two-pair, etc. goes
      here.
    * Logic of which hand beats which would go here.
* Player
    * Each player has a hand, plus a pot
    * Player has methods to ask the user:
        * Which cards they wish to discard
        * Whether they wish to fold, see, or raise.
* Game
    * Holds the deck
    * Keeps track of whose turn it is
    * Keeps track of the amount in the pot.
