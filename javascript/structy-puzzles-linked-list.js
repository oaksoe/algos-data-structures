class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

const a = new Node("a");
const b = new Node("b");
const c = new Node("c");
const d = new Node("d");

a.next = b;
b.next = c;
c.next = d;

// linkedListValues
// Iterative
const linkedListValues = (head) => {
  const list = [];

  let current = head;
  while (current) {
    list.push(current.val);
    current = current.next;
  }

  return list;
};

// Recursive
// const linkedListValues = (head) => {
//   if (head === null) {
//     return [];
//   }
  
//   return [head.val, ...linkedListValues(head.next)];
// };

// Solution by Ashraf (Credit: Ashraf)
// const linkedListValues = (head, result = []) => {
//  // recursive approach
//   if(!head) return result;
//   result.push(head.val);
//   return linkedListValues(head.next, result)
// };

console.log(linkedListValues(a));

// sumList
// Iterative
// const sumList = (head) => {
//   let current = head;
//   let sum = 0;

//   while (current) {
//     sum += current.val;
//     current = current.next;
//   }

//   return sum;
// }

// Recursive
const sumList = (head) => {
  if (head === null) {
    return 0;
  }

  return head.val + sumList(head.next);
}

// const a = new Node(2);
// const b = new Node(8);
// const c = new Node(3);
// const d = new Node(-1);
// const e = new Node(7);

// a.next = b;
// b.next = c;
// c.next = d;
// d.next = e;

// console.log(sumList(a));

// linkedListFind
// Iterative
const linkedListFind = (head, target) => {
  let current = head;

  while(current) {
    if (current.val === target) {
      return true;
    }

    current = current.next;
  }

  return false;
}

// Recursive
// const linkedListFind = (head, target) => {
//   if (head === null) {
//     return false;
//   }

//   if (head.val === target) {
//     return true;
//   }

//   return linkedListFind(head.next, target);
// }

console.log(linkedListFind(a, 'c'));

// getNodeValue
// Iterative
// const getNodeValue = (head, index) => {
//   let current = head;
//   let currentIndex = 0;

//   while (current) {
//     if (currentIndex === index) {
//       return current.val;
//     }

//     current = current.next;
//     currentIndex += 1;
//   }

//   return null;
// }

// Recursive
const getNodeValue = (head, index, currentIndex = 0) => {
  if (head === null) {
    return null;
  }

  if (currentIndex === index) {
    return head.val;
  }

  return getNodeValue(head.next, index, currentIndex + 1);
}

// Solution by Ashraf (Credit: Ashraf)
// const getNodeValue = (head, index) => {
//   // recursive approach
//   if(!head) return null;
//   if(index === 0) return head.val;
//   return getNodeValue(head.next, index - 1);
// };

console.log(getNodeValue(a, 2));

// reverseList
// Iterative
// const reverseList = (head) => {
//   let current = head;
//   let prev = null; 
//   let next;

//   while(current) {
//     next = current.next;
//     current.next = prev;
    
//     prev = current;
//     current = next;
//   }

//   return prev;
// }

// Recursive
const reverseList = (head, prev = null) => {
  if (head === null) {
    return prev;
  }

  const next = head.next;
  head.next = prev;

  return reverseList(next, head);
}

console.log(reverseList(a));

// zipperLists
// Iterative
const zipperLists = (head1, head2) => {
  let current1 = head1;
  let current2 = head2;

  while(current1 && current1.next && current2) {
    const current1Next = current1.next;
    const current2Next = current2.next;

    current1.next = current2;
    current2.next = current1Next;

    current1 = current1Next;
    current2 = current2Next;
  }

  if (current1.next === null) {
    current1.next = current2;
  }

  return head1;
};

// const a = new Node("a");
// const b = new Node("b");
// const c = new Node("c");
// const d = new Node("d");
// const e = new Node("e");
// const f = new Node("f");
// a.next = b;
// b.next = c;
// c.next = d;
// d.next = e;
// e.next = f;
// // a -> b -> c -> d -> e -> f

// const x = new Node("x");
// const y = new Node("y");
// const z = new Node("z");
// x.next = y;
// y.next = z;
// // x -> y -> z

console.log(zipperLists(a, x));