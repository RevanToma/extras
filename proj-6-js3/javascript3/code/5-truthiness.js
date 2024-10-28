// Truthy and falsy values help in conditional statements. A truthy value is a value
// that is considered true in Boolean context.

// Task 1: Create an array called `values` containing the following values:
// 0, "hello", null, undefined, false, "false", -1 and "JavaScript".
const values = [0, 'hello', null, undefined,false,"false", -1, 'Javascript']

// Task 2: Write a function called `checkTruthiness` that takes a value and
// logs whether it is truthy or falsy.
const checkTruthiness = (arr) => arr.map(item => console.log(`Item ${item} is ${item ? 'truthy' : 'falsy'}`))
 checkTruthiness(values)

const checkTruthinessOfOneValue = (value) => console.log(`Item ${value} is ${value ? 'truthy' : 'falsy'}`);


// Task 3: Loop through the `values` array using forEach and call `checkTruthiness` on each value.
// values.forEach(value => checkTruthinessOfOneValue(value))

// Task 4. Loop through the `values` array using a for-loop and call `checkTruthiness` on each value.
 for(const item of values) {
     checkTruthinessOfOneValue(item)
 }
// Task 5. Loop through the `values` array using a while-loop and call `checkTruthiness` on each value.
let index = 0
while(index < values.length){
    checkTruthinessOfOneValue(values[index])
    index++
}