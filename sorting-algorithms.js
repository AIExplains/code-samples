// A large fictional dataset of records
const records = [
  { firstname: 'John', lastname: 'Doe', email: 'john.doe@example.com' },
  { firstname: 'Jane', lastname: 'Doe', email: 'jane.doe@example.com' },
  { firstname: 'Alice', lastname: 'Smith', email: 'alice.smith@example.com' },
  // Add more records as needed
];

// Utility function to compare two records by lastname
function compareByLastName(a, b) {
  return a.lastname.localeCompare(b.lastname);
}

// Bubble Sort Algorithm
function bubbleSort(arr) {
  let n = arr.length;
  let swapped;
  do {
    swapped = false;
    for (let i = 1; i < n; i++) {
      // Compare adjacent elements
      if (compareByLastName(arr[i - 1], arr[i]) > 0) {
        // Swap if elements are in wrong order
        [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
        swapped = true;
      }
    }
    // Repeat until no swaps are done
  } while (swapped);
  return arr;
}

// Selection Sort Algorithm
function selectionSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      // Find the minimum element in the unsorted array
      if (compareByLastName(arr[j], arr[minIdx]) < 0) {
        minIdx = j;
      }
    }
    // Swap the found minimum element with the first element
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}

// Insertion Sort Algorithm
function insertionSort(arr) {
  let n = arr.length;
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    // Move elements of arr[0..i-1], that are greater than key, to one position ahead of their current position
    while (j >= 0 && compareByLastName(arr[j], key) > 0) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
  return arr;
}

// Merge Sort Algorithm
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let resultArray = [], leftIndex = 0, rightIndex = 0;

  // Concatenate values into the resultArray in order
  while (leftIndex < left.length && rightIndex < right.length) {
    if (compareByLastName(left[leftIndex], right[rightIndex]) < 0) {
      resultArray.push(left[leftIndex]);
      leftIndex++;
    } else {
      resultArray.push(right[rightIndex]);
      rightIndex++;
    }
  }

  // Concatenate remaining elements
  return resultArray
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
}

// Quick Sort Algorithm
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const pivot = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (compareByLastName(arr[i], pivot) < 0) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

// Sorting the records using each algorithm
console.log("Bubble Sort:", bubbleSort([...records]));
console.log("Selection Sort:", selectionSort([...records]));
console.log("Insertion Sort:", insertionSort([...records]));
console.log("Merge Sort:", mergeSort([...records]));
console.log("Quick Sort:", quickSort([...records]));