// complexity: O(n-1)
export const minValue = (arr) => {
    let min = arr[0];
    let minIndex = 0;

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
            minIndex = i;
        }
    }

    return { value: min, index: minIndex };
}

// complexity: O(n-1)
export const maxValue = (arr) => {
    let max = arr[0];
    let maxIndex = 0;
  
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
            maxIndex = i;
        }
    }
  
    return { value: max, index: maxIndex };
}

// complexity: O(n)
export const subArray = (arr, index, length) => {
    if (index < 0 || index > arr.length - 1) {
        throw new Error('index is out of bound');
    }

    if (index + length > arr.length) {
        throw new Error('length of sub-array is out of bound');
    }

    const subArray = [];

    for (let i = 0; i < length; i++) {
        subArray.push(arr[index + i]);
    }

    return subArray;
}

// complexity: O(3)
export const swap = (arr, index1, index2) => {
    let temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}