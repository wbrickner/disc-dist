function comparitor(a, b) { return parseFloat(b) - parseFloat(a) }

function randomSingleUse(distribution) {
    // sort largest items first so we have the best chance of returning early
    distribution.sort(comparitor)

    // define these together for performance
    let sum = 0
    ,   last = 0

    for (var j = 0, jlen = distribution.length; j < jlen; ++j) {
        sum += distribution[j]
    }

    // the value of r can't change - make it const for potential V8 optimizations
    const r = Math.random() * sum

    for (var j = 0; j < jlen; ++j) {
        // build the last-bin-check into the last part of the statement
        // to avoid computing it unless we really need to (lazy)
        if (r >= last && (r < (last += distribution[j]) || j === jlen - 1)) {
            return j
        }
    }
}

function _randomMultiUse()  {
    // distribution is already sorted, sum already computed
    const r = Math.random() * this.sum
    let last = 0

    for (var j = 0, jlen = this.distribution.length; j < jlen; ++j) {
        if (r >= last && (r < (last += this.distribution[j]) || j === jlen - 1)) {
            return j
        }
    }
}

const randomMultiUsePrototype = { random: _randomMultiUse }

function randomMultiUse(distribution) {
    // use a prototype so the underlying `random` function is the same
    // and gets executed as many times, making it "hot", i.e. V8 will heavily optimize it
    const rmu = Object.create(randomMultiUsePrototype)

    distribution.sort(comparitor)

    let sum = 0
    for (var j = 0, jlen = distribution.length; j < jlen; ++j) {
        sum += distribution[j]
    }
    
    // only assign these once, maybe V8 will hesitate to optimize if it sees
    // values are changing frequently
    rmu.sum = sum
    rmu.distribution = distribution

    return rmu
}

module.exports = {
    randomSingleUse,
    randomMultiUse
}