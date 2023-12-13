const path = require('path');
const { Worker } = require('worker_threads');


const createWorker = (dirname, fileName, extension) => {
    const worker = new Worker(
      path.resolve(__dirname, 'worker-script.js'), 
        { workerData: { dirname, fileName, extension } }
    );

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
