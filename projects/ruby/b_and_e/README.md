# B and E

## Overview

In this project we are going to model a home alarm system keypad. A
typical alarm system keypad has 10 digits (0-9) and expects a code some
number of digits in length (4 in the example below). When the code has
been entered correctly the user can then choose a new mode by pressing
one of the first several buttons which also represent modes. A typical
system has 3 modes: armed, perimeter, and unarmed.

There is, however, a vulnerability in the system. If the user enters an
**incorrect** code, they will not be required to start over. The alarm
system keeps the stream of keypresses in memory, and every time a new
key is pressed, the previous four digits are checked against the
passcode. Here's a practical example:

Let's say my secret code is "1337" and I want to put the alarm in mode
"1". I first enter an incorrect code:

`["2", "3", "3", "7", "1"]`

The alarm system chirps at me to let me know I've entered the wrong
code. I then enter some more digits:

`"2", "3", "3", "7", ["1", "3", "3", "7", "1"]`

Note that the last digit (the **mode**) of the wrong code has become the
first digit of the correct code. At this point, the alarm is set and the
system emits a _beep_ of affirmation.

We will start by modeling this system. Then, we will move on to using
this class to answer a more interesting question: if someone was going
to break into this system, how many key presses would be necessary to do
it? How many key presses would it take to test EVERY code in the
system?

In example above, we are actually testing *4* separate codes:

```
["2", "3", "3", "7", "1"], "3", "3", "7", "1"
"2", ["3", "3", "7", "1", "3"], "3", "7", "1"
"2", "3", ["3", "7", "1", "3", "3"], "7", "1"
"2", "3", "3", "7", ["1", "3", "3", "7", "1"]
```

To summarize: the system looks at every sequence of length 5 (a four-digit code plus
one mode digit) that ends with a `"1"`, `"2"`, or a `"3"` (the possible mode digits).

## Phase 1: The Keypad

Write a `Keypad` class. It will need to maintain a `key_history`,
`code_bank`, `mode_keys`, and `code_length`. When a code is checked,
store in the `code_bank` that it has been checked. The `Keypad` should
then know whether or not all codes have been attempted.

#### `initialize`

This class should take a code length and the `mode_keys`. In the example
above, the code length is `4` and the `mode_keys` are `[1, 2, 3]`. You
will need to set up instance variables for `key_history`, `code_bank`,
`mode_keys`, and `code_length`.

#### `press`

The `press` method should receive the value of the pressed key and add
it to the `key_history`. If the key history has enough digits _and_ the
final key was in the `mode_keys`, then the previous `code_length` keys
in the history should be checked.

We will use this `Keypad` class to determine when all possible codes
have been pressed, so it will need to keep track of which codes have
been entered (and, by extension, which codes have not). What kind of
data type would be appropriate for this application?

#### `all_codes_entered?`

When all codes have been entered (at least once--overlaps are
inevitable), this method should return `true`. Until then, `false`.

## Phase 2: The Keypad Tester

This class, `KeypadTester`, will run through an algorithm which will
attempt to test all possible codes on a keypad.

#### `initialize`

The arguments for `initialize` should be `length` and `mode_keys` so
that they can be used to create a new instance of `Keypad`.

#### `run`

`run` should test all possible key codes. You will need to think of an
algorithm to test codes. The simple greedy algorithm, for a 4 digit
code, will use 50000 key presses and encounter around 6000 repeated
codes (`00001`, `00011`, `00021`, `00031`, etc). After running the
algorithm, verify that all codes have been tested using
`all_codes_entered?`.

## Phase Bonus

Improve the `KeypadTester#run` method to use less than 50000 key
strokes. How low can you get it? For ideas check out the [ruby
quiz][ruby_quiz] page from which this exercise originates.

[ruby_quiz]: http://rubyquiz.com/quiz72.html
