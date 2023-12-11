const { parentPort, workerData } = require('worker_threads');

parentPort.postMessage('started...');
console.log(workerData);
workerData.callback();
parentPort.postMessage('done');
