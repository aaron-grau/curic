# Unified Modeling Language

Unified Modeling Language (UML) is a way of describing the relationships between different objects in a system. The description can be of classes (e.g., modeling the structure of an object-oriented software program) or behavior (e.g., diagramming a set of concurrent processes). We will be using UML to model the class structure of a chess game.

Classes can be related to each other several different ways, including parent-child and association (a "has a" relationship). A `Piece`  is a parent to a `Pawn`, for example, and a `Game` is associated with a `Board` in that a `Game` has a `Board`.

A class is usually drawn with three components: a name, a set of attributes (instance variables), and a set of methods. The attributes and methods are marked as being public (+), private(-), or protected (#), and class methods are underlined.

Take a look at this [diagram][chess-diagram] for a version of a Chess game and think about how you might be able to use this language in the future.

[chess-diagram]: Chess_Diagram.png
