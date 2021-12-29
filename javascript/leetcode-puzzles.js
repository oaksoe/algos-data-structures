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
