# XOR (Exclusive OR)

## Definition

XOR (short for 'exclusive OR') is a [logical operator][log-op], like OR and AND.
XOR means 'Either A or B, but not both'. The 'but not both' clause is what
differentiates it from OR, which means 'Either A or B or both'. In ruby, XOR is
written as `^`.

```ruby

	true ^ false # true
	false ^ true # true

	false ^ false # false
	true ^ true # false

	# Compare the last example against OR: 
	true || true # true

```

## Bit-wise XOR with numbers

When you XOR two numbers, Ruby converts them to binary and compares their
corresponding digits (a.k.a. 'bits') using XOR, where `1` is `true` and `0` is
`false`.

```ruby
(a = 2).to_s(2) # "10"
(b = 6).to_s(2) # "110"

# Note: `to_s(2)` converts a decimal to binary

c = a ^ b

# bit-wise operation
# a = 010
# b = 110
# xor ---
# c =100

# The end result is converted back to an integer.

c == 4 == "100".to_i(2) # true
```

## Using XOR to hash

Recall the properties of a hashing function:  
	1) **Determinism:** Its output is directly determined by the input data.
	2) **Comprehensiveness:** It uses all the input data.
	3) **Uniformity:** Its possible return values are evenly distributed.
	4) **Continuity:** It returns similar values for similar inputs.

Bit-wise XOR is often used in hashing functions because it promotes high
determinism, comprehensiveness, uniformity, and continuity.

```
Truth Table for Bitwise Operations

 a | b | AND | OR  | XOR |
---+---+-----+-----+-----+
 0   0    0     0     0   
 1   0    0     1     1   
 0   1    0     1     1   
 1   1    1     1     0   
``` 

While all bit-wise operations offer comprehensiveness, only
XOR returns `1` and `0` in equal probability. This allows it to produce more
uniformly distributed values, distinguishing it as a desirable hashing method.

[truth-tables]: http://lampiweb.com/help/freebasic/TblTruth.html
[log-op]: https://en.wikipedia.org/wiki/Logical_connective