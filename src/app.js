const { getFilesNamesDir } = require('./tools/file-handlers');
const { DEFAULT_FILES_EXTENSION } = require('./constants');
const { createWorker } = require('./threads/worker-handlers');
const { getValidArguments } = require('./tools/parse-args-handlers');

const spawnWorkers = (
    filesNames = [], 
    dirname = process.cwd(), 
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
    const { decompress } = getValidArguments();

    const filesNames = getFilesNamesDir(dirname)
        .filter(name => name.endsWith(extension));
    spawnWorkers(filesNames, dirname, extension);
}

app(process.cwd(), DEFAULT_FILES_EXTENSION);


// TODO ::
/**
 * 1. threads (done)
 * 2. modes (in progress)
 * 3. c++ optimization
 * 4. compile to exe (done)
 */
