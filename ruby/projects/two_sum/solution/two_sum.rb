#O(n^2) quadratic time
#O(1) constant space
def bad_two_sum?(arr, target_sum)
  arr.length.times do |i|
    (arr.length - i - 1).times do |j|
      return true if arr[i] + arr[j + i + 1] == target_sum
    end
  end
  false
end

#O(nlogn) linearithmic time
#O(n) linear space
def okay_two_sum_a?(arr, target_sum)
  arr = arr.sort
  i, j = 0, arr.length - 1

  while i < j
    case (arr[i] + arr[j]) <=> target_sum
    when 0
      return true
    when -1
      i += 1
    when 1
      j -= 1
    end
  end

  false
end

#O(nlogn) linearithmic time
#O(n) linear space
# another implementation using binary search
def okay_two_sum_b?(arr, target_sum)
  arr = arr.sort
  arr.each_with_index do |el, i|
    search_result = arr.bsearch { |el2| target_sum - el - el2 }
    next unless search_result
    return [arr[i - 1], arr[i + 1]].include?(el) if search_result == el
    return true
  end
  false
end

#O(n) linear time
#O(n) linear space
def two_sum?(arr, target_sum)
  complements = {}

  arr.each do |el|
    return true if complements[target_sum - el]
    complements[el] = true
  end

  false
end

# This can be easily adapted to also return the indices of the two numbers:

def two_sum_indices(arr, target_sum)
    complements = {}
    arr.each_with_index do |el, i|
        complement, j = complements[target_sum - el] # these will both be nil if the complement doesn't exist
        return [i, j] if complement
        
        complements[el] = [el, i]
    end
    nil
end

# O(n^2) time complexity
# O(n^2) space complexity

def four_sum?(arr, target_sum) 

  pairs = Hash.new

  # pairs: keys are sums, values are hashes of composites pairs[sum]: keys are
  # composite values, values are sets of locations where values appear

  arr.each_with_index do |a, first|
    arr.each_with_index do |b, second|

      next unless first < second

      sum = [a + b].reduce(:+)

      # initializes the data structures if not already done
      pairs[sum] ||= Hash.new
      pairs[sum][a] ||= Set.new
      pairs[sum][b] ||= Set.new

      # stores the indices that contain `a` and `b` values, the first two numbers of a possible foursome
      pairs[sum][a] << first
      pairs[sum][b] << second

      # finds the complement required to complete the sum
      complement = target_sum - sum

      # moves on unless there is a pair that sums to the complement-sum
      next unless pairs[complement]

      # iterates over the complement-pairs, looking for possible values `c` that can be the third number in the foursome 

      pairs[complement].each do |c, thirds|
        # skip if no unused indices of the required value `c` remain
        next if (thirds - [first, second]).empty?

        # find the last required value `d` to complete the foursome
        d = complement - c

        # iterate over the thirds to find a fourth that is distinct from first, second, and third
        (thirds - [first, second]).each do |third|
          return true unless (pairs[complement][d] - [first, second, third]).empty?
        end

      end

      # The loops above run whenever there is a possible complementary pair. We
      # need to confirm that there is no overlap between the original pair of
      # `a`, `b` and the complementary pair `c`, `d`. Using sets lets us exclude
      # `a`, `b`, and `c` in turn from being used as `d` in constant time.
      # Because these checks happen as the pairs as forming, we stop checking as
      # soon as we find a match, avoiding having to look at all the permutations
      # in the worst case scenario of a homogenous array of target_sum/4 values.

    end
  end

  false

end
