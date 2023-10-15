const constants = require('./constants.js');
const fs = require('fs');

const generateSamples = () => {
    const filenames = fs.readdirSync(constants.RAW_DIRECTORY)
    const samples = []
    let id = 1;
    filenames.forEach(filename => {
        const content = fs.readFileSync(
            constants.RAW_DIRECTORY + "/" + filename
        )
        const { session, student, drawings } = JSON.parse(content)
        for (let label in drawings) {
            const sample = {
                id,
                label,
                student_name: student,
                student_id: session,
            }
            samples.push(sample)


            const paths = drawings[label]
            fs.writeFileSync(
                constants.JSON_DIRECTORY + "/" + id + ".json",
                JSON.stringify(paths
                    )
            )
            id++
        }
    })

    fs.writeFileSync(
        constants.SAMPLES_DIRECTORY,
        JSON.stringify(samples)
    )
}
console.log(constants)
generateSamples();