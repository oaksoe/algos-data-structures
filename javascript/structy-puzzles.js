// uncompress
const uncompress = (s) => {
  let uncompressed = [];
  let current = 0;

  while(current < s.length) {
    let next = current + 1;
    let multiplier = parseInt(s[current]);

    while (!isNaN(s[next])) {
      multiplier = multiplier * 10 + parseInt(s[next]);
      next += 1;
    }

    uncompressed = [...uncompressed, ...(Array(multiplier).fill(s[next]))];
    current = next + 1;
  }

  return uncompressed.join('');
};

// Solution by Ashraf (Credit: Ashraf)
// const uncompress = (s) => {
//     // time O(n * m)
//     // space O(n * m)
//     let num = '';
//     let res = '';
    
//     for(let i = 0; i < s.length; ++i){
//       const char = s[i];
//       if(Number.isInteger(Number(char))){
//         num += char;
//       }else {
//         for(let j = 0; j < Number(num); ++j){
//           res += char;
//         }
//         num = ''
//       }
//     }
    
//     return res;
//   };

console.log(uncompress('2c3a'));
console.log(uncompress('2c3a1t'));
console.log(uncompress('3n12e2z'));
console.log(uncompress('127y'));

// compress
const compress = (s) => { 
    let compressed = '';
    let current = 0;
    
    while(current < s.length) {
      let next = current + 1;
      let count = 1;
  
      while (s[next] === s[current]) {
        count += 1;
        next += 1;
      }
  
      compressed += count === 1 ? s[current] : `${count}${s[current]}`;
  
      current = next;
    }
  
    return compressed;
  }
  
  // Solution by Ashraf (Credit: Ashraf)
  // const compress = (s) => {
  //     let result = ''
  //     let count = 1;
  //     let prev = s[0];
      
  //     let i = 1;
  //     while(i < s.length){
  //       const current = s[i];
  //       if(current === prev){
  //         ++count;
  //       }else if(current !== prev) {
  //         result += (count > 1 ? count : '') + prev;
  //         count = 1;
  //         prev = current;
  //       }
  //       ++i
  //     }
      
  //     result += (count > 1 ? count : '') + prev;
      
  //     return result
  //   };

console.log(compress('ccaaatsss'));

// anagrams
const anagrams = (s1, s2) => {
  if (s1.length !== s2.length) return false;

  const s1CountMap = {};
  const s2CountMap = {};

  for (let i = 0; i < s1.length; i += 1) {
    if (!(s1[i] in s1CountMap)) {
      s1CountMap[s1[i]] = 0;
    }

    s1CountMap[s1[i]] += 1;
  }

  for (let i = 0; i < s2.length; i += 1) {
    if (!(s2[i] in s2CountMap)) {
      s2CountMap[s2[i]] = 0;
    }

    s2CountMap[s2[i]] += 1;
  }

  for (let i = 0; i < s1.length; i += 1) {
    if (s1CountMap[s1[i]] !== s2CountMap[s1[i]]) {
      return false;
    }
  }

  return true;
};

// Solution by Ashraf (Credit: Ashraf)
// const anagrams = (s1, s2) => {
//   if(s1.length !== s2.length) return false;
  
//   const map = {}
  
//   for(let i = 0; i < s1.length; ++i){
//     const char = s1[i];
//     if(char in map){
//       map[char] += 1;
//     }else {
//       map[char] = 1;
//     }
//   }
  
//   for(let i = 0; i < s2.length; ++i){
//     const char = s2[i];
//     if(char in map){
//       if(map[char] === 1) {
//         delete map[char];
//       }else {
//         map[char] -= 1;
//       }
//     } else {
//       return false;
//     }
//   }
  
//   return true
// }

console.log(anagrams('restful', 'fluster'));
console.log(anagrams('cats', 'tocs'));

// mostFrequentChar
const mostFrequentChar = (s) => {
  const map = {};

  for (let i = 0; i < s.length; i += 1) {
    const char = s[i];

    if (!(char in map)) {
      map[char] = 0;
    }

    map[char] += 1;
  }

  let max = 0;
  let freqChar = '';

  for (let char in map) {
    if (map[char] > max) {
      max = map[char];
      freqChar = char;
    }
  }

  return freqChar;
};

// Solution by Ashraf (Credit: Ashraf)
// const mostFrequentChar = (s) => {
//   const map = {}
  
//   for(let i = 0; i < s.length; ++i){
//     if(s[i] in map) map[s[i]] += 1;
//     else map[s[i]] = 1;
//   }
  
//   let max = s[0];
  
//   for(let char in map){
//     if(map[char] > map[max]){
//       max = char
//     }
//   }
  
//   return max
// };

console.log(mostFrequentChar('bookeeper'));

// pairSum
const pairSum = (numbers, targetSum) => {
  const map = {};

  for (let i = 1; i < numbers.length; i += 1) {
    map[numbers[i]] = i;
  }
  
  for (let i = 0; i < numbers.length; i += 1) {
    const remainder = targetSum - numbers[i];

    if (remainder in map) {
      return [i, map[remainder]];
    }
  }

  return null;
}

// Solution by Ashraf (Credit: Ashraf)
// const pairSum = (numbers, targetSum) => { 
//   /*
//   // time O(n^2)
//   // space O(1)
//   for(let i = 0; i < numbers.length; ++i){
//     for(let j = i + 1; j < numbers.length; ++j){
//       if(numbers[i] + numbers[j] === targetSum) return [i, j];
//     }
//   }
//   */
  
  
//   // time O(n)
//   // space O(n)
  
//   const complementMap = {};
  
//   for(let i = 0; i < numbers.length; ++i){
//     const num = numbers[i];
//     complementMap[targetSum - num] = i;
//   }
  
//   for(let i = 0; i < numbers.length; ++i){
//     const num = numbers[i];
//     if(num in complementMap && complementMap[num] !== i) return [complementMap[num], i]
//   }

// };

console.log(pairSum([3, 2, 5, 4, 1], 8));

// pairProduct
const pairProduct = (numbers, targetProduct) => { 
  const map = {};

  for (let i = 0; i < numbers.length; i += 1) {
    if (targetProduct % numbers[i] === 0) {
      map[numbers[i]] = i;
    }
  }
  
  for (const num in map) {
    const remainder = targetProduct / num;

    if (remainder in map) {
      return [map[num], map[remainder]];
    }
  }

  return null;
}

// Solution by Ashraf (Credit: Ashraf)
// const pairProduct = (numbers, targetProduct) => { 
  
//   /*
//   // time O(n^2)
//   // space O(1)
//   for(let i = 0; i < numbers.length; ++i){
//     for(let j = i + 1; j < numbers.length; ++j){
//       if(numbers[i] * numbers[j] === targetProduct) return [i, j];
//     }
//   }
//   */
  
//   // time O(n)
//   // space O(n)
  
//   const map = {};
  
//   for(let i = 0; i < numbers.length; ++i){
//     const num = numbers[i];
//     if(targetProduct % num === 0){
//       map[targetProduct / num] = i;
//     }
//   }
  
//   for(let i = 0; i < numbers.length; ++i){
//     const num = numbers[i];
//     if(num in map && map[num] !== i) return [map[num], i];
//   }

// };

console.log(pairProduct([3, 2, 5, 4, 1], 8));

// intersection
const intersection = (a, b) => {
  const both = [];
  const set = new Set(a);

  for (const item of b) {
    if (set.has(item)) {
      both.push(item);
    }
  }

  return both;
}

// Solution by Ashraf (Credit: Ashraf)
// const intersection = (a, b) => {
//     // O(n + m)
//     // O(n)
//     // do you know why the time complexity is O(n + m), 
//     // although we looped through array b only once ?? :D 
//     const result = []
//     const setA = new Set(a);
//     for(let item of b){
//       if(setA.has(item)){
//         result.push(item)
//       }
//     }
    
//     return result
//   };

console.log(intersection([4,2,1,6], [3,6,9,2,10]));

// fiveSort
const fiveSort = (nums) => {
  let front = 0;
  let rear = nums.length - 1;

  while (front !== rear) {
    if (nums[front] === 5) {
      if (nums[rear] !== 5) {
        nums[front] = nums[rear];
        nums[rear] = 5;
      }
      rear -= 1;
    } else {
      front += 1;
    }
  } 

  return nums;
}

// Not correct solution
// const fiveSort = (nums) => {
//   let count = 0;
//   const newNums = [];

//   for (const num of nums) {
//     if (num === 5) {
//       count += 1;
//     } else {
//       newNums.push(num);
//     }
//   }

//   for (let i = 0; i < count; i += 1) {
//     newNums.push(5);
//   }

//   return newNums;
// }

// Solution by Ashraf (Credit: Ashraf)
// const fiveSort = (nums) => {
//     let front = 0;
//     let rear = nums.length - 1
    
//     while(front < rear){
//       if(nums[front] === 5 && nums[rear] !==5){
//         const temp = nums[front];
//         nums[front] = nums[rear];
//         nums[rear] = temp;
//       }
      
//       while(nums[front] !== 5) ++front
      
//       while(nums[rear] === 5) --rear;
//     }
    
//     return nums
//   };

console.log(fiveSort([12, 5, 1, 5, 12, 7]));
console.log(fiveSort([5, 2, 5, 6, 5, 1, 10, 2, 5, 5]));