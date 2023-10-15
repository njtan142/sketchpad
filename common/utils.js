const utils = {}

utils.printProgress = (count, max) => {
    process.stdout.clearLine()
    process.stdout.cursorTo(0)

    const percent = utils.formatPercent(
        count/max
    )

    process.stdout.write("Progress: " + count + "/" + max + " (" + percent + ")")
}

utils.printMessageWithNewLine = (message) => {
    process.stdout.write(message + "\n")
}
utils.printMessageWithNewLineBeforeAndAfter = (message) => {
    process.stdout.write("\n" + message + "\n")
}

utils.formatPercent = (num) => {
    return (num * 100).toFixed(2) + "%";
}
/**
 * 
 * @param {String} key - The object key
 * @param {Array} obj_array - Array of Objects
 */
utils.groupDatasetBy = (key, obj_array) => {
    const groups = {}
    for(let element of obj_array){
        const value = element[key]
        if(groups[value] == null){
            groups[value] = [];
        }
        groups[value].push(element)
    }
    return groups
}

if(typeof module != undefined){
    module.exports = utils;
}
