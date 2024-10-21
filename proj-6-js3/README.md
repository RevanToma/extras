# Pizzabot

Today's assignment is to practices some parts of JavaScript you've learnt so far to create a little text-based bot which you can use to order pizza on your computer.

## How to complete this assignment

Follow the tasks below and write your bot code in `code/pizzabot.js`. You can open `code/index.html` in the browser to use and test the bot.

The bot you'll build is a fake ordering system which will use [`alert()`](https://www.w3schools.com/jsref/met_win_alert.asp) and [`prompt()`](https://www.w3schools.com/jsref/met_win_prompt.asp) to allow the user to input orders, and the bot to send output. Read up on how to use them before you continue.

### Task 1: Setting up variables

Before you start writing your "bot", there's a few things you should know about your pizzeria:

- Your pizzeria only serves 3 different pizzas right now; _Vegetarian_, _Hawaiian_ and _Pepperoni_.
- All the pizzas have the same price - 80 SEK.
- Because of the popularity of your pizzeria, and long queues, you can only order multiple pizzas of the same sort.

#### 1.1 Modeling the menu

To start you off, we've defined 4 variables in code/pizzabot.js which you'll use throughout the rest of this assignment:

```
const vegetarian = "Vegetarian Pizza"
const hawaiian = "Hawaiian Pizza"
const pepperoni = "Pepperoni Pizza"

const pizzaPrice = 80
```

#### 1.2 Greeting the customer

In code/pizzabot.js, you can start coding the bot interaction. The first step is to greet a new customer.

Use `alert()` to print the message `"Hey! Happy to serve your pizza. On our menu we have X, Y and Z"`.

Use the variables `vegetarian`, `hawaiian` and `pepperoni` to replace `X`, `Y` and `Z` in the message so that it reads `"Hey! Happy to serve your pizza. On our menu we have Vegetarian Pizza, Hawaiian Pizza and Pepperoni Pizza"`

#### 2.3 Ask the user which pizza they want, and how many

Use `prompt()` to ask the user which pizza they want. The message in the prompt should read `Enter the name of the pizza you want to order today.`. Their response should be stored in a new variable called `orderName`.

Next, ask the user (with another `prompt()`) how many they'd like: `How many of X do you want?`. X should be replaced with the `orderName` variable so that it if I ordered "Hawaiian Pizza" it would read "How many of Hawaiian Pizza do you want?". As before, the response from this prompt should be stored in a variable, this time called `orderQuantity`

#### 2.4 Finalizing the order

Calculate the total price of the order using the `orderQuantity` and `pizzaPrice` variables and store it in a variable called `orderTotal`. Use an alert to tell the user: `Great, I'll get started on your X right away, it will cost Y kr` (where X should be replaced by the `orderName` variable and Y should be replaced by the `orderTotal` variable).

For example, if I ordered 3 Hawaiian pizzas, the message should read: "Great, I'll get started on your Hawaiian Pizza right away, it will cost 240 kr"

### 3. Conditionals

We want you to add three conditionals statements (if-statements) to your program to improve it.

#### 3.1 Checking that the Pizza is on the menu

When the user enters the `orderName` prompt, add an if-statement to check if the input text matches any of the pizza name variables (`vegetarian`, `hawaiian`, `pepperoni`).

#### Show cooking times

Before you print the final `Great, I'll get started on your X right away, it will cost Y kr` message to the user, calculate the cooking time based on these rules and add it to the message:

- 1-2 pizzas: `The pizzas will take 10 minutes.`
- 3-5 pizzas: `The pizzas will take 15 minutes.`
- 6+ pizzas: `The pizzas will take 20 minutes.`

For example, if I ordered 3 Hawaiian pizzas, the message should now read: "Great, I'll get started on your Hawaiian Pizza right away, it will cost 240 kr. The pizzas will take 15 minutes."

### 4. Functions

Finally, clean up your code by moving some code into functions and then calling that function when needed.

The functions should all reflect the tasks we've completed so far. So, the functions should be:

1. `checkOrderName()` which should take the `orderName` variable as an argument and return `true` or `false` if the pizza is on the menu or not.
1. `totalCost()` which takes `orderQuantity` as an argument and returns the total cost for the order.
1. `cookingTime()` which takes `orderQuantity` and returns the number of minutes it will take to finish the order.

### 5. HTML user interface

2. Instead of having your pizzabot live in the console make a form in HTML for the input from the user with: pizza type and number of pizzas. Then make your program print it's response in HTML instead.

A combination of these two examples will help you on the way: [Forms submissions with JavaScript](https://www.w3schools.com/js/tryit.asp?filename=tryjs_form_submit) and [Get Element by ID](https://www.w3schools.com/js/exercise.asp?filename=exercise_arrays4).

### 6. Setup repo in Github

1. Create a Github repo.
2. Upload your files to Github:

```
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin <Address to your repo>
git push -u origin main
```

### 7 Hand in the assignment

Click the link in canvas and input the link to your repo repo.

### :books: Reading List

- [MDN - const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
- [MDN - let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
- [MDN - if/else](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)
- [MDN - arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

---

### :sos: How to get help

Learning how to think as a web developer is learning how to be an expert in problem solving. So whenever you get stuck start with step 1 and continue until problem solved.

1. Google! In English, type in the error message if there is one, search within the language your're using (ie CSS, JavaScript etc).
2. Ask your code buddies in your group.
3. Ask your fellow students in Slack.
4. Ask David. Please note: we are part of a sharing community - share the answer with your fellows.

---

### :boom: Success!

After completing this assignment your should:

- Be comfortable using variables
- Know some string methods to modify strings
- Understand control flow and the use of conditionals statements
- Be able to write basic functions which take arguments and return values
- Create a simple HTML ui
