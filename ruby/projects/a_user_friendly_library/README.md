# Error Handling Funtime

Estimated time: 30min.

Oh noes, the clever TAs at App Academy made this "super useful" library, but it keeps throwing ugly error messages that are hard to understand. Let's revamp the library to throw more descriptive errors and prevent incorrect use.

## Learning Goals
* Know how to `raise` and `rescue` an exception
* Be able to explain how an exception bubbles up after it is raised
* Know when to use `ensure` and `retry`
* Be able to choose an appropriate exception class

## Phase 1: Setup
Download the project [skeleton][skeleton]. You will primarily be working in
`super_useful.rb` to improve errors in our library. The user's script, aptly
named `user_script.rb`, will be using the functions and classes defined in our
library.

## Phase 2: Make `convert_to_int` more flexible

### Overview
Sometimes we want to return something from our function, even if the desired operation is not possible. This might mean handling potential errors in our own code and returning a suitable replacement, such as `nil` or `-1` (often used when trying to find the index of a particular element).

### Instructions
We want our dear user to be able to call `convert_to_int` with no error being raised on invalid input. Update `convert_to_int` to `rescue` any errors and return `nil` if our argument cannot be converted.

If we are handling the error thrown by `Integer(arg)`, what [type][exception_types] of exception should we be catching. Update `convert_to_int` to only rescue the correct exception type.

### Recap
Many times we will want to 'protect' the user from potential errors our code might throw. In this case we are protecting our user from *only* from errors we expect. It is always wise to raise and rescue more specific errors as the errors they raise are more descriptive (helpful with debugging) and it prevents the catching of errors that should 'escape' up to the calling function (catching `Exception` will even ignore system errors).

## Phase 3: Make friendly monster (maybe) let you try again

### Overview
Sometimes when an error is thrown we would like to try the failing operation again (hopefully with different input :wink:). This is often the case with user input and text parsing. Let's try to make friendly monster happy by allowing us to retry feeding it a fruit when certain errors are thrown.

### Instructions
Friendly monster is *really* friendly and *really* likes coffee, so he'd like to give us another try, but only when we give him `"coffee"`.

First, handle the errors being thrown by `#fruitiness` in `#feed_me_a_fruit`.

Note that `#fruitiness` throws errors receiving an argument that is not in `FRUITS`. Next, let's differentiate the errors thrown so our calling function, `#feed_me_a_fruit` can try to feed friendly monster again, but only when they've given it coffee.

Now that we have different error types being thrown by `#fruitiness` we can do a little conditional logic in `#feed_me_a_fruit` to `retry` the failing block of code again, but only if it is a coffee-related error.

### Recap
Being able to rescue and retry failing code gives us even more control over the flow of our program. Handling different errors separately gives us even more control.

## Phase 4: Ensure `BestFriend` is a real best friend

### Overview

### Instructions

### Recap
