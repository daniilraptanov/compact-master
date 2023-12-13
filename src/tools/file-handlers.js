const fs = require('fs');
const v8 = require('v8');
const path = require('path');
const { RESULT_FILE_NAME, META_FILE_NAME, HUFFMAN_TYPE } = require('../constants');
const { mapToObject, bufferToBits, objectToMap } = require('./utils');

const readTextFromFile = (filePath) => {
    return fs.readFileSync(filePath, 'utf8');
}

const getFilesNamesDir = (dirname) => {
    return fs.readdirSync(dirname);
}

const getPureFileName = (fileName, extension) => {
    return fileName.split(extension)[0];
}

const getPureFileByHuffDir = (name) => {
    return name.split(HUFFMAN_TYPE)[0];
}

const getFilePath = (dirname, fileName) => {
    return path.join(dirname, fileName);
}

const getHuffFileDir = (dirname, fileName, extension) => {
    const pureName = getPureFileName(fileName, extension);
    const fileDir = path.join(dirname, pureName + HUFFMAN_TYPE);
    return fileDir;
}

const writeResultToFile = (data, dirname, fileName, extension) => {
    const fileDir = getHuffFileDir(dirname, fileName, extension);
    const binary = v8.serialize(data)
    fs.mkdirSync(fileDir, { recursive: true });
    fs.writeFileSync(path.join(fileDir, RESULT_FILE_NAME), binary);
}

const writeMetaToFile = (codes, dirname, fileName, extension) => {
    const fileDir = getHuffFileDir(dirname, fileName, extension);   
    fs.mkdirSync(fileDir, { recursive: true });
    fs.writeFileSync(path.join(fileDir, META_FILE_NAME), JSON.stringify(mapToObject(codes)));
}

const getObjectsToProcessing = (dirname, extension, decompress) => {
    return getFilesNamesDir(dirname)
        .filter((name) => {
            return !decompress
                ? name.endsWith(extension)
                : (!name.includes('.') && name.endsWith(HUFFMAN_TYPE));
        });
}

const readResultFromFile = (pathToData) => {
    const fileDir = path.join(pathToData, RESULT_FILE_NAME);
    return v8.deserialize(fs.readFileSync(fileDir));
}

const readMetaFromFile = (pathToData) => {
    const fileDir = path.join(pathToData, META_FILE_NAME);
    return objectToMap(JSON.parse(fs.readFileSync(fileDir, 'utf8')));
}

const writeTextToFile = (text, dirname, fileName, extension) => {
    fs.writeFileSync(path.join(dirname, getPureFileByHuffDir(fileName) + extension), text);
}

module.exports = {
    readTextFromFile,
    getFilesNamesDir,
    writeResultToFile,
    writeMetaToFile,
    getFilePath,
    getObjectsToProcessing,
    readResultFromFile,
    readMetaFromFile,
    writeTextToFile,
}

