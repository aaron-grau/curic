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

def four_sum? list, target
  (0...list.length).each do |x|
    (x+1...list.length).each do |y|
      pair_sum = list[x] + list[y]
      remainder = list.dup
      remainder.delete_at(remainder.index(list[x]))
      remainder.delete_at(remainder.index(list[y]))
      return true if two_sum?(remainder, target - pair_sum)
    end
  end
  false
end
