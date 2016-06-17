# Recursion Homework

For tonight's exercises, we are going to write several recursive functions.  Here's how you should approach each problem:
  1. Read the problem statement to make sure you fully understand the problem
  2. Identify the base case(s)
  3. Determine the inductive step
  4. Write the function
  5. Run the provided test cases to verify you have a working solution

As we learn recursion, it is important that we break down each problem into these steps.  Doing so will help us devise solutions and avoid stack overflow errors.  

If you encounter strange bugs or errors, use `byebug`!  

After you finish the exercises, or if you get stuck on one of the problems, you can view the solutions [here][recursion-solutions].

[recursion-solutions]: ../solution/recursion.rb


## Exercise 1 - `sum_to`

Write a function `sum_to(n)` that uses recursion to calculate the sum from 1 to n (inclusive of n).  

```ruby
  # Test Cases
  sum_to(5)  # => returns 15
  sum_to(1)  # => returns 1
  sum_to(9)  # => returns 45
  sum_to(-8)  # => returns nil
```

## Exercise 2 - `add_numbers`

Write a function `add_numbers(nums_array)` that takes in an array of Fixnums and returns the sum of those numbers.  Write this method recursively.  

```ruby
  # Test Cases
  add_numbers([1,2,3,4]) # => returns 10
  add_numbers([3]) # => returns 3
  add_numbers([-80,34,7]) # => returns -39
  add_numbers() # => returns nil
```

## Exercise 3 - Gamma Function

Let's write a method that will solve Gamma Function recursively.  The Gamma Function is defined `Γ(n) = (n-1)!`.  

```ruby
  # Test Cases
  gamma_fnc(0)  # => returns nil
  gamma_fnc(1)  # => returns 1
  gamma_fnc(4)  # => returns 6
  gamma_fnc(8)  # => returns 5040
```
