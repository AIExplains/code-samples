// Define an array of 100 objects. Each object has an id.
const items = Array.from({ length: 100 }, (v, i) => ({ id: i + 1 }));

// 1. forEach - Efficient for arrays, provides direct access to each element.
function forEachLoop() {
  // Using forEach to iterate over each item in the array
  items.forEach(item => {
    // Log the id of each item
    console.log(item.id);
  });
}

// 2. for - Traditional loop, very efficient for accessing array elements by index.
function forLoop() {
  // Using a for loop to iterate from 0 to the length of the items array
  for (let i = 0; i < items.length; i++) {
    // Access and log the id of each item using its index
    console.log(items[i].id);
  }
}

// 3. while - Efficient, but requires manual index management.
function whileLoop() {
  // Initialize an index variable for the while loop
  let i = 0;
  // Continue looping as long as i is less than the length of the items array
  while (i < items.length) {
    // Log the id of each item, then increment the index
    console.log(items[i].id);
    i++;
  }
}

// 4. do...while - Similar to while but guarantees execution at least once.
function doWhileLoop() {
  // Initialize an index variable for the do...while loop
  let i = 0;
  // Execute the loop at least once and continue until i is no longer less than the items length
  do {
    // Log the id of each item
    console.log(items[i].id);
    // Increment the index
    i++;
  } while (i < items.length);
}

// 5. for...in - Intended for iterating over object properties; less efficient for arrays.
function forInLoop() {
  // Using for...in to iterate over the items array
  for (let index in items) {
    // Log the id of each item. Note: index is a string here.
    console.log(items[index].id);
  }
}

// Example calls to each function
forEachLoop();
forLoop();
whileLoop();
doWhileLoop();
forInLoop();
