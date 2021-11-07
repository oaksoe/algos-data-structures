const arr1 = [16, 30, 24, 7, 62, 45, 5, 55];
const arr2 = [1, 2, 3, 4, 5, 6, 7, 8];
const arr3 = [8, 7, 6, 5, 4, 3, 2, 1];
const orderedArr = [5, 7, 16, 24, 30, 45, 55, 62];

// ###################### Sequential Search ######################
// Complexity: best case O(1), worst case O(n), average case O((n+1)/2)
const sequentialSearch = (arr, item) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === item) {
            return i;
        }
    }
    
    return -1;
};
  
const sequentialSearchedItem = 62;
const sequentialSearchedItemIndex = sequentialSearch(arr1.slice(), sequentialSearchedItem);
  
console.log('Sequential search: ', arr1, `${sequentialSearchedItem} found at index: ${sequentialSearchedItemIndex}`);

// ###################### Binary Search on Ordered Lists ######################
// Complexity: Successful search O(2 * (log n <base 2>) - 3), Unsuccessful search O(2 * log (n+1) <base 2>)
const binarySearch = (arr, item, low, high) => {
    if (low > high) {
        return -1;
    }

    const mid = Math.floor((low + high) / 2);

    if (item === arr[mid]) {
        return mid;
    }

    if (item < arr[mid]) {
        return binarySearch(arr, item, low, mid - 1);
    }
    
    return binarySearch(arr, item, mid + 1, high);
};

const binarySearchedItem = 30;
const binarySearchedItemIndex = binarySearch(orderedArr.slice(), binarySearchedItem, 0, orderedArr.length - 1);
  
console.log('Binary search: ', orderedArr, `${binarySearchedItem} found at index: ${binarySearchedItemIndex}`);