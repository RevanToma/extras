// Destructuring allows you to unpack values from arrays or properties from
// objects into distinct variables.

// Task 1: Use destructuring to assign the values "John" and "Doe" from the
// `fullName` array into separate variables `firstName` and `lastName`.
const fullName = ["John", "Doe"];

const [firstName,lastName] = fullName
  
  console.log(firstName,lastName)

// Task 2: Destructure the `user` object below to create variables `name`
// and `age` using object destructuring.
const user = {
  name: "Alice",
  age: 25,
}, 
  {name,age} = user

// Task 3: Print `firstName`, `lastName`, `name`, and `age` using console.log.
console.log(firstName,lastName,name,age);
// Task 4: Write a function called `getFullName` that takes an object with properties
// `firstName` and `lastName`, and returns a string that combines them in the format
// "FirstName LastName". The function has to use destructuring.
const getFullName = (object) => {
  const {firstName, lastName} = object

  return `${firstName.at(0).toUpperCase() + firstName.slice(1)} ${lastName.at(0).toUpperCase() + lastName.slice(1)}`;
}


// Task 5: Call the `getFullName` function with the `person` object and print
// the result using console.log.
const person = {
  firstName: "Jane",
  lastName: "Smith",
};
const personFullName = getFullName(person)
console.log(personFullName)