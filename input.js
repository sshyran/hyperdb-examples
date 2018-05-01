var readline = require("readline")
function readInput(db) {
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    })


    function logResult(err, result) {
        if (err) {
            console.error("hyperdb failed with", err)
        }
        if (arguments.length >= 2) {
            console.log(result)
        }
    }
    
    rl.on("line", function(line) {
        var [cmd, arg] = line.split(/:\s*/)
        if (cmd == "get") {
            db.get(arg, logResult)
        } else if (cmd === "put") {
            var [key, value] = arg.split("=")
            db.put(key, value, logResult)
        } else if (cmd === "auth") {
            db.authorize(new Buffer(arg), logResult)
        } else if (cmd === "local") {
            console.log("local key is\n\t", db.local.key.toString("hex"))
        } else if (cmd === "db") {
            console.log("db key is\n\t", db.key.toString("hex"))
        } else if (cmd === "registered") {
            db.authorized(new Buffer(arg), logResult)
        }
    })
}
module.exports = readInput
