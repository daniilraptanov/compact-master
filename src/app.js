const { getFilesNamesDir } = require('./tools/file-handlers');
const { DEFAULT_FILES_EXTENSION } = require('./constants');
const { createWorker } = require('./threads/worker-handlers');

const spawnWorkers = (
    filesNames = [], 
    dirname = __dirname, 
    extension = DEFAULT_FILES_EXTENSION
) => {
    const workers = [];
  
    filesNames.forEach((fileName) => {
        const worker = createWorker(dirname, fileName, extension);
        workers.push(worker);
    });
  
    return workers;
}

const app = (dirname, extension) => {
    const filesNames =  getFilesNamesDir(dirname)
        .filter(name => name.endsWith(extension));
    spawnWorkers(filesNames, dirname, extension);
}

app(__dirname, DEFAULT_FILES_EXTENSION);


// TODO ::
/**
 * 1. threads
 * 2. modes
 * 3. c++ optimization (?)
 * 4. compile to exe
 */
