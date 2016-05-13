1. What does the singleton class in NullPiece do and why do we have it?
    - Singleton means that every instance of NullPiece is the same instance.  If I changed an instance variable (say, `@color = :white`) on one instance, I would affect all the other NullPiece instances(and get the same @color).
    - Imagine if every empty square had a different instance of NullPiece.  Different instances would take up a lot of memory (a new instance of NullPiece on every square).
    - Including a singleton is a clear indication to anyone reading your code that there should only ever be one instance of the class you're writing.

