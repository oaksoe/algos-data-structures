// Linked List https://www.youtube.com/watch?v=Hj_rA0dhr2I
const getNodeValue = (head, index) => {
    let current = head;
    let count = 0;

    while (current) {
        if (count === index) {
            return current.val;
        }

        count += 1;
        current = current.next;
    }
}

const getNodeValueRC = (head, index) => {
    if (head === null) return null;
    if (index === 0) return head.val;
    return getNodeValue(head.next, index-1);
}

// Reverse Linked List
const reverseList = (head) => {
    let prev = null;
    let current = head;

    while (current) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }

    return prev;
}

const reverseListRC = (head, prev = null) => {
    if (!head) return prev;

    const next = head.next;
    head.next = prev;

    return reverseListRC(next, head);
}

// Zipper Lists
const zipperLists = (head1, head2) => {
    let tail = head1;
    let current1 = head1.next;
    let current2 = head2;
    let count = 0;

    while(current1 && current2) {
        if (count % 2 === 0) {
            tail.next = current2;
            current2 = current2.next;
        } else {
            tail.next = current1;
            current1 = current1.next;
        }

        tail = tail.next;
        count += 1;
    }

    if (current1) {
        tail.next = current1;
    }

    if (current2) {
        tail.next = current2;
    }
 
    return head1;
}

const zipperListsRC = (head1, head2) => {
    if (!head1 && !head2) return null;
    if (!head1) return head2;
    if (!head2) return head1;

    const next1 = head1.next;
    const next2 = head2.next;

    head1.next = head2;
    head2.next = zipperListsRC(next1, next2);

    return head1;
}

// Binary Trees https://www.youtube.com/watch?v=fAAZixBzIAI
// Depth first traversal
const depthFirstValues = (root) => {
    if (root === null) return [];

    const stack = [root];
    const values = [];

    while (stack.length > 0) {
        const current = stack.pop();
        values.push(current);

        if (current.right !== null) stack.push(current.right);
        if (current.left !== null) stack.push(current.left);
    }

    return values;
}

const depthFirstValuesRC = (root) => {
    if (root === null) return [];

    const leftValues = depthFirstValuesRC(root.left);
    const rightValues = depthFirstValuesRC(root.right);

    return [root.val, ...leftValues, ...rightValues];
}

// Breadth first traversal
// Always use iterative (not recursive) for breadth first
const breadthFirstValues = (root) => {
    if (root === null) return [];
    
    const queue = [root];
    const values = [];

    while (queue.length > 0) {
        const current = queue.shift();
        values.push(current);

        if (current.left !== null) queue.push(current.right);
        if (current.right !== null) queue.push(current.left);
    }

    return values;
}


// Tree includes using breadth first iterative
const treeIncludes = (root, target) => {
    const queue = [root];
    
    while (queue.length > 0) {
        const current = queue.shift();
        
        if (current.val === target) return true;

        if (current.left !== null) queue.push(current.left);
        if (current.right !== null) queue.push(current.right);
    }

    return false;
}

// Tree includes using depth first recursive
const treeIncludes = (root, target) => {
    if (root === null) return false;

    if (root.val === target) return true;

    return treeIncludes(root.left, target) || treeIncludes(root.right, target);
}

// Max Path Sum
const maxPathSum = (root) => {
    if (root === null) return -Infinity;
    if (root.left === null && root.right === null) return root.val;

    const maxChildPathSum = Math.max(maxPathSum(root.left), maxPathSum(root.right));
    return root.val + maxChildPathSum;
}

// Graph: https://www.youtube.com/watch?v=tWVWeAqZ0WU
// Depth first traversal
const graph = {
    a: ['b', 'c'],
    b: ['d'],
    c: ['e'],
    d: ['f'],
    e: [],
    f: []
}

depthFirstGraph(graph, 'a');

const depthFirstGraph = (graph, source) => {
    const stack = [source];

    while (stack.length > 0) {
        const current = stack.pop();
        console.log(current);

        for (let neighbor of graph[current]) {
            stack.push(neighbor);
        }
    }
}

const depthFirstGraphRC = (graph, source) => {
    console.log(source);

    for (let neighbor of graph[source]) {
        depthFirstGraphRC(graph, neighbor);
    }
}

const breadthFirstGraph = (graph, source) => {
    const queue = [source];

    while (stack.length > 0) {
        const current = queue.shift();
        console.log(current);

        for (let neighbor of graph[current]) {
            queue.push(neighbor);
        }
    }
}

// has-path: depthFirstRC and breadthFirstIter
const edges = [
    ['i', 'j'],
    ['k', 'i'],
    ['m', 'k'],
    ['k', 'l'],
    ['o', 'n']
]
// convert edge list to adjacency list
const buildGraph = (edges) => {
    const graph = {};

    for (let edge of edges) {
        const [a,b] = edge;

        if (!(a in graph))  graph[a] = [];
        if (!(b in graph))  graph[b] = [];

        graph[a].push(b);
        graph[b].push(a);
    }

    return graph;
}

const undirectedPath = (edges, nodeA, nodeB) => {
    const graph = buildGraph(edges);
    return hasPath(graph, nodeA, nodeB, new Set());
}

const hasPath = (graph, src, dst, visited) => {
    if (src === dst) return true;
    if (visited.has(src)) return false;

    visited.add(src);

    for (let neighbor of graph[src]) {
        if (hasPath(graph, neighbor, dst, visited)) {
            return true;
        }
    }

    return false;
}

// connected component count
const connectedComponentCount = (graph) => {
    const visited = new Set();
    const count = 0;

    for (let node of graph) {
        if (explore(graph, node, visited)) {
            count += 1;
        }
    }

    return count;
}

const explore = (graph, current, visited) => {
    if (visited.has(String(current)))   return false;

    visited.add(String(current));

    for (let neighbor of graph[current]) {
        explore(graph, neighbor, visited);
    }

    return true;
}

// largest Connected Component

// Shortest path
const shortestPath = (edges, nodeA, nodeB) => {
    const graph = buildGraph(edges);
    const visited = new Set([nodeA]);
    const queue = [[nodeA, 0]];

    while (queue.length > 0) {
        const [node, distance] = queue.shift();

        if (node === nodeB) return distance;

        for (let neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push([neighbor, distance+1]);
            }
        }
    }

    return -1;
}

// island count
const islandCount = (grid) => {
    const visited = new Set();
    let count = 0;

    for (let r = 0; r < grid.length; r+=1) {
        for (let c = 0; c < grid[0].length; c+=1) {
            if (explore(grid, r, c, visited)) {
                count += 1;
            }
        }
    }

    return count;
}

const explore = (grid, r, c, visited) => {
    const rowInbounds = 0 <= r && r < grid.length;
    const colInbounds = 0 <= c && c < grid[0].length;

    if (!rowInbounds || !colInbounds)   return false;

    if (grid[r][c] === 'Water') return false;

    const pos = r + ',' + c;

    if (visited.has(pos)) return false;

    visited.add(pos);

    explore(grid, r-1, c, visited);
    explore(grid, r+1, c, visited);
    explore(grid, r, c-1, visited);
    explore(grid, r, c+1, visited);

    return true;
}

// minimum island size

// Dynamic Programming
const fib = (n) => {
    if (n <= 2) return 1;
    return fib(n-1) + fib(n-2);
}

// with memoization
const fibMemo = (n, memo = {}) => {
    if (n in memo)  return memo[n];
    if (n <= 2) return 1;

    memo[n] = fibMemo(n-1, memo) + fibMemo(n-2, memo);
    return memo[n];
}

// with tabulation
const fibTab = (n) => {
    const table = Array(n+1).fill(0);
    table[1] = 1;

    for(let i = 0; i <= n; i++) {
        table[i+1] += table[i];
        table[i+2] += table[i]; 
    }

    return table[n];
}

// Grid traveller
// How many ways to travel from top left cell to bottom right cell in m*n grid?
// Traveller can either move right or down
const gridTraveller = (m,n) => {
    if (m === 1 && n === 1) return 1;
    if (m === 0 || n === 0) return 0;
    return gridTraveller(m-1, n) + gridTraveller(m, n-1);
}

const gridTravellerMemo = (m,n, memo={}) => {
    const key = m + ',' + n;

    if (key in memo) return memo[key];

    if (m === 1 && n === 1) return 1;
    if (m === 0 || n === 0) return 0;
    
    memo[key] = gridTraveller(m-1, n, memo) + gridTraveller(m, n-1, memo);
    return memo[key];
}

const gridTravellerTab = (m, n) => {
    const table = Array(m + 1)
        .fill()
        .map(() => Array(n+1).fill(0));

    table[1][1] = 1;

    for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
            const current = table[i][j];

            if (j+1 <=n)    table[i][j+1] += current;
            if (i+1 <=m)    table[i+1][j] += current;
        }
    }

    return table[m][n];
}

// CanSum
const canSum = (targetSum, numbers) => {
    if (targetSum === 0) return true;
    if (targetSum < 0) return false;

    for (let num of numbers) {
        const diff = targetSum - num;

        if (canSum(diff, numbers)) {
            return true;
        }
    }

    return false;
}

// HowSum and BestSum

// canConstruct, countConstruct, allConstruct