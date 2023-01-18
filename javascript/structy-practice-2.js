// max/min
// time: O(n), space: O(1)
const max = (nums) => {
    let max = -Infinity;

    for (let i = 0; i < nums.length; i+=1) {
        if (max < nums[i]) {
            max = nums[i];
        }
    }
    
    return max;
}

const min = (nums) => {
    let min = Infinity;

    for (let i = 0; i < nums.length; i+=1) {
        if (min > nums[i]) {
            min = nums[i];
        }
    }
    
    return min;
}

// isPrime
// time: O(n), space: O(1)
const isPrime = (num) => {
    for (let i = 2; i < num; i+=1) {
        if (num % i === 0) {
            return false;
        }
    }

    return true;
}

/* Array and String */

// uncompress
// time: O(n), space: O(n)
const uncompress = () => {

}

// compress
// time: O(n), space: O(n)
const compress = () => {

}

// anagrams
// time: O(n+m), space: O(n+m)
const anagrams = (str1, str2) => {
    // 1. length must be same. 2. count must be same.
    if (str1.length !== str2.length) {
        return false;
    }

    const map1 = {};

    for (let i = 0; i < str1.length; i+=1) {
        const char = str1[i];

        if (!(char in map1)) {
            map1[char] = 0;
        }

        map1[char] += 1;
    }

    const map2 = {};

    for (let i = 0; i < str2.length; i+=1) {
        const char = str2[i];

        if (!(char in map2)) {
            map2[char] = 0;
        }

        map2[char] += 1;
    }

    for (let char1 in map1) {
        const count1 = map1[char1];
        const count2 = map2[char1];

        if (count1 !== count2) {
            return false;
        }
    }

    return true;
}

// most freq chars in a string
// time: O(n), space: O(n)
const mostFreq = (str) => {
    const map = {};

    for (let i = 0; i < str.length; i+=1) {
        const char = str[i];

        if (!(char in map)) {
            map[char] = 0;
        }

        map[char] += 1;
    }

    let max = 0;
    let freqChar = '';

    for (let char in map) {
        if (max < map[char]) {
            max = map[char];
            freqChar = char;
        }
    }

    return freqChar;
}

// pair sum/product
// time: O(n), space: O(n)
// pairSum([3, 2, 5, 4, 1], 8); // -> [0, 2]
const pairSum = (nums, target) => {
    const map = {};

    for (let i = 0; i < nums.length; i+=1) {
        const num = nums[i];
        map[num] = i;

        // if (!(num in map)) {
        //     map[num] = i;
        // }
    }

    for (let i = 0; i < nums.length; i+=1) {
        const remainder = target - nums[i];

        if (remainder in map) {
            return [i, map[remainder]];
        }
    }

    return [-1, -1];
}

const pairProduct = () => {

}

// intersection
// time: O(n), space: O(n)
const intersection = (nums1, nums2) => {
    // intersection([4,2,1,6], [3,6,9,2,10]) // -> [2,6]
    const its = [];
    const set1 = new Set(nums1);

    for (let i = 0; i < nums2; i += 1) {
        if (set1.has(nums[i])) {
            its.push(nums[i]);
        }
    }

    return its;
}

// five sort
// time: O(n), space: O(1)
const fiveSort = (nums) => {
    // fiveSort([5, 2, 5, 6, 5, 1, 10, 2, 5, 5]);
    // -> [2, 2, 10, 6, 1, 5, 5, 5, 5, 5]

    let front = 0;
    let rear = nums.length - 1;

    while (front < rear) {
        while (nums[rear] === 5) {
            rear -= 1;
        }

        while (nums[front] !== 5) {
            front += 1;
        }

        const temp = nums[rear];
        nums[rear] = 5;
        nums[front] = temp;

        front += 1;
        rear -= 1;
    }

    return nums;
}

/* Linked list */

// reverse list
// time: O(n), space: O(1)
const reverseList = (head) => {
    // null -> a -> b -> c
    // null <- a <- b <- c

    let cur = head;
    let prev = null;
    
    while (cur) {
        const next = cur.next;
        cur.next = prev;
        prev = cur;
        cur = next;
    }

    return prev;
}

// zipper list
// time: O(n), space: O(1)
const zipperList = (head1, head2) => {
    // a -> b -> c 
    // x -> y -> z -> p

    let cur1 = head1;
    let cur2 = head2;

    while (cur1 && cur1.next && cur2) {
        const next1 = cur1.next;
        const next2 = cur2.next;

        cur1.next = cur2;
        cur2.next = next1;

        cur1 = next1;
        cur2 = next2;
    }

    if (cur1.next === null) {
        cur1.next = cur2;
    }

    return head1;
}

/* Binary Trees */

// depth first values
// time: O(n), space: O(n)
const dfv = (root) => {
    const values = [];

    const df = (node) => {
        if (!node)  return;

        values.push(node.val);
        df(node.left);
        df(node.right);
    };

    df(root);

    return values;
}

// breadth first values
// time: O(n), space: O(n)
const bfv = (root) => {
    const values = [];
    const queue = [root];

    while(queue.length) {
        const node = queue.shift();
        values.push(node.val);

        if (node.left)
            queue.push(node.left);

        if (node.right)
            queue.push(node.right);
    }

    return values;
}

// tree sum
// time: O(n), space: O(1)
const treeSum = (node) => {
    if (!node)  return 0;

    return node.val + treeSum(node.left) + treeSum(node.right);
}

// tree includes
// time: O(n), space: O(1)
const treeIncludes = (node, target) => {
    if (!node)  return false;

    return node.val === target || treeIncludes(node.left, target) || treeIncludes(node.right, target);
}

// tree min value
// time: O(n), space: O(1)
const treeMinValue = (node) => {
    if (!node)  return Infinity;

    return Math.min(node.val, treeMinValue(node.left), treeMinValue(node.right));
}

// max root to leaf path sum
// time: O(n), space: O(1)
const maxPathSum = () => {
    if (!node)  return -Infinity;

    if (node.left === null && node.right === null)  return node.val;

    return Math.max(node.val + maxPathSum(node.left), node.val + maxPathSum(node.right));
}

// path finder
// time: O(n), space: O(n)
const pathFinder = (root, target) => {
    const path = [];

    const hasPath = (node, target) => {
        if (!node)  return false;

        if (node.val === target) {
            path.push(node.val);
            return true;
        }

        path.push(node.val);

        if (hasPath(node.left))     return true;
        if (hasPath(node.right))    return true;
        
        path.pop();
        return false;
    }

    if (hasPath(root, target))
        return path;
    
    return null;
}

// tree value count
// time: O(n), space: O(n)
const treeValueCount = () => {

}

// how high
// time: O(n), space: O(1)
const treeHeight = (node) => {
    if (!node)  return -1;

    return Math.max(treeHeight(node.left) + 1, treeHeight(node.right) + 1)
}

// bottom right value
// time: O(n), space: O(n)
const bottomRight = (root) => {
    const values = [];
    const queue = [root];

    while(queue.length) {
        const node = queue.shift();
        values.push(node.val);

        if (node.left)
            queue.push(node.left);

        if (node.right)
            queue.push(node.right);
    }

    return values[values.length-1];
}

// all tree paths
// time: O(n), space: O(n*n)
const allTreePaths = (root) => {
    const paths = [];
    const path = [];

    const allPaths = (node) => {
        if (!node)  return;

        if (node.left === null && node.right === null) {
            path.push(node.val);
            paths.push(path);
            path.pop();
            return;
        }

        path.push(node.val);
        allPaths(node.left);
        allPaths(node.right);
        path.pop();
    };

    allPaths(root);
    return paths;
}

// tree levels
// time: O(n), space: O(n)
const treeLevels = () => {

}

// level averages
// time: O(n), space: O(n)
const levelAvg = () => {

}

// leaf list
// time: O(n), space: O(n)
const leafList = () => {

}

/* Graph */
// convert edges to graph
const buildGraph = (edges) => {
    const graph = {};

    for (let edge of edges) {
        const [node1, node2] = edge;

        if (!(node1 in graph)) {
            graph[node1] = [];
        }

        if (!(node2 in graph)) {
            graph[node2] = [];
        }

        graph[node1].push(node2);
        graph[node2].push(node1);
    }

    return graph;
}

// depth first graph
// time: O(n), space: O(n)
const graph = {
    f: ['g', 'i'],
    g: ['h'],
    h: [],
    i: ['g', 'k'],
    j: ['i'],
    k: []
};

const dfg = (graph, src) => {
    const values = [];

    const df = (graph, node) => {
        values.push(node.val);
        
        for (let neighbor of graph[node]) {
            df(graph, neighbor);
        }
    };

    df(graph, src);

    return values;
}

// breadth first graph
// time: O(n), space: O(n)
const bfg = (graph, src) => {
    const values = [];
    const queue = [src];

    while(queue.length) {
        const node = queue.shift();
        values.push(node);

        for (let neighbor of graph[node])
            queue.push(neighbor);
    }

    return values;
}

// has path
// time: O(n), space: O(n)
const hasPath = (graph, src, dest, visited = new Set()) => {
    if (src === dest)   return true;

    if (visited.has(src))   return false;

    visited.add(src);

    for (let neighbor of graph[src]) {
        if (hasPath(graph, neighbor, dest, visited)) {
            return true;
        }
    }

    return false;
}

// undirected path
// time: O(n), space: O(n)
const undirectedPath = (edges, src, dest) => {
    const graph = buildGraph(edges);
    return hasPath(graph, src, dest);
}

// connected components count
// time: O(n), space: O(n)
const explore = (graph, node, visited) => {
    if (visited.has(String(node))) return false;

    visited.add(String(node));

    for (let neighbor of graph[node]) {
        explore(graph, neighbor, visited);
    }
  
    return true;
}

const connectedComponentsCount = (graph) => {
    const visited = new Set();
    let count = 0;

    for (let node in graph) {
        if (explore(graph, node, visited))
            count += 1;
    }
  
    return count;
}


// largest component
// time: O(n), space: O(n)
const largestComp = () => {

}

// shortest path
// time: O(n), space: O(n)
const shortestPath = () => {

}

// island count
// time: O(n), space: O(n)
const islandCount = () => {

}

// minimum island
// time: O(n), space: O(n)
const minIsland = () => {

}

// closest carrot
// time: O(n), space: O(n)
const closestCarrot = () => {

}

// longest path
// time: O(n), space: O(n)
const longestPath = () => {

}

// semesters required
// time: O(n), space: O(n)
const semestersRequired = () => {

}

// best bridge
// time: O(n), space: O(n)
const bestBridge = () => {

}

// has cycle
// time: O(n), space: O(n)
const hasCycle = () => {

}

// prereqs possible
// time: O(n), space: O(n)
const prereqs = () => {

}

/* Stack */
// paired parentheses
// time: O(n), space: O(n)
// pairedParentheses("(david)((abby))"); // -> true
// pairedParentheses("()rose(jeff"); // -> false
const pairedParentheses = (str) => {
    const stack = [];

    for (let char of str) {
        if (char === ')') {
            if (!stack.length)
                return false;
            stack.pop();
        } else if (char === '(') {
            stack.push('(');
        }
    }

    if (stack.length)   return false;

    return true;
}

// befitting brackets
// time: O(n), space: O(n)
const befittingBrackets = () => {
    const brackets = {
        '(': ')',
        '{': '}',
        '[': ']',
    }

    const closingBrackets = [')', '}', ']'];
    
    const stack = [];

    for (let char of str) {
        if (closingBrackets.includes(char)) {
            if (!stack.length)
                return false;

            const openBracket = stack.pop();

            if (brackets[openBracket] !== char) 
                return false;
        } else if (char in brackets) {
            stack.push(char);
        }
    }

    if (stack.length)   return false;

    return true;
}

// decompress braces
// time: O(n), space: O(n)
const decompressBraces = (str) => {
    // decompressBraces("2{q}3{tu}v"); 
    // -> qqtututuv
    // decompressBraces("2{y3{o}}s"); 
    // -> yoooyooos

    const stack = [];
    let chars = '';

    for (let char of str) {
        if (char === '{') {
            stack.push(chars);
            chars = '';
        } else if (char === '}') {
            const stackedChars = stack.pop();
            // console.log('stacked', stackedChars);
            const prevChars = chars;
            chars = '';
            
            for (let i = 0; i < Number(stackedChars); i+=1) {
                chars += prevChars;
            }

            // console.log(chars);
        } else {
            chars += char;
        }
    }

    return chars;
}

// console.log(decompressBraces("2{q}3{tu}v"));

// nesting score
// time: O(n), space: O(n)
const nestingScore = () => {

}

/* Dynamic Programming */
// fibonacci
const fib = (n, memo = {}) => {
    if (n === 0 || n === 1) {
      return n;
    }

    if (n in memo) { 
      return memo[n];
    }

    memo[n] = fib(n-1) + fib(n-2)
    return memo[n];
}

// sum possible
const sumPossible = (amount, numbers, memo = {}) => {
    if (amount === 0) return true;
    
    if (amount < 0) return false;
    
    if (amount in memo) return memo[amount];
    
    for (let num of numbers) {
      if (sumPossible(amount - num, numbers, memo)) {
        memo[amount] = true;
        return true;
      }
    }
    
    memo[amount] = false;
    return false;
};

// min change
const minChange = (amount, coins) => {
    const answer = _minChange(amount, coins);
    return answer === Infinity ? -1 : answer;
  };
  
const _minChange = (amount, coins, memo = {}) => {
    if (amount < 0) return Infinity;
    
    if (amount === 0) return 0;
    
    if (amount in memo) return memo[amount];
    
    let min = Infinity;
    for (let coin of coins) {
      const numCoins = 1 + _minChange(amount - coin, coins, memo);
      min = Math.min(numCoins, min);
    }
    return memo[amount] = min;
};

// count paths
const countPaths = (grid, r = 0, c = 0, memo = {}) => {
    const pos = r + ',' + c;
    if (pos in memo) return memo[pos];
    
    if (r === grid.length || c === grid[0].length || grid[r][c] === 'X') return 0;
    
    if (r === grid.length - 1 && c === grid[0].length - 1) return 1;
    
    memo[pos] = countPaths(grid, r + 1, c, memo) + countPaths(grid, r, c + 1, memo);
    return memo[pos];
};

/* Exhaustive Recursiion */
// subsets
// time: O(2 ^ n), space: O(2 ^ n)
// subsets(['a', 'b']); // ->
// [ 
//   [], 
//   [ 'b' ], 
//   [ 'a' ], 
//   [ 'a', 'b' ] 
// ]
const subsets = (elements) => {
    if (elements.length === 0) return [[]];
  
    const ele = elements[0];
    const remainingElements = elements.slice(1);
    const subsetsWithoutEle = subsets(remainingElements);
    const subsetsWithEle = subsetsWithoutEle.map((sub) => [ele, ...sub]);
    return [...subsetsWithoutEle, ...subsetsWithEle];
};

// permutations
// time: O(n!), space: O(n!)
// permutations(['a', 'b', 'c']); // -> 
// [ 
//   [ 'a', 'b', 'c' ], 
//   [ 'b', 'a', 'c' ], 
//   [ 'b', 'c', 'a' ], 
//   [ 'a', 'c', 'b' ], 
//   [ 'c', 'a', 'b' ], 
//   [ 'c', 'b', 'a' ] 
// ]
const permutations = (items) => {
    if (items.length === 0) return [[]];
    
    const first = items[0];
    const perms = permutations(items.slice(1));

    // console.log('perms', perms);
  
    const fullPermutations = [];
    for (let perm of perms) {
     for (let i = 0; i <= perm.length; i += 1) {
        fullPermutations.push([ ...perm.slice(0, i), first, ...perm.slice(i) ]);
     }
    }

    // console.log('fullPerms', fullPermutations);
    return fullPermutations;
};

// console.log(permutations(['a', 'b', 'c']));

// create combinations
// time: O(nck), space: O(nck)  - n choose k (binomial coefficient)
// createCombinations(["q", "r", "s", "t"], 2); // ->
// [
//   [ 'q', 'r' ],
//   [ 'q', 's' ],
//   [ 'q', 't' ],
//   [ 'r', 's' ],
//   [ 'r', 't' ],
//   [ 's', 't' ]
// ]
const createCombinations = (items, k) => {
    if (items.length < k) return [];
  
    if (k === 0) return [[]];
  
    const first = items[0];
    const combosWithFirst = [];
    for (let combo of createCombinations(items.slice(1), k - 1)) {
      combosWithFirst.push([first, ...combo]);
    }
  
    const combosWithoutFirst = createCombinations(items.slice(1), k);
    return [...combosWithFirst, ...combosWithoutFirst];
};

/* Mixed Recall */