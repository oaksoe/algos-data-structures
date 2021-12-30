// https://leetcode.com/problems/middle-of-the-linked-list

var middleNode = function(head) {
    var length = 1;
    var currentNode = head;
    
    while (currentNode.next) {
        length++;
        currentNode = currentNode.next;
    }
    
    var mid = length % 2 === 0 ? (length / 2) + 1 : (length + 1) / 2;
    
    var midNode = head;
    
    for (var i = 1; i < mid; i++) {
        midNode = midNode.next;
    }
    
    return midNode;
};


// https://leetcode.com/problems/populating-next-right-pointers-in-each-node

var setNext = function(curNode) {
    if (curNode && curNode.left) {
        curNode.left.next = curNode.right;
        
        if (curNode.next) {
            curNode.right.next = curNode.next.left;
        }
        
        setNext(curNode.left);
        setNext(curNode.right);
    }
}

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function(root) {
    setNext(root);
    return root;
};