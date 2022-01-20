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

const depthFirstValues = (root) => {
    if (root === null) return [];

    const leftValues = depthFirstValues(root.left);
    const rightValues = depthFirstValues(root.right);

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

        if (current.left !== null) queue.push(current.left);
        if (current.right !== null) queue.push(current.right);
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
