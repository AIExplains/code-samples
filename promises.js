// Example of using a Callback
function exampleCallback(callback) {
    // Simulate a task that takes 2 seconds to complete
    setTimeout(() => {
        try {
            // Assuming the task was successful
            const result = "Callback result";
            callback(null, result); // First argument for error, second for success
        } catch (error) {
            callback(error, null); // Callback with an error
        }
    }, 2000);
}

// Example of using Promises
function examplePromise() {
    // Return a new promise
    return new Promise((resolve, reject) => {
        // Simulate a task that takes 2 seconds
        setTimeout(() => {
            try {
                const result = "Promise result"; // Assuming success
                resolve(result); // Resolve the promise with result
            } catch (error) {
                reject(error); // Reject the promise if an error occurs
            }
        }, 2000);
    });
}

// Example of using async/await with try-catch for error handling
async function exampleAsyncAwait() {
    try {
        const result = await examplePromise(); // Await for the promise to resolve
        console.log(result); // Log the result
    } catch (error) {
        console.error("Error in async/await example:", error); // Log any errors
    }
}

// Example of using Promise.all to handle multiple promises
function examplePromiseAll() {
    // Create an array of promises
    const promises = [examplePromise(), examplePromise(), examplePromise()];

    // Use Promise.all to wait for all promises to resolve
    Promise.all(promises)
        .then(results => {
            console.log("Results from Promise.all:", results); // Log all results
        })
        .catch(error => {
            console.error("Error in Promise.all:", error); // Log any errors
        });
}

// Invoking the examples
exampleCallback((error, result) => {
    if (error) {
        console.error("Error in callback example:", error);
    } else {
        console.log("Result from callback:", result);
    }
});

examplePromise()
    .then(result => console.log("Result from promise:", result))
    .catch(error => console.error("Error in promise example:", error));

exampleAsyncAwait();
examplePromiseAll();
