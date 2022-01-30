// one-pass with O(1) hashmap
const onePassHashMap = (nums) => {
    const map = {};

    // one round-trip to index
    for (let i = 0; i < nums.length; i++) {
        map[nums[i]] = i;
    }
}

// one-pass with 2-pointers
const onePassTwoPointers = (prices) => {
    // pointer 1: min price, pointer 2: max profit
    let minPrice = Infinity;
    let maxProfit = 0;
    
    for (let i = 0; i < prices.length; i++) {
        // pointer 1 moves
        if (prices[i] < minPrice) {
            minPrice = prices[i];
        }
        // pointer 2 moves
        else if (prices[i] - minPrice > maxProfit) {
            maxProfit = prices[i] - minPrice;
        }
    }
    
    return maxProfit;
}


// dynamic with memo
const memoized = (num, memo = {}) => {
    // is in memo?
    if (num in memo)    return memo[num];

    // base case(s)
    if (num === 0)  return 1;   // or true
    if (num < 0)    return 0;   // or false

    // traverse the tree
    const first = memoized(num-1);
    const second = memoized(num-2);

    // store in memo
    memo[num] = first + second;
    return memo[num];
}

// dynamic with tabulation
const tabulatedFib = (num) => {
    // allocate large enough array
    const table = Array(num+1).fill(0);

    // initial seed
    table[1] = 1;

    for (let i = 0; i <= num; i++) {
        // slide window incrementally
        table[i+1] += table[i];
        table[i+2] += table[i];
    }

    return table[num];
};

// dynamic with tabulation
const tabulatedTraveller = (m, n) => {
    // allocate large enough array
    const table = Array(m+1).fill().map(() => Array(n+1).fill(0));

    // initial seed
    table[1][1] = 1;

    for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
            // slide window incrementally
            if (i+1 <= m) table[i+1][j] += table[i][j];
            if (j+1 <= n) table[i][j+1] += table[i][j];
        }
    }

    return table[num];
};

// Binary Tree: Depth and Breadth-first traversal
const depthFirstTree = (root) => {
    // handle null root
    if (root === null) return [];

    // Init the stack
    const stack = [root];
    
    // While the stack is not empty
    while(stack.length !== 0) {
        // pop the stack
        const current = stack.pop();

        // do something with the current node
        console.log('current node: ', current);

        // Push non-null left and right to stack
        if (current.left) stack.push(current.left);
        if (current.right) stack.push(current.right);
    }
}

const depthFirstTreeRC = (root) => {
    // base case
    if (root === null) return;

    // do something with the current node
    console.log('current node: ', root);

    // traverse left
    depthFirstTree(root.left);

    // traverse right
    depthFirstTree(root.right);
}

const breadthFirstTree = (root) => {
    // handle null root
    if (root === null) return [];

    // Init the queue
    const queue = [root];
    
    // While the queue is not empty
    while(queue.length !== 0) {
        // shift the queue
        const current = queue.shift();

        // do something with the current node
        console.log('current node: ', current);

        // Push non-null right and left to the queue
        if (current.right) queue.push(current.right);
        if (current.left) queue.push(current.left);
    }
}

// Directed Graph: Depth and Breadth-first traversal
// same as traversal in Binary Tree
// difference: instead of left and right, traverse all neighbors. ```for (let neighbor of graph[current])```

// graph/adjacency list data structure
const graph = {
    a: ['b', 'c'],
    b: ['d'],
    c: ['e'],
    d: ['f'],
    e: [],
    f: []
};

// edge data structure
const edges = [
    ['i', 'j'],
    ['k', 'i'],
    ['m', 'k'],
    ['k', 'l'],
    ['o', 'n']
];

// convert edge list to adjacency list
const buildGraph = (edges) => {
    // init graph
    const graph = {};

    // main loop
    for (let edge of edges) {
        const [node1, node2] = edge;

        // init node1 and node2 of the edge
        if (!node1 in graph)    graph[node1]= [];
        if (!node2 in graph)    graph[node2]= [];

        // connect each other
        graph[node1].push(node2);
        graph[node2].push(node1);
    }

    return graph;
}

// Undirected Graph: hasPath 
const hasPath = (graph, src, dst, visited = new Set()) => {
    // base case
    if (src === dst)    return true;

    // check if visited
    if (visited.has(src))   return false;

    // visit it
    visited.add(src);

    // traverse neighbors
    for (let neighbor of graph[src]) {
        // if has path
        if (hasPath(graph, neighbor, dst, visited)) {
            return true;
        }
    }

    return false;
}

// connected component count
const connectedComponentCount = (graph) => {
    let count = 0;
    const visited = new Set();

    // visit each node in graph
    for (let node in graph) {
        // at each node, visit the graph. 
        // If the node is not yet visited, increment the count
        if (explore(graph, node, visited)) {
            count += 1;
        }
    }

    return count;
}

const explore = (graph, current, visited) => {
    if (visited.has(current))   return false;

    visited.add(current);

    for (let neighbor of graph[current]) {
        explore(graph, neighbor, visited);
    }

    // after everything done, just return true. doesn't matter what neighbors return
    // the main purpose of visiting neighbors, is just to mark them visited
    return true;
}

// Shortest Path
const shortestPath = (graph, nodeA, nodeB) => {
    // shortestPath always uses breadth-first and BF does not support recursive, so use queue
    const queue = [[nodeA,0]];
    const visited = new Set([nodeA]);

    while (queue.length > 0) {
        const [current, distance] = queue.shift();

        if (current === nodeB)  return distance;

        for (let neighbor of graph[current]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push([neighbor, distance+1]);
            }
        }
    }

    return -1;
}

// Island Count
const islandCount = (grid) => {
    let count = 0;
    const visited = new Set();

    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if (explore(grid, r, c, visited)) {
                count += 1;
            }
        }
    }

    return count;
}

const explore = (grid, r, c, visited) => {
    const rowInbounds = r >= 0 && r < grid.length;
    const colInbounds = c >=0 && c < grid[0].length;

    // Check if row and col in bound
    if (!rowInbounds || !colInbounds)   return false;

    // Check if the value is water
    if (grid[r][c] === 'Water') return false;

    // Make key (r and c) for visited
    const key = r + ',' + c;

    // Check if visited
    if (visited.has(key))   return false;

    // Visit it
    visited.add(key);
    
    // Visit left, right, top and bottom cells
    explore(grid, r-1, c, visited);
    explore(grid, r+1, c, visited);
    explore(grid, r, c-1, visited);
    explore(grid, r, c+1, visited);

    // done so return true
    return true;
}

