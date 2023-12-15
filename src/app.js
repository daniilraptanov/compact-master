const { getObjectsToProcessing } = require('./tools/file-handlers');
const { DEFAULT_FILES_EXTENSION } = require('./constants');
const { createWorker } = require('./threads/worker-handlers');
const { getValidArguments } = require('./tools/parse-args-handlers');
const { stringToBoolean } = require('./tools/utils');

const spawnWorkers = (
    toProcessing = [], 
    dirname = process.cwd(), 
    extension = DEFAULT_FILES_EXTENSION,
    decompress = false,
) => {
    const workers = [];
  
    toProcessing.forEach((name) => {
        const worker = createWorker(dirname, name, extension, decompress);
        workers.push(worker);
    });
  
    return workers;
}

const app = (dirname, extension) => {
    const args = getValidArguments();
    const decompress = stringToBoolean(args.decompress);

    const toProcessing = getObjectsToProcessing(dirname, extension, decompress);
    spawnWorkers(toProcessing, dirname, extension, decompress);
}

app(process.cwd(), DEFAULT_FILES_EXTENSION);

