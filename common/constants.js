const constants = {
}
constants.DATA_DIRECTORY = "../data"
constants.RAW_DIRECTORY = constants.DATA_DIRECTORY + "/raw"
constants.DATASET_DIRECTORY = constants.DATA_DIRECTORY + "/dataset"
constants.JSON_DIRECTORY = constants.DATASET_DIRECTORY + "/json"
constants.IMAGES_DIRECTORY = constants.DATASET_DIRECTORY + "/images"
constants.SAMPLES_DIRECTORY = constants.DATASET_DIRECTORY + "/samples.json"
constants.FEATURES_DIRECTORY = constants.DATASET_DIRECTORY + "/features.json"
constants.JSOBJECTS_DIRECTORY = "../common/js_objects"
constants.SAMPLESJS_DIRECTORY = constants.JSOBJECTS_DIRECTORY + "/samples.js"
constants.FEATURESJS_DIRECTORY = constants.JSOBJECTS_DIRECTORY + "/features.js"

if(typeof module !== undefined){
    module.exports = constants
}
