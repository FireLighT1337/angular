// generally always use const
//Once you assign a value to a const variable, you cannot point that variable name to a new value later.

const pi = 3.14159;
const maxUsers = 100;

// This will cause a TypeScript compiler error:
pi = 3;

// const protects the variable binding, not the value itself.
// If you assign an object or an array to a const, you can still change the properties inside it:

const user = { name: "Alice", age: 25 };

// This is PERFECTLY VALID:
user.age = 26;

// This will FAIL (re-assignment):
user = { name: "Bob", age: 30 };

// Use let when you know a variable's value is going to be overwritten or recalculated later in your code.
// 1. Loops and Iterators:

for (let i = 0; i < 5; i++) {
  console.log(i); // 'i' changes every iteration
}

// 2. Counters, Accumulators, or Toggles:

let score = 0;
score += 10; // Value changes

let isLoggedIn = false;
isLoggedIn = true; // Value changes

// 3. Delayed Initialization
// If you cannot give a variable its value right away (for example, inside an if/else block), use let:

let discount: number;

if (isPremiumMember) {
  discount = 0.2;
} else {
  discount = 0.05;
}
