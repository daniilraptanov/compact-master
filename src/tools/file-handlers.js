const fs = require('fs');
const path = require('path');
const { RESULT_FILE_NAME, META_FILE_NAME } = require('../constants');
const { mapToObject } = require('./utils');

const readTextFromFile = (filePath) => {
    return fs.readFileSync(filePath, 'utf8');
}

const getFilesNamesDir = (dirname) => {
    return fs.readdirSync(dirname);
}

const getResultFilePath = (dirname) => {
    return path.join(dirname, RESULT_FILE_NAME);
}

const getMetaFilePath = (dirname) => {
    return path.join(dirname, META_FILE_NAME);
}

const writeResultToFile = (buffer, dirname) => {
    fs.writeFileSync(getResultFilePath(dirname), buffer);
}

const writeMetaToFile = (codes, dirname) => {
    fs.writeFileSync(getMetaFilePath(dirname), JSON.stringify(mapToObject(codes)));
}

module.exports = {
    readTextFromFile,
    getFilesNamesDir,
    writeResultToFile,
    writeMetaToFile
}

