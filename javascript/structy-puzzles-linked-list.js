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

  while (current) {
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

  while (current1 && current1.next && current2) {
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

// mergeLists
const mergeLists = (head1, head2) => {
  let head = head1;
  let cur2 = head2;

  if (head.val > head2.val) {
    head = head2;
    cur2 = head1;
  }

  let cur1 = head;

  while (cur1 !== null && cur2 !== null) {
    while (cur1.next !== null && cur1.next.val < cur2.val) {
      cur1 = cur1.next;
    }

    const cur1Next = cur1.next;
    cur1.next = cur2;

    while (cur1Next !== null && cur2.next !== null && cur2.next.val < cur1Next.val) {
      cur2 = cur2.next;
    }

    const cur2Next = cur2.next;

    if (cur1Next !== null) {
      cur2.next = cur1Next;
    }

    cur1 = cur1Next;
    cur2 = cur2Next;
  }

  return head;
};

// 5 -> 7 -> 10 -> 12 -> 20 -> 28
// 6 -> 8 -> 9 -> 25

// const a = new Node(5);
// const b = new Node(7);
// const c = new Node(10);
// const d = new Node(12);
// const e = new Node(20);
// const f = new Node(28);
// a.next = b;
// b.next = c;
// c.next = d;
// d.next = e;
// e.next = f;
// // 5 -> 7 -> 10 -> 12 -> 20 -> 28

// const q = new Node(6);
// const r = new Node(8);
// const s = new Node(9);
// const t = new Node(25);
// q.next = r;
// r.next = s;
// s.next = t;
// // 6 -> 8 -> 9 -> 25

// const h = new Node(30);
// // 30

// const p = new Node(15);
// const q = new Node(67);
// p.next = q;
// // 15 -> 67

// const a = new Node(5);
// const b = new Node(7);
// const c = new Node(10);
// const d = new Node(12);
// const e = new Node(20);
// const f = new Node(28);
// a.next = b;
// b.next = c;
// c.next = d;
// d.next = e;
// e.next = f;
// // 5 -> 7 -> 10 -> 12 -> 20 -> 28

// const q = new Node(1);
// const r = new Node(8);
// const s = new Node(9);
// const t = new Node(10);
// q.next = r;
// r.next = s;
// s.next = t;
// // 1 -> 8 -> 9 -> 10

// console.log(JSON.stringify(mergeLists(a, q)));

// isUnivalueList
// Iterative
// const isUnivalueList = (head) => {
//   let cur = head;
//   const val = head.val;

//   while (cur.next !== null) {
//     if (val !== cur.next.val) {
//       return false;
//     }

//     cur = cur.next;
//   }

//   return true;
// }

// Recursive
const isUnivalueList = (head, val) => {
  if (head === null) {
    return true;
  }

  if (val && head.val !== val) {
    return false;
  }

  return isUnivalueList(head.next, head.val);
}

// removeNode
const removeNode = (head, targetVal) => {
  if (head.val === targetVal) {
    return head.next;
  }

  let cur = head;
  let prev = null;

  while (cur.val !== targetVal) {
    prev = cur;
    cur = cur.next;
  }

  prev.next = cur.next;
  return head;
}

// insertNode
const insertNode = (head, value, index) => {
  const newNode = new Node(value);

  if (index === 0) {
    newNode.next = head;
    return newNode;
  }

  let cur = head;
  let curIndex = 0;

  while (curIndex < index - 1) {
    cur = cur.next;
    curIndex += 1;
  }

  const curNext = cur.next;
  cur.next = newNode;
  newNode.next = curNext;

  return head;
}

const createLinkedList = (values) => {
  if (values.length === 0) {
    return null;
  }

  const head = new Node(values[0]);
  let cur = head;

  for (let i = 1; i < values.length; i += 1) {
    cur.next = new Node(values[i]);
    cur = cur.next;
  }

  return head;
};

// longest streak
const longestStreak = (head) => {
  if (head === null) {
    return 0;
  }

  let longest = 0;
  let curLongest = 0;
  let cur = head;
  let prev = null;

  while (cur !== null) {
    if (cur.val !== prev) {
      prev = cur.val;
      curLongest = 1;
    } else {
      curLongest += 1;
    }

    if (longest < curLongest) {
      longest = curLongest;
    }

    cur = cur.next;
  }

  return longest;
}

// const a = new Node(3);
// const b = new Node(3);
// const c = new Node(3);
// const d = new Node(3);
// const e = new Node(9);
// const f = new Node(9);

// a.next = b;
// b.next = c;
// c.next = d;
// d.next = e;
// e.next = f;

// 3 -> 3 -> 3 -> 3 -> 9 -> 9

// console.log(longestStreak(a))

// addLists
const addLists = (head1, head2) => {
  let head3 = new Node();

  let current1 = head1;
  let current2 = head2;
  let current3 = head3;
  let reminder = 0;

  while (current1 && current2) {
    const val = current1.val + current2.val + reminder;
    reminder = Number.parseInt(val / 10);
    current3.next = new Node(val % 10);
    current3 = current3.next;
    current1 = current1.next;
    current2 = current2.next;
  }

  while (current1) {
    const val = current1.val + reminder;
    Number.parseInt(val / 10)
    current3.next = new Node(val % 10);
    current3 = current3.next;
    current1 = current1.next
  }

  while (current2) {
    const val = current2.val + reminder;
    Number.parseInt(val / 10)
    current3.next = new Node(val % 10);
    current3 = current3.next;
    current2 = current2.next
  }

  if (reminder > 0) {
    current3.next = new Node(reminder);
  }

  return head3.next;
};
