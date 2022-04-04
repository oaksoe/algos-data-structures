!isNaN('2')
!isNaN('a')

parseInt('2')
parseInt('a')

Array(10).fill('a')

['a', 'r', 'r', 'a', 'y'].join('')  // => 'array'

Number.isInteger(Number('3'))

for (const key in object); // object[key]

// ##########################
const map = {};
for (;;) {
  if (!(char in map)) {
    map[char] = 0;
  }
  map[char] += 1;
}

// ##########################
const set = new Set([3]);
set.has(3); // true