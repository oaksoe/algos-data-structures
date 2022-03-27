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

// https://leetcode.com/problems/maximum-difference-between-node-and-ancestor/
// This solution gets into JS Heap out of memory for very large input set
var traverse = function (curNode, ancestors, maxDiff) {
    if (curNode) {
        ancestors.forEach(node => {
            const diff = Math.abs(curNode.val - node);

            if (maxDiff.diff < diff) {
                maxDiff.diff = diff;
            }
        });

        const newAncestors = [...ancestors, curNode.val];
        traverse(curNode.left, newAncestors, maxDiff);
        traverse(curNode.right, newAncestors, maxDiff);   
    }
}

var maxAncestorDiff = function(root) {
    var maxDiff = {
        diff: 0,
    };
    
    traverse(root, [], maxDiff);
    
    return maxDiff.diff;
};

// https://leetcode.com/contest/weekly-contest-274/problems/check-if-all-as-appears-before-all-bs/
// Given a string s consisting of only the characters 'a' and 'b', return true if every 'a' appears before every 'b' in the string. Otherwise, return false.
var checkString = function(s) {
    var foundB = false;
    
    for (var i = 0; i < s.length; i++) {
        if (s[i] === 'b') {
            foundB = true;
        }
        
        if (foundB && s[i] === 'a') {
            return false;
        }
    }
        
    return true;
};

/*
https://leetcode.com/contest/weekly-contest-274/problems/number-of-laser-beams-in-a-bank/
Anti-theft security devices are activated inside a bank. You are given a 0-indexed binary string array bank representing the floor plan of the bank, which is an m x n 2D matrix. bank[i] represents the ith row, consisting of '0's and '1's. '0' means the cell is empty, while'1' means the cell has a security device.

There is one laser beam between any two security devices if both conditions are met:

The two devices are located on two different rows: r1 and r2, where r1 < r2.
For each row i where r1 < i < r2, there are no security devices in the ith row.
Laser beams are independent, i.e., one beam does not interfere nor join with another.

Return the total number of laser beams in the bank.
*/

var numberOfBeams = function(bank) {
    var totalBeams = 0;
    var camsInCurrentRow = 0;
    var camsInUpperRow = 0;
    
    for (var i = 0; i < bank.length; i++) {
        if (camsInCurrentRow > 0) {
            camsInUpperRow = camsInCurrentRow;
            camsInCurrentRow = 0;
        }

        for (var j = 0; j < bank[i].length; j++) {
            if (bank[i][j] === '1') {
                if (camsInUpperRow > 0) {
                    totalBeams += camsInUpperRow;
                }

                camsInCurrentRow++;
            }
        }
    }
    
    return totalBeams;
};

var list = ["011001","000000","010100","001000"];
var list2 = ["000","111","000"];
console.log(numberOfBeams(list));

/*
https://leetcode.com/contest/weekly-contest-274/problems/destroying-asteroids/
You are given an integer mass, which represents the original mass of a planet. You are further given an integer array asteroids, where asteroids[i] is the mass of the ith asteroid.

You can arrange for the planet to collide with the asteroids in any arbitrary order. If the mass of the planet is greater than or equal to the mass of the asteroid, the asteroid is destroyed and the planet gains the mass of the asteroid. Otherwise, the planet is destroyed.

Return true if all asteroids can be destroyed. Otherwise, return false.
*/

var asteroidsDestroyed = function(mass, asteroids) {
    var planetMass = mass;
    var bigAsteriods = asteroids;
    
    while(true) {
        if (bigAsteriods.length === 0) {
            return true;
        }

        var biggerAsteriods = [];

        for (var i = 0; i < bigAsteriods.length; i++) {
            if (planetMass >= bigAsteriods[i]) {
                planetMass += bigAsteriods[i];
            } else {
                biggerAsteriods.push(bigAsteriods[i]);
            }
        }

        if (bigAsteriods.length === biggerAsteriods.length) {
            return false;
        }

        bigAsteriods = biggerAsteriods;
    };
};

console.log(asteroidsDestroyed(10, [3,9,19,5,21]));
console.log(asteroidsDestroyed(5, [4,9,23,4]));

// https://leetcode.com/contest/weekly-contest-274/problems/maximum-employees-to-be-invited-to-a-meeting/

// https://leetcode.com/contest/weekly-contest-278/problems/keep-multiplying-found-values-by-two/
var findFinalValue = function(nums, original) {
    const map = {};
    
    for (let i = 0; i < nums.length; i++) {
        map[nums[i]] = i;
    }
    
    let newOriginal = original;
    
    while(map[newOriginal] !== undefined) {
        newOriginal *= 2;
    };
    
    return newOriginal;
};

console.log('final value', findFinalValue([5,3,6,1,12], 3));

// https://leetcode.com/contest/weekly-contest-278/problems/all-divisions-with-the-highest-score-of-a-binary-array/
// Issue: time limit exceeded!
var maxScoreIndices = function(nums) {
    let numsL, numsR;
    let maxCount = 0;
    const map = {};
    
    for (let i=0; i<= nums.length; i++) {
        numsL = [...nums];
        numsR = numsL.splice(i);

        let count = 0;

        for (let num of numsL) {
            if (num === 0) count++;
        }

        for (let num of numsR) {
            if (num === 1) count++;
        }

        if (maxCount < count) {
            maxCount = count;
        }

        if (!(count in map)) {
            map[count] = [];
        }

        map[count].push(i);
    }

    return map[maxCount];
};

console.log(maxScoreIndices([0,0,1,0]));

// https://leetcode.com/contest/weekly-contest-278/problems/find-substring-with-given-hash-value/

// https://leetcode.com/contest/weekly-contest-278/problems/groups-of-strings/