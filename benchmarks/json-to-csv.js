const fs = require("fs")
const json = require("./times.json")

console.log(json)

let csv = "elements,averageMs\n"
for (var j = 0, jlen = json.length; j < jlen; ++j) {
    csv += `${json[j].elementCount},${json[j].averageCompletionTimeMs}\n`
}

fs.writeFileSync("./times.csv", csv, "utf8")