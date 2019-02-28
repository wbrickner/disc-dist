# DiscDist (Discrete Distribution)

DiskDist accepts an array of numbers, and returns a random index from that array, with a probability distribution which matches the elements in the array.
**DiskDist is highly performant (when used correctly).**

For example:

```
[ 1, 2, 1 ] will have: 

  a 25% chance of returning 0, 
  a 50% chance of returning 1,
  a 25% chance of returning 2
```

# Installation

```
$ npm i disc-dist
```

# Performance

// table here

DiskDist runs in O(n) in the worst case.

Because of the random nature of the algorithm, the average case can be much better depending on your distribution.

**Distributions are auto-optimized to provide the fastest execution time.**

**When generating many random numbers from the same distribution, use `diskDist.randomMultiUse(dist)`.**
This function has many optimizations which are only appropriate for repeated use, and which can provide substantial performance improvements.

By running `node ./benchmarks` you can verify these figures on your machine.