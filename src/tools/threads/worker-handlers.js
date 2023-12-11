const { Worker } = require('worker_threads');

// const WORKER_SCRIPT = `
//   const { parentPort, workerData } = require('worker_threads');
//   parentPort.postMessage('started...');

//   workerData.callback();

//   parentPort.postMessage('done');
// `;

const createWorker = (callback) => {
    const worker = new Worker("./worker-script.js", { workerData: { callback } });

    worker.on('message', message => {
        console.log(`MESSAGE: ${message}`);
    });  

    worker.on('error', error => {
      console.error(`ERROR: ${error}`);
    });

    worker.on('exit', code => {
      if (code !== 0) {
        console.error(`EXIT: error with code: ${code}`);
      }
    });
}

module.exports = { createWorker }
