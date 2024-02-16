/**
 * Demonstrates complex uses of various array methods including find, filter, map, entries, reduce, sort, join, indexOf, slice, splice, and at.
 * Each function includes try-catch blocks for error handling and comments explaining the functionality.
 */

// Complex example using find
function findWithCondition(arr) {
    try {
        // Find the first element greater than 10 and is even
        const result = arr.find(element => element > 10 && element % 2 === 0);
        console.log('Find result:', result);
        return result;
    } catch (error) {
        console.error('Error in findWithCondition:', error);
    }
}

// Complex example using filter
function filterByCondition(arr) {
    try {
        // Filter elements that are odd and divisible by 5
        const result = arr.filter(element => element % 2 !== 0 && element % 5 === 0);
        console.log('Filter result:', result);
        return result;
    } catch (error) {
        console.error('Error in filterByCondition:', error);
    }
}

// Complex example using map
function mapToSquareAndSubtract(arr) {
    try {
        // Map each element to its square minus 2
        const result = arr.map(element => element ** 2 - 2);
        console.log('Map result:', result);
        return result;
    } catch (error) {
        console.error('Error in mapToSquareAndSubtract:', error);
    }
}

// Complex example using entries
function logEntries(arr) {
    try {
        // Log each array entry (index and value)
        for (const [index, value] of arr.entries()) {
            console.log(`Index: ${index}, Value: ${value}`);
        }
    } catch (error) {
        console.error('Error in logEntries:', error);
    }
}

// Complex example using reduce
function reduceToSumOfUniqueElements(arr) {
    try {
        // Sum only unique elements
        const result = arr.reduce((acc, current) => {
            if (!acc.seen.has(current)) {
                acc.seen.add(current);
                acc.sum += current;
            }
            return acc;
        }, {sum: 0, seen: new Set()}).sum;
        console.log('Reduce result:', result);
        return result;
    } catch (error) {
        console.error('Error in reduceToSumOfUniqueElements:', error);
    }
}

// Complex example using sort
function sortByDescendingThenByName(arr) {
    try {
        // Assuming each element is an object with age and name properties
        // Sort by age in descending order; if ages are equal, sort by name alphabetically
        const result = arr.sort((a, b) => b.age - a.age || a.name.localeCompare(b.name));
        console.log('Sort result:', result);
        return result;
    } catch (error) {
        console.error('Error in sortByDescendingThenByName:', error);
    }
}

// Complex example using join
function joinNames(arr) {
    try {
        // Assuming array of names, join them with a custom separator
        const result = arr.join(' | ');
        console.log('Join result:', result);
        return result;
    } catch (error) {
        console.error('Error in joinNames:', error);
    }
}

// Complex example using indexOf
function indexOfCustomCondition(arr, conditionFunc) {
    try {
        // Find index of the first element that meets a custom condition
        const index = arr.findIndex(conditionFunc);
        console.log('IndexOf result:', index);
        return index;
    } catch (error) {
        console.error('Error in indexOfCustomCondition:', error);
    }
}

// Complex example using slice
function sliceAndReverse(arr, start, end) {
    try {
        // Slice the array from start to end, then reverse the sliced part
        const result = arr.slice(start, end).reverse();
        console.log('Slice result:', result);
        return result;
    } catch (error) {
        console.error('Error in sliceAndReverse:', error);
    }
}

// Complex example using splice
function spliceAndReplace(arr, start, deleteCount, ...items) {
    try {
        // Splice the array: at start index, delete deleteCount elements and insert items
        arr.splice(start, deleteCount, ...items);
        console.log('Splice result:', arr);
        return arr;
    } catch (error) {
        console.error('Error in spliceAndReplace:', error);
    }
}

// Complex example using at
function logElementAt(arr, index) {
    try {
        // Log the element at the given index, supporting negative indices
        const result = arr.at(index);
        console.log('Element at index:', result);
        return result;
    } catch (error) {
        console.error('Error in logElementAt:', error);
    }
}

// Example usage
const sampleArray = [5, 12, 8, 130, 44];
findWithCondition(sampleArray);
filterByCondition(sampleArray);
mapToSquareAndSubtract(sampleArray);
logEntries(sampleArray);
reduceToSumOfUniqueElements(sampleArray);
sortByDescendingThenByName([{age: 25, name: 'John'}, {age: 25, name: 'Doe'}, {age: 30, name: 'Smith'}]);
joinNames(['Alice', 'Bob', 'Charlie']);
indexOfCustomCondition(sampleArray, x => x > 10);
sliceAndReverse(sampleArray, 1, 4);
spliceAndReplace(sampleArray, 1, 2, 99, 100);
logElementAt(sampleArray, -1);
