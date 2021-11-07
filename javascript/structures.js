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
console.log(linkedList.asArray());
