// one-pass with O(1) hashmap
const onePassHashMap = (nums) => {
    // one round-trip to index
    // main loop
};

// one-pass with 2-pointers
const onePassTwoPointers = (prices) => {
    // init pointers. pointer 1: min price, pointer 2: max profit
    // main loop
        // pointer 1 moves
        // pointer 2 moves
};

// dynamic with memo
const memoized = (num, memo = {}) => {
    // is in memo?
    // base case(s)
    // traverse the tree
    // store in memo
};

// dynamic with tabulation
const tabulatedFib = (num) => {
    // allocate large enough array
    // initial seed
    // main loop
        // slide window incrementally
};

// dynamic with tabulation
const tabulatedTraveller = (m, n) => {
    // allocate large enough array
    // initial seed
    // main loop
        // slide window incrementally
}

// Binary Tree: Depth and Breadth-first traversal
const depthFirstTree = (root) => {
    // handle null root
    // Init the stack
    // While the stack is not empty
        // pop the stack
        // do something with the current node
        // Push non-null left and right to stack
}

const depthFirstTreeRC = (root) => {
    // base case
    // do something with the current node
    // traverse left
    // traverse right
}

const breadthFirstTree = (root) => {
    // handle null root
    // Init the queue
    // While the queue is not empty
        // shift the queue
        // do something with the current node
        // Push non-null right and left to the queue
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
    // main loop
        // init node1 and node2 of the edge
        // connect each other
}

// Undirected Graph: hasPath 
const hasPath = (graph, src, dst, visited = new Set()) => {
    // base case
    // check if visited
    // visit it
    // traverse neighbors
        // if has path
}

// connected component count
const connectedComponentCount = (graph) => {
    // visit each node in graph
        // at each node, visit the graph. 
        // If the node is not yet visited, increment the count
}

const explore = (graph, current, visited) => {
    // usual traversal of graph with visited check and marking

    // after everything done, just return true. doesn't matter what neighbors return
    // the main purpose of visiting neighbors, is just to mark them visited
}

// Shortest path with breadth-first
const shortestPath = (graph, nodeA, nodeB) => {
    // shortestPath always uses breadth-first and BF does not support recursive, so use queue
    // init queue with node and distance ```const queue = [[nodeA,0]];```
    
    // usual breadth first traversal using queue
    // usual visited mark and check

    // at the end, since no path is found, return -1
}

// Island count
const islandCount = (grid) => {
    // same as connected component count
    // difference is instead of one loop of nodes in graph, two loops of rows and columns in the grid
}

const explore = (grid, r, c, visited) => {
    // Check if row and col in bound
    // Check if the value is water
    // Make key (r and c) for visited
    // Check if visited
    // Visit it
    // Visit left, right, top and bottom cells
    // done so return true
}
