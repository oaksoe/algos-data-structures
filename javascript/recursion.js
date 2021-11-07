const recursiveMaxValue = (arr, low, high) => {
    if (low === high) {
        return arr[low];
    }

    const maxValue = recursiveMaxValue(arr, low + 1, high);

    if (arr[low] > maxValue) {
        return arr[low];
    }

    return maxValue;
}

const arr1 = [16, 30, 24, 7, 62, 45, 5, 55];
console.log('Recursive max value: ', recursiveMaxValue(arr1, 0, arr1.length - 1));

/**
 * fibonacci series: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
 * fibonacci(0) = 0;
 * fibonacci(1) = 1;
 * fibonacci(2) = fibonacci(0) + fibonacci(1);
 * fibonacci(n) = fibonacci(n-1) + fibonacci(n-2);
 */ 
const fibonacci = (n) => {
    if (n == 0 || n == 1) {
        return n;
    }

    return fibonacci(n-1) + fibonacci(n-2);
}

console.log('Fibonacci series: ', [...new Array(10)].map((_, index) => fibonacci(index)));