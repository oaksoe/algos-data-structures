import { 
  minValue, 
  maxValue, 
  subArray,
  swap,
} from './utils';

const arr1 = [16, 30, 24, 7, 62, 45, 5, 55];
const arr2 = [1, 2, 3, 4, 5, 6, 7, 8];
const arr3 = [8, 7, 6, 5, 4, 3, 2, 1];

// Complexity: O(n ** 2)
const bubbleSort = (arr) => {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 1; j < arr.length - i; j++) {
      if (arr[j] < arr[j-1]) {
        swap(arr, j, j-1);
      }
    }
  }
  
  return arr;
};

const bubbleSortedArr = bubbleSort(arr1.slice());

console.log('Bubble sort: ', arr1, bubbleSortedArr);

// Complexity: (n-1) + (n-2) + ... + 2 + 1 = 1/2 * n * (n-1) => O(n ** 2)
const selectionSort = (arr) => {
  let subArr = subArray(arr, 0, arr.length);

  for (let i = 0; i < arr.length - 1; i++) {
    // find smallest number
    const { index: minIndex } = minValue(subArr);

    // swap smallest value with arr[i] which is theoretically subArr[0]
    swap(arr, i, i + minIndex);

    // create a subarray without the first one
    subArr = subArray(arr, i + 1, arr.length - i - 1);
  }
  
  return arr;
};

const selectionSortedArr = selectionSort(arr1.slice());

console.log('Selection sort: ', arr1, selectionSortedArr);

/* 
 * Complexity: 
 * Best case (sorted array): O(n-1)
 * Worst case (in reverse order): 1/2 * n * (n-1) => O(n ** 2), same as Selection Sort
 * Average case: 1/4 * (n ** 2) + n = O(n ** 2)
 */
const insertionSort = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    /* 
     * If current item is smaller than its previous, means that 
     * subarray from index 0 to current index becomes unsorted because of it.
     * Let's call that item 'unsorter'. To sort back the sub-array, 
     * unsorter needs to be inserted at the correct location, and hence,
     * each value starting from the location of insertion needs to make one step to the right
     */
    if (arr[i] < arr[i-1]) {
      const unsorter = arr[i];
      let loc = i;

      /* 
       * loc is set to the index of the unsorter. 
       * The value on the left of loc needs to move one step right
       * and loc needs to point to one step left
       * until loc reaches start of the array or the left value is bigger than the unsorter.
       */
      do {
        arr[loc] = arr[loc-1];
        loc--;
      } while (loc > 0 && arr[loc-1] > unsorter);

      // Now that location if found, insert the unsorter value and the entire subarray becomes sorted again
      arr[loc] = unsorter;
    }
  }

  return arr;
}

const insertionSortedArr = insertionSort(arr1.slice());

console.log('Insertion sort: ', arr1, insertionSortedArr);

/*  
 * First, choose the middle item of the array as pivot
 * The goal is the pivot item needs to be at the actual pivot loc
 * where all the left items are smaller and all the right items are bigger.
 * To achieve so, 
 * - swap the pivot item with the first item. This will let it remain at one place until its rightful position is found.
 * - starting from the second item till the last item, move any item, smaller than the pivot, to the left, by swapping
 * - the last swapped position is the actual loc for pivot so swap it with the pivot value at the first index 
 */
const partition = (arr, first, last) => {
  let pivot;
  let smallIndex;

  swap(arr, first, parseInt((first + last) / 2));
  pivot = arr[first];
  smallIndex = first;

  for (let i = first + 1; i <= last; i++) {
    if (arr[i] < pivot) {
      smallIndex++;
      swap(arr, smallIndex, i);
    }
  }

  swap(arr, first, smallIndex);
  return smallIndex;
}

/* 
 * Once the pivot location is found and the array becomes balanced
 * (left partition smaller than the pivot, and the right bigger),
 * do the same operation to its left and right partition recursively
 */
const recQuickSort = (arr, first, last) => {
  let pivotLoc;

  if (first < last) {
    pivotLoc = partition(arr, first, last);
    recQuickSort(arr, first, pivotLoc - 1);
    recQuickSort(arr, pivotLoc + 1, last);
  }
}

// Complexity: Average case O(n * log n <base 2>), Worst case O(n ** 2)
const quickSort = (arr) => {
  recQuickSort(arr, 0, arr.length - 1);
  return arr;
}

const quickSortedArr = quickSort(arr1.slice());

console.log('Quick sort: ', arr1, quickSortedArr);

/*
 * Make a new sorted array from the items of left and right arrays.
 */
const merge = (leftArr, rightArr) => {
  const mergedArr = [];

  while(leftArr.length !== 0 && rightArr.length !== 0) {
    if (leftArr[0] < rightArr[0]) {
      mergedArr.push(leftArr.shift());
    } else {
      mergedArr.push(rightArr.shift());
    }
  }

  return [...mergedArr, ...leftArr, ...rightArr];
}

/*
 * Keep splitting the array into left and right subarrays recursively
 * until only one item left in the subarray and then merge them back
 */
const recMergeSort = (arr) => {
  if (arr.length === 1) {
    return arr;
  }

  const mid = parseInt(arr.length / 2);
  const left = arr.splice(0, mid);
  return merge(recMergeSort(left), recMergeSort(arr));
}

// Complexity: O(n * log n <base 2>)
const mergeSort = (arr) => {
  return recMergeSort(arr);
}

const mergeSortedArr = mergeSort(arr1.slice());

console.log('Merge sort: ', arr1, mergeSortedArr);
