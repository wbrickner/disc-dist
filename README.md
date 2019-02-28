# DiscDist (Discrete Distribution)

DiskDist accepts an array of numbers, and returns a random index from that array, with a probability distribution which matches the elements in the array.
**DiskDist is highly performant (when used correctly).**

For example:

```text
[ 1, 2, 1 ] will have: 

  a 25% chance of returning 0, 
  a 50% chance of returning 1,
  a 25% chance of returning 2
```

# Installation

```shell
$ npm i disc-dist
```

# Usage

### One-off usage
**Only use this approach** if you know you only plan to query the distribution one time.

```javascript
const discDist = require("disc-dist")

let randomIndex = discDist.randomSingleUse(dist)
```

### Repeated usage
Use this approach if it's possible that you will query the distribution more than one time.

This function has many optimizations which are only appropriate for repeated use, and which can provide substantial performance improvements.

```javascript
const discDist = require("disc-dist")
let multiuse = discDist.randomMultiUse(dist)

// then, as many times as you want:
let randomIndex = multiuse.random()
```

# Performance

DiskDist runs in `O(n)` in the worst case.

Because of the random nature of the algorithm, the average case can be much better depending on your distribution.

**Distributions are auto-optimized to provide the fastest execution time.**

The performance data below was measured on my 2018 Macbook Pro: `MacBook Pro (13-inch, 2018, Four Thunderbolt 3 Ports), 2.7 GHz Intel Core i7`.

You can measure your own performance numbers by running: `node ./benchmarks/`.

| Distribution Elements | Exection Time | Ops / Sec   |
| --------------------- | ------------- | ----------- |
| `10`                  | `207ns`       | `4,819,678` |
| `100`                 | `222ns`       | `4,502,697` |
| `1,000`               | `0.578us`     | `1,727,480` |
| `10,000`              | `3.895us`     | `256,733`   |
| `100,000`             | `36.63us`     | `27,295`    |
| `1,000,000`           | `0.412ms`     | `2427`      |
| `10,000,000`          | `3.947ms`     | `253`       |

A plot of the above data:

![Execution Time Plot](https://github.com/wbrickner/disc-dist/blob/master/benchmarks/plot.png?raw=true)
