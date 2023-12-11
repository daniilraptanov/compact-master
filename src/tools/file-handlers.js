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

const getPureFileName = (fileName, extension) => {
    return fileName.split('.')[0];
}

const getFilePath = (dirname, fileName) => {
    return path.join(dirname, fileName);
}

const getFileDir = (dirname, fileName, extension) => {
    const pureName = getPureFileName(fileName, extension);
    const fileDir = path.join(dirname, pureName);
    return fileDir;
}

const writeResultToFile = (buffer, dirname, fileName, extension) => {
    const fileDir = getFileDir(dirname, fileName, extension);
    fs.mkdirSync(fileDir, { recursive: true });
    fs.writeFileSync(path.join(fileDir, RESULT_FILE_NAME), buffer);
}

const writeMetaToFile = (codes, dirname, fileName, extension) => {
    const fileDir = getFileDir(dirname, fileName, extension);   
    fs.mkdirSync(fileDir, { recursive: true });
    fs.writeFileSync(path.join(fileDir, META_FILE_NAME), JSON.stringify(mapToObject(codes)));
}

module.exports = {
    readTextFromFile,
    getFilesNamesDir,
    writeResultToFile,
    writeMetaToFile,
    getFilePath
}

