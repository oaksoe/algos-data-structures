import { 
  minValue, 
  maxValue, 
  subArray,
  swap,
} from './utils';

const arr1 = [16, 30, 24, 7, 62, 45, 5, 55];
const arr2 = [1, 2, 3, 4, 5, 6, 7, 8];
const arr3 = [8, 7, 6, 5, 4, 3, 2, 1];

// ###################### Bubble Sort ######################
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

// ###################### Selection Sort ######################
// Complexity: (n-1) + (n-2) + ... + 2 + 1 = 1/2 * n * (n-1) => O(n ** 2)
const selectionSort = (arr) => {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    let minItem = arr[i];

    // find smallest number
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < minItem) {
        minIndex = j;
        minItem = arr[j];
      }
    }

    // swap smallest number with the value at current index i
    swap(arr, i, minIndex);
  }
  
  return arr;
};

const selectionSortedArr = selectionSort(arr1.slice());

console.log('Selection sort: ', arr1, selectionSortedArr);

// ###################### Insertion Sort ######################
/** 
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

// ###################### Quick Sort ######################
/**  
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

/** 
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

// ###################### Merge Sort ######################
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

/**
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

// ###################### Heap Sort ######################
/**
 * What is a heap?
 * A heap is a binary tree with a few rules:
 * 1. It must be a complete binary tree (all nodes are filled up on any level)
 * 2. It's either max heap or min heap. In max heap, each parent value is larger than the values of its both children,
 *    and parent value is smaller in min heap.
 * 
 * How heap sort works?
 * 1. Build a max heap, with the root element at index 0 has the biggest value
 * 2. Swap the biggest value at the top of the heap with the last element of the unsorted array. 
 *    Now, the 1-item subarray on the right, with the last element is sorted, whereas
 *    the left subarray from index 0 to second last element is still unsorted, and it is no longer a max heap
 * 3. Restore the heap
 * 4. Repeat step 2 and 3 until the heap has only 1 item left in the left unsorted subarray. 
 */

/**
 * How heapify works?
 * Consider a sub-tree with 3 nodes: parent, left child and right child.
 * 1. find the biggest value among these nodes. 
 * 2. If parent node holds the biggest value, it means the sub-tree is a max heap. No further action is needed.
 * 3. If not, swap the values of parent and any child node holding biggest value.
 * 4. Smaller value, being placed at the child node, its sub-tree will need to be heapified. 
 *    So, heapify it.
 */
const heapify = (arr, parent, maxLength) => {
  let largest = parent;
  let left = parent * 2 + 1;
  let right = left + 1;

  if (left < maxLength && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < maxLength && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== parent) {
    [arr[parent], arr[largest]] = [arr[largest], arr[parent]];

    heapify(arr, largest, maxLength);
  }
}

/**
 * To build a max heap, it needs to go bottom-up, from lowest-level sub-tree to the top
 * Starting from 'index = arr.length / 2 - 1', decrementing by 1 till 'index >=0'
 * makes sure that all one-level sub-trees are heapified.
 */
const buildMaxHeap = (arr) => {
  for (let index = Math.floor(arr.length / 2 - 1); index >= 0; index--) {
    heapify(arr, index, arr.length);
  }
}

// Complexity: O(n * log n <base 2>)
const heapSort = (arr) => {
  buildMaxHeap(arr);

  for (let lastOutOfOrder = arr.length - 1; lastOutOfOrder >= 0; lastOutOfOrder--) {
    // swap top element of the heap with the last out-of-order value
    [arr[0], arr[lastOutOfOrder]] = [arr[lastOutOfOrder], arr[0]];
    
    // Restore the heap
    heapify(arr, 0, lastOutOfOrder);
  }

  return arr;
}

const heapSortedArr = heapSort(arr1.slice());

console.log('Heap sort: ', arr1, heapSortedArr);