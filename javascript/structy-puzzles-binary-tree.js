class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// depthFirstValuesIter
const depthFirstValuesIter = (root) => {
  if (root === null) return [];

  const stack = [root];
  const results = [];

  while (stack.length > 0) {
    const current = stack.pop();
    results.push(current.val);

    if (current.right !== null) {
      stack.push(current.right);
    }

    if (current.left !== null) {
      stack.push(current.left);
    }
  }

  return results;
}

const depthFirstValues = (root) => {
  if (root === null) {
    return [];
  }

  return [root.val, ...depthFirstValues(root.left), ...depthFirstValues(root.right)];
}

// Solution by Ashraf (Credit: Ashraf)
//   const depthFirstValues = (root) => {
//     const result = [];

//     function _depthFirstValues(node){
//       if(!node) return;

//       result.push(node.val);
//       _depthFirstValues(node.left);
//       _depthFirstValues(node.right);
//     }

//     _depthFirstValues(root);

//     return result;
//   };

// const a = new Node('a');
// const b = new Node('b');
// const c = new Node('c');
// const d = new Node('d');
// const e = new Node('e');
// const f = new Node('f');

// a.left = b;
// a.right = c;
// b.left = d;
// b.right = e;
// c.right = f;

// console.log(depthFirstValues(a));

const maxPathSumIter = (root) => {
  const stack = [[root, 0]];
  let max = -Infinity;

  while (stack.length > 0) {
    const [current, sum] = stack.pop();
    const newSum = current.val + sum;

    if (current.left === null
      && current.right === null
      && max < newSum) {
      max = newSum;
    }

    if (current.right !== null) {
      stack.push([current.right, newSum]);
    }

    if (current.left !== null) {
      stack.push([current.left, newSum]);
    }
  }

  return max;
}

const maxPathSum = (root) => {
  if (root === null) return -Infinity;
  if (root.left === null && root.right === null) return root.val;

  const maxChildPathSum = Math.max(maxPathSum(root.left), maxPathSum(root.right));
  return root.val + maxChildPathSum;
}

const a = new Node(-1);
const b = new Node(-6);
const c = new Node(-5);
const d = new Node(-3);
const e = new Node(0);
const f = new Node(-13);
const g = new Node(-1);
const h = new Node(-2);

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;
e.left = g;
f.right = h;

//        -1
//      /   \
//    -6    -5
//   /  \     \
// -3   0    -13
//     /       \
//    -1       -2

console.log(maxPathSum(a));

// pathFinder
const pathFinder = (root, target) => {
  if (root === null) {
    return null;
  }

  const stack = [root];
  const ancestors = {};

  while (stack.length > 0) {
    const current = stack.pop();

    if (current.val === target) {
      const results = [current.val];
      let currentAncestor = ancestors[current.val];
      while (currentAncestor !== undefined) {
        results.push(currentAncestor);
        currentAncestor = ancestors[currentAncestor];
      }
      return results.reverse();
    }

    if (current.right !== null) {
      ancestors[current.right.val] = current.val;
      stack.push(current.right);
    }

    if (current.left !== null) {
      ancestors[current.left.val] = current.val;
      stack.push(current.left);
    }
  }

  return null;
}

const pathFinderRecur = (root, target) => {
  if (root === null) {
    return null;
  }

  if (root.val === target) {
    return [root.val];
  }

  const leftValue = pathFinder(root.left, target);

  if (leftValue !== null) {
    return [root.val, ...leftValue];
  }

  const rightValue = pathFinder(root.right, target);

  if (rightValue !== null) {
    return [root.val, ...rightValue];
  }

  return null;
}

// const a = new Node("a");
// const b = new Node("b");
// const c = new Node("c");
// const d = new Node("d");
// const e = new Node("e");
// const f = new Node("f");
// const g = new Node("g");
// const h = new Node("h");

// a.left = b;
// a.right = c;
// b.left = d;
// b.right = e;
// c.right = f;
// e.left = g;
// f.right = h;

// const root = new Node(0);
// let curr = root;
// for (let i = 1; i <= 100; i += 1) {
//   curr.right = new Node(i);
//   curr = curr.right;
// }

// console.log(pathFinder(root, 8));

// allTreePaths
const allTreePaths = (root) => {
  if (root.left === null && root.right === null) {
    return [[root.val]];
  }

  const allPaths = [];

  if (root.left !== null) {
    const leftPaths = allTreePaths(root.left);

    for (let i = 0; i < leftPaths.length; i += 1) {
      allPaths.push([root.val, ...leftPaths[i]])
    }
  }

  if (root.right !== null) {
    const rightPaths = allTreePaths(root.right);
    for (let i = 0; i < rightPaths.length; i += 1) {
      allPaths.push([root.val, ...rightPaths[i]])
    }
  }

  return allPaths;
}

const a = new Node('a');
const b = new Node('b');
const c = new Node('c');
const d = new Node('d');
const e = new Node('e');
const f = new Node('f');

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;

//      a
//    /   \
//   b     c
//  / \     \
// d   e     f

console.log(allTreePaths(a)); // ->
// [ 
//   [ 'a', 'b', 'd' ], 
//   [ 'a', 'b', 'e' ], 
//   [ 'a', 'c', 'f' ] 
// ] 

// treeLevels
const treeLevels = (root) => {
  if (root === null) {
    return [];
  }

  const results = [];
  const queue = [[root, 0]];

  while (queue.length) {
    const [current, level] = queue.shift();

    if (!results[level]) {
      results[level] = [];
    }

    results[level].push(current.val);

    if (current.left !== null) {
      queue.push([current.left, level + 1]);
    }

    if (current.right !== null) {
      queue.push([current.right, level + 1]);
    }
  }

  return results;
}

// levelAverages
const levelAverages = (root) => {
  if (root === null) {
    return [];
  }

  const results = [];
  const queue = [[root, 0]];

  while (queue.length) {
    const [current, level] = queue.shift();

    if (!results[level]) {
      results[level] = [];
    }

    results[level].push(current.val);

    if (current.left !== null) {
      queue.push([current.left, level + 1]);
    }

    if (current.right !== null) {
      queue.push([current.right, level + 1]);
    }
  }

  for (let i = 0; i < results.length; i += 1) {
    results[i] = results[i].reduce((sum, current) => sum + current, 0) / results[i].length;
  }

  return results;
}

const a = new Node(3);
const b = new Node(11);
const c = new Node(4);
const d = new Node(4);
const e = new Node(-2);
const f = new Node(1);

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;

//       3
//    /    \
//   11     4
//  / \      \
// 4   -2     1

console.log(levelAverages(a));

// leafList
const leafList = (root) => {
  if (root === null) {
    return [];
  }

  if (root.left === null && root.right === null) {
    return [root.val];
  }

  return [...leafList(root.left), ...leafList(root.right)];
}

const a = new Node("a");
const b = new Node("b");
const c = new Node("c");
const d = new Node("d");
const e = new Node("e");
const f = new Node("f");

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;

//      a
//    /   \
//   b     c
//  / \     \
// d   e     f

console.log(leafList(a)); // -> [ 'd', 'e', 'f' ] 