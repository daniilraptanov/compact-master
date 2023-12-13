const { parentPort, threadId, workerData } = require('worker_threads');
const { readTextFromFile, getFilePath, readResultFromFile, readMetaFromFile, writeTextToFile } = require('../tools/file-handlers');
const { defineCodes, encode, decode } = require('../compressing/huffman-compressing');
const { writeResultToFile, writeMetaToFile } = require('../tools/file-handlers');

const encodeFileHandler = (dirname, fileName, extension) => {
    const filePath = getFilePath(dirname, fileName);

    const data = readTextFromFile(filePath);
    const codes = defineCodes(data);
    const encoded = encode(data, codes);

    writeResultToFile(encoded, dirname, fileName, extension);
    writeMetaToFile(codes, dirname, fileName, extension);
}

const decodeFileHandler = (dirname, fileName, extension) => {
    // Directory with result.bin & meta.txt
    const pathToData = getFilePath(dirname, fileName);
    
    const encoded = readResultFromFile(pathToData);
    const meta = readMetaFromFile(pathToData);
    
    const decodedText = decode(encoded, meta);

    writeTextToFile(decodedText, dirname, fileName, extension);
}

if (!workerData.decompress) {
    parentPort.postMessage(`${threadId} compressing started...`);
    encodeFileHandler(workerData.dirname, workerData.fileName, workerData.extension);    
} else {
    parentPort.postMessage(`${threadId} decompressing started...`);
    decodeFileHandler(workerData.dirname, workerData.fileName, workerData.extension);
}

parentPort.postMessage('done');

