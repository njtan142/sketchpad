const constants = require('../common/constants.js');
const fs = require('fs');
const draw = require('../common/draw.js')


const generateSamples = () => {
    const filenames = fs.readdirSync(constants.RAW_DIRECTORY)
    const samples = []
    let id = 1;
    const progress_additionals = 2;

    const { createCanvas } = require('canvas');
    const canvas = createCanvas(400, 400);
    const context = canvas.getContext('2d');

    const utils = require('../common/utils.js')

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
            utils.printProgress(id, filenames.length * 8 + progress_additionals)
            id++
        }
    })

    fs.writeFileSync(
        constants.SAMPLES_DIRECTORY,
        JSON.stringify(samples)
    )
    utils.printProgress(id, filenames.length * 8 + progress_additionals)

    fs.writeFileSync(
        constants.SAMPLESJS_DIRECTORY,
        "const samples = " + JSON.stringify(samples)
    )
    utils.printProgress(id+1, filenames.length * 8 + progress_additionals)

    utils.printMessageWithNewLineBeforeAndAfter("Dataset processing done!")
}

const generateImageFile = (canvas, context, filepath, drawing) => {
    context.clearRect(0, 0, canvas.width, canvas.height)

    draw.paths(context, drawing)

    const buffer = canvas.toBuffer("image/png")
    fs.writeFileSync(filepath, buffer)
}

generateSamples();