const discDist = require("../")

const times = []

for (var elementCount = 10; elementCount < 1E8; elementCount *= 10) {
    console.log(`Generating ${elementCount} elements, each from 0 to 1 billion`)
    let data = []
    for (var j = 0; j < elementCount; ++j) { data[j] = 1E9 * Math.random() }

    const dist = discDist.randomMultiUse(data)

    console.info(`Running tests with ${elementCount} elements`)

    let averageCompletionTimeMs = 0
    for (var j = 0; j < 1e5; ++j) {
        let start = process.hrtime()

        let randNumber = dist.random()

        let dur = process.hrtime(start)
        averageCompletionTimeMs += dur[0] * 1E3 + dur[1] * 1E-6
        console.log("Trial #" + j + " | Avg: " + averageCompletionTimeMs / j)
    }

    averageCompletionTimeMs /= 1e5

    times.push({ elementCount, averageCompletionTimeMs })
}

require("fs").writeFileSync("./times.json", JSON.stringify(times), "utf8")