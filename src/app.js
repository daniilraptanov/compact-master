const { encode, defineCodes } = require('./compressing/huffman-compressing');
const { readTextFromFile, getFilesNamesDir } = require('./tools/file-handlers');
const { DEFAULT_FILES_EXTENSION } = require('./constants');
const { createWorker } = require('./tools/threads/worker-handlers');
const { writeResultToFile } = require('./tools/file-handlers');
const { writeMetaToFile } = require('./tools/file-handlers');
const { bitsToBuffer } = require('./tools/utils');
const path = require('path');



const fileHandler = (dirname, fileName) => {
    const filePath = path.join(dirname, fileName);

    const data = readTextFromFile(filePath);
    const codes = defineCodes(data);
    const encoded = encode(data, codes);

    const encodedBuffer = bitsToBuffer(encoded);
    writeResultToFile(encodedBuffer, dirname);
    writeMetaToFile(codes, dirname);
}

const spawnWorkers = (filesNames = [], dirname = __dirname) => {
    const workers = [];
  
    filesNames.forEach((fileName) => {
        const worker = createWorker(fileHandler(dirname, fileName));
        workers.push(worker);
    });
  
    return workers;
}

const app = (dirname, extension) => {
    const filesNames =  getFilesNamesDir(dirname)
        .filter(name => name.endsWith(extension));

    // if (isMainThread) {
    //     filesNames.concat(
    //         getFilesNamesDir(dirname)
    //             .filter(name => name.endsWith(extension))
    //     );
    // }
    spawnWorkers(filesNames, dirname);
}

app(__dirname, DEFAULT_FILES_EXTENSION);


// TODO ::
/**
 * 1. threads
 * 2. modes
 * 3. c++ optimization (?)
 */
