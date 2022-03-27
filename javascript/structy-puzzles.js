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