const features = {};

features.getPathCount = (paths) =>{
    return paths.length;
}

features.getPointCount = (paths) => {
    return paths.flat().length;
}

if(typeof module != undefined){
    module.exports = features;
}