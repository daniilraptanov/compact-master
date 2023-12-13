const { parentPort, workerData } = require('worker_threads');
const { readTextFromFile, getFilePath } = require('../tools/file-handlers');
const { defineCodes, encode } = require('../compressing/huffman-compressing');
const { bitsToBuffer } = require('../tools/utils');
const { writeResultToFile, writeMetaToFile } = require('../tools/file-handlers');

const fileHandler = (dirname, fileName, extension) => {
    const filePath = getFilePath(dirname, fileName);

    const data = readTextFromFile(filePath);
    const codes = defineCodes(data);
    const encoded = encode(data, codes);

    const encodedBuffer = bitsToBuffer(encoded);
    writeResultToFile(encodedBuffer, dirname, fileName, extension);
    writeMetaToFile(codes, dirname, fileName, extension);
}

parentPort.postMessage('compressing started...');
fileHandler(workerData.dirname, workerData.fileName);
parentPort.postMessage('done');

