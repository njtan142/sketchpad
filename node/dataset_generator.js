const constants = require('./constants.js');
const fs = require('fs');
const draw = require('../common/draw.js')
const { createCanvas } = require('canvas');


const generateSamples = () => {
    const filenames = fs.readdirSync(constants.RAW_DIRECTORY)
    const samples = []
    let id = 1;

    const canvas = createCanvas(400, 400);
    const context = canvas.getContext('2d');

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
            fs.writeFileSync( //json
                constants.JSON_DIRECTORY + "/" + id + ".json",
                JSON.stringify(paths)
            )
            generateImageFile(
                canvas, context,
                constants.IMAGES_DIRECTORY + '/' + id + '.png',
                paths
            )
            id++
        }
    })

    fs.writeFileSync(
        constants.SAMPLES_DIRECTORY,
        JSON.stringify(samples)
    )
}

const generateImageFile = (canvas, context, filepath, drawing) => {
    context.clearRect(0, 0, canvas.width, canvas.height)

    draw.paths(context, drawing)

    const buffer = canvas.toBuffer("image/png")
    fs.writeFileSync(filepath, buffer)
}

generateSamples();