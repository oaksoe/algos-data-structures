// https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions

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