const constants = require('../common/constants.js');
const features = require('../common/features.js');

const fs = require('fs');

console.log("Starting...")

const samples = JSON.parse(
    fs.readFileSync(constants.SAMPLES_DIRECTORY)
);

console.log("Mounted samples, extracting data...")

for(const sample of samples){
    const paths = JSON.parse(
        fs.readFileSync(
            constants.JSON_DIRECTORY + "/" + sample.id + ".json"
        )
    );

    sample.point = [
        features.getPathCount(paths),
        features.getPointCount(paths)
    ]
}

console.log("Extracted features, saving modified data...")


const featureNames = ["PathCount", "PointCount"];


fs.writeFileSync(
    constants.FEATURES_DIRECTORY, 
    JSON.stringify({
        featureNames,
        samples:samples.map((sample) => {
            return {
                label: sample.label,
                point: sample.point,
            }
        })
    })
)

fs.writeFileSync(
    constants.FEATURESJS_DIRECTORY, 
    "const features = " + JSON.stringify({
        featureNames,
        samples
    }) + ";"
)

console.log("Done!")