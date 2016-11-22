# quadratic search

def quadratic_biggest_fish(fishes)
  fishes.each_with_index do |fish1, i1|
    max_length = true
    fishes.each_with_index do |fish2, i2|
      next if i1 == i2
      max_length = false if fish2.length > fish1.length
   end
   return fish1 if max_length
  end

end

# n log n search
class Array
  #this should look familiar
  def merge_sort(&prc)
    prc ||= Proc.new { |x, y| x <=> y }

    return self if count <= 1

    midpoint = count / 2
    sorted_left = self.take(midpoint).merge_sort(&prc)
    sorted_right = self.drop(midpoint).merge_sort(&prc)

    Array.merge(sorted_left, sorted_right, &prc)
  end

  private
  def self.merge(left, right, &prc)
    merged = []

    until left.empty? || right.empty?
      case prc.call(left.first, right.first)
      when -1
        merged << left.shift
      when 0
        merged << left.shift
      when 1
        merged << right.shift
      end
    end

    merged.concat(left)
    merged.concat(right)

    merged
  end
end

def nlogn_biggest_fish(fishes)
  # sort the array longest to shortest
  prc = Proc.new { |x, y| y.length <=> x.length }
  #return the first element
  fishes.merge_sort(&prc)[0]
end

# linear search
def linear_biggest_fish(fishes)
  #hold the biggest fish
  biggest_fish = fishes.first
  max_length = fishes.first.length

  fishes.each do |fish|
    if fish.length > max_length
      #update the biggest fish
      max_length = fish.length
      biggest_fish = fish
    end
  end

  biggest_fish

end
