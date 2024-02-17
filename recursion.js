// Example 1: Calculate factorial of a number - Basic Recursion
function factorial(n) {
  try {
    if (n < 0) throw 'Invalid input: n must be >= 0'; // Validate input
    if (n === 0 || n === 1) return 1; // Base case: factorial of 0 or 1 is 1
    return n * factorial(n - 1); // Recursive case: n! = n * (n-1)!
  } catch (error) {
    console.error(`Error calculating factorial: ${error}`);
    return undefined; // Return undefined in case of error
  }
}

// Example 2: Traverse and sum values in a nested object - Intermediate Recursion
function sumNestedObjectValues(obj) {
  let sum = 0; // Initialize sum
  try {
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      if (typeof value === 'number') sum += value; // Add if value is a number
      else if (typeof value === 'object') sum += sumNestedObjectValues(value); // Recurse if value is an object
    });
    return sum;
  } catch (error) {
    console.error(`Error summing nested object values: ${error}`);
    return undefined;
  }
}

// Example 3: Deep cloning of a complex object - Advanced Recursion
function deepClone(object) {
  try {
    if (object === null || typeof object !== 'object') return object; // Base case for primitives and null
    let cloneObject;
    if (Array.isArray(object)) {
      cloneObject = []; // Initialize as array if source is an array
      object.forEach((item, index) => {
        cloneObject[index] = deepClone(item); // Recursively clone each item
      });
    } else {
      cloneObject = {}; // Initialize as object if source is an object
      Object.keys(object).forEach(key => {
        cloneObject[key] = deepClone(object[key]); // Recursively clone each property
      });
    }
    return cloneObject;
  } catch (error) {
    console.error(`Error deep cloning object: ${error}`);
    return undefined;
  }
}

// Usage Examples (Uncomment to test)
// console.log(factorial(5)); // Calculates factorial of 5
// const nestedObject = {a: 1, b: {c: 2, d: {e: 3}}};
// console.log(sumNestedObjectValues(nestedObject)); // Sums values in a nested object
// const complexObject = {arr: [1, 2, {nested: 3}], obj: {prop: 'value'}};
// console.log(deepClone(complexObject)); // Deep clones a complex object
