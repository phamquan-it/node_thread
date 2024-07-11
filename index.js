import { Worker, isMainThread, workerData } from 'node:worker_threads';

if (isMainThread) {
    console.log("Main thread");

    // Create the first worker thread
    const worker1 = new Worker('./worker.js', {
        workerData: { threadName: 'Worker 1' } // Pass thread name to the worker thread
    });

    // Create the second worker thread
    const worker2 = new Worker('./worker.js', {
        workerData: { threadName: 'Worker 2' } // Pass thread name to the worker thread
    });

    // Listen for messages from the first worker thread
    worker1.on('message', (message) => {
        console.log(`Received from ${worker1.threadId}:`, message);
    });

    // Listen for errors from the first worker thread
    worker1.on('error', (error) => {
        console.error(`Worker 1 error:`, error);
    });

    // Listen for the first worker thread exiting
    worker1.on('exit', (code) => {
        if (code !== 0) {
            console.error(`Worker 1 stopped with exit code ${code}`);
        } else {
            console.log('Worker 1 exited successfully');
        }
        console.log('Worker 1 thread stopped');
    });

    // Listen for messages from the second worker thread
    worker2.on('message', (message) => {
        console.log(`Received from ${worker2.threadId}:`, message);
    });

    // Listen for errors from the second worker thread
    worker2.on('error', (error) => {
        console.error(`Worker 2 error:`, error);
    });

    // Listen for the second worker thread exiting
    worker2.on('exit', (code) => {
        if (code !== 0) {
            console.error(`Worker 2 stopped with exit code ${code}`);
        } else {
            console.log('Worker 2 exited successfully');
        }
        console.log('Worker 2 thread stopped');
    });

    // Optionally, send a message to the worker threads
    worker1.postMessage('Hello Worker 1');
    worker2.postMessage('Hello Worker 2');

    // Terminate worker1 after 3 seconds
    setTimeout(() => {
        worker1.terminate().then(() => {
            console.log('stop thread1');
            console.log(worker2);
        }).catch((err) => {
            console.error('Failed to terminate worker1', err);
        });
    }, 3000); // 3 seconds
} else {
    console.log('Worker thread');
    // Worker thread logic goes here
}
