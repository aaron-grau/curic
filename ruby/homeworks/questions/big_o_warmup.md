
## Big O and Biggest Fish

A Very Hungry Octopus wants to eat the longest fish in an array of fish.

```
['fish', 'fiiish', 'fiiiiish', 'fiiiish', 'fffish', 'ffiiiiisshh', 'fsh', 'fiiiissshhhhhh']
=> "fiiiissshhhhhh"
```

### Sluggish Octopus
Find the longest fish in O(n^2) time. Do this by comparing all fish lengths to all other fish lengths

### Dominant Octopus
Find the longest fish in O(n log n) time.
Hint: You saw a sorting algorithm that runs in O(n log n) in the [Sorting Demo][sorting-demo]. Remember that Big O is classified by the dominant term.

### Speedy Octopus
Find the longest fish in O(n) time. The octopus can hold on to the longest fish that you have found so far while stepping through the array only once.


[sorting-demo]: ./sorting_demo
