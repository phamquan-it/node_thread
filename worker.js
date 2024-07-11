import { parentPort, workerData } from 'worker_threads';

// Log a message to indicate that the worker thread is running
console.log(`Worker thread started: ${workerData.threadName}`);

// Log the received data and print Hello World with the thread name
console.log(`Hello World from ${workerData.threadName}`);

// Optionally, send a result back to the main thread
parentPort.postMessage(`Hello World from ${workerData.threadName}`);

// Optionally, listen for messages from the main thread
parentPort.on('message', (message) => {
    console.log(`Message from main thread:`, message);
});
