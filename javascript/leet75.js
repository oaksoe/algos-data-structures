// https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions

/** Array */
// time: O(n*n), space: O(n)
var twoSum = function(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        const num1 = nums[i];
        
        for (let j = i+1; j < nums.length; j++) {
            const num2 = nums[j];

            if (num1 + num2 === target) {
                return [i, j];
            }
        }   
    }
    
    return [];
}; 

// time: O(n)
// first pass, build hashmap
// second pass, look up from hashmap instead of loop
var twoSum = function(nums, target) {
    const map = {};
    
    for (let i = 0; i < nums.length; i++) {
        map[nums[i]] = i;
    }
    
    for (let i = 0; i < nums.length; i++) {
        const remainderIndex = map[target - nums[i]];
        
        if (remainderIndex && remainderIndex !== i) {
            return [i, remainderIndex];
        }
    }
    
    return [];
}; 

// Best time to buy and sell stock
// uses sliding window with min and max pointers
var maxProfit = function(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;
    
    for (let i = 0; i < prices.length; i++) {
        if (prices[i] < minPrice) {
            minPrice = prices[i];
        } else if (prices[i] - minPrice > maxProfit) {
            maxProfit = prices[i] - minPrice;
        }
    }
    
    return maxProfit;
};

/** Array */
// Longest Substring Without Repeating Characters
// uses sliding window with left and right pointers
var lengthOfLongestSubstring = function(s) {
    const map = {};
    const chars = [...s];
    
    let left = 0;
    let right = 0;
    let max = 0;
    
    while (right < chars.length) {
        const charR = chars[right];
        
        if(!(charR in map)) map[charR] = 0;
        
        map[charR]+=1;
        
        while (map[charR] > 1) {
            const charL = chars[left];
            map[charL]-=1;
            left+=1;
        }
        
        max = Math.max(max, right - left + 1);
        
        right+=1;
    }
    
    return max;
};

/** Dynamic Programming */
var climbStairs = function(n, memo={}) {
    if (n in memo) return memo[n];
    if (n === 0) return 1;
    if (n < 0) return 0;
    
    const firstClimb = climbStairs(n-1, memo);
    const secondClimb = climbStairs(n-2, memo);
    
    memo[n] = firstClimb + secondClimb;
    
    return memo[n];
};

var coinChange = function(coins, amount, memo = {}) {
    if (amount in memo) return memo[amount];
    
    if (amount === 0)   return 0;
    
    if (amount < 0)     return -1;
    
    let min = Infinity;
    
    for (let coin of coins) {
        const remaining = amount - coin;
        
        const totalCoins = coinChange(coins, remaining, memo);
        
        if (totalCoins !== -1 && totalCoins < min) {
            min = totalCoins + 1;
        }
    }
    
    memo[amount] = min === Infinity ? -1 : min;
    
    return memo[amount];
};


/**
 * @param {number[]} nums
 * @return {number}
 */
 var lengthOfLIS = function(nums) {
    const sub = [nums[0]];
    
    for (let i = 1; i < nums.length; i+=1) {
        const num = nums[i];
        
        if (num > sub[sub.length - 1]) {
            sub.push(num);
        } else {
            const j = biSearch(sub, num);
            sub[j] = num;
        }
    }
    
    return sub.length;
};

var biSearch = function(list, num) {
    let left = 0;
    let right = list.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (list[mid] === num) {
            return mid;
        }
        
        if (list[mid] < num) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return left;
}