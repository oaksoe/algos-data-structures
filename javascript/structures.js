// ###################### Stack (LIFO) ######################
class Stack {
    constructor(size) {
        this.size = size;
        this.items = [...new Array(size)].map(() => 0);
        this.top = -1;
    }

    isFullStack() {
        return this.top === this.size - 1;
    }

    isEmptyStack() {
        return this.top === -1;
    }

    push(item) {
        if (this.isFullStack()) {
            throw new Error('The stack is full. Pop an item first before pushing new item');
        }

        this.items[++this.top] = item;
    }

    pop() {
        if (this.isEmptyStack()) {
            throw new Error('The stack is empty. There is no item to pop');
        }

        const item = this.items[this.top];
        this.items[this.top--] = 0;
        
        return item;
    }

    asArray() {
        return this.items;
    }
}

const stack = new Stack(3);
stack.push(2);
stack.push(3);
stack.push(4);
console.log('Popped item: ', stack.pop());
stack.push(5);
console.log('Popped item: ', stack.pop());
console.log('Popped item: ', stack.pop());
console.log('Popped item: ', stack.pop());
stack.push(1);
console.log('Stack: ', stack.asArray());

// ###################### Queue (FIFO) ######################
class Queue {
    constructor(size) {
        this.size = size;
        this.count = 0;
        this.items = [...new Array(size)].map(() => 0);
        this.front = 0;
        this.rear = this.size - 1;
    }

    isFullQueue() {
        return this.count === this.size;
    }

    isEmptyQueue() {
        return this.count === 0;
    }

    enqueue(item) {
        if (this.isFullQueue()) {
            throw new Error('The queue is full');
        }

        this.rear = (this.rear + 1) % this.size;
        this.items[this.rear] = item;
        this.count++;
    }

    dequeue() {
        if (this.isEmptyQueue()) {
            throw new Error('The queue is empty');
        }

        this.items[this.front] = 0;
        this.front = (this.front + 1) % this.size;
        this.count--;
    }

    asArray() {
        return this.items;
    }
}

const queue = new Queue(5);
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);
queue.enqueue(5);
queue.dequeue();
queue.dequeue();
queue.enqueue(6);
queue.enqueue(7);

console.log('Queue: ', queue.asArray());

// ###################### Linked List ######################
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    add(item) {
        const newItem = new Node(item);

        if (!this.head) {
            this.head = newItem;
        } else {
            let lastItem = this.head;

            while (lastItem.next) {
                lastItem = lastItem.next;
            }

            lastItem.next = newItem;
        }

        this.size++;
    }

    insert(item, index) {
        if (index < 0 || index >= this.size) {
            throw new Error('Index out of bound');
        }

        const newItem = new Node(item);

        if (index === 0) {
            newItem.next = this.head;
            this.head = newItem;
        } else {
            let currentItem = this.head;

            for (let i = 0; i < index; i++) {
                currentItem = currentItem.next;
            }

            let tempItem = currentItem.next;
            currentItem.next = newItem;
            newItem.next = tempItem;
        }

        this.size++;
    }

    remove(index) {
        if (index < 0 || index >= this.size) {
            throw new Error('Index out of bound');
        }

        if (index === 0) {
            this.head = this.head.next;
        } else {
            let currentItem = this.head;

            for (let i = 0; i < index-1; i++) {
                currentItem = currentItem.next;
            }

            currentItem.next = currentItem.next.next;
        }

        this.size--;
    }

    asArray() {
        const arr = [];
        let lastItem = this.head;

        while(lastItem) {
            arr.push(lastItem.value);
            lastItem = lastItem.next;
        }

        return arr;
    }
}

const linkedList = new LinkedList();
linkedList.add(3);
linkedList.add(4);
linkedList.add(6);
linkedList.insert(2, 0);
linkedList.insert(5, 2);
linkedList.insert(7, 4);
linkedList.add(8);
linkedList.remove(0);
linkedList.remove(5);
linkedList.remove(2);
console.log('Linked list: ', linkedList.asArray());

// ###################### Binary Search Tree ######################
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(item) {
        const newNode = new TreeNode(item);

        if (!this.root) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(parentNode, newNode) {
        if (newNode.value < parentNode.value) {
            if (!parentNode.left) {
                parentNode.left = newNode;
            } else {
                this.insertNode(parentNode.left, newNode);
            }
        } else {
            if (!parentNode.right) {
                parentNode.right = newNode;
            } else {
                this.insertNode(parentNode.right, newNode);
            }
        }   
    }

    preorder(node) {
        if (node) {
            console.log(node.value);
            this.preorder(node.left);
            this.preorder(node.right);
        }
    }

    inorder(node) {
        if (node) {
            this.inorder(node.left);
            console.log(node.value);
            this.inorder(node.right);
        }
    }

    postorder(node) {
        if (node) {
            this.postorder(node.left);
            this.postorder(node.right);
            console.log(node.value);
        }
    }

    search(node, item) {
        if (!node) {
            return false;
        }

        if (item < node.value) {
            return this.search(node.left, item);
        }

        if (item > node.value) {
            return this.search(node.right, item);
        }

        return true;
    }
}

const arr1 = [16, 30, 24, 7, 62, 45, 5, 55];
const arr2 = [1, 2, 3, 4, 5, 6, 7, 8];
const arr3 = [8, 7, 6, 5, 4, 3, 2, 1];

const binarySearchTree = new BinarySearchTree();
arr1.forEach(item => binarySearchTree.insert(item));
console.log('Preorder traversal');
binarySearchTree.preorder(binarySearchTree.root);
console.log('Inorder traversal');
binarySearchTree.inorder(binarySearchTree.root);
console.log('Postorder traversal');
binarySearchTree.postorder(binarySearchTree.root);
const found = binarySearchTree.search(binarySearchTree.root, 44);
console.log('found: ', found);