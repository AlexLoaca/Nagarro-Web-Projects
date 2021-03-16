// Exercise 1
const drinks = [
  { name: "lemonade", price: 50 },
  { name: "lime", price: 10 },
  { name: "tequila", price: 30 },
  { name: "cocktail", price: 25 },
  { name: "rom", price: 14 },
];

function sortDrinkByPrice(drinks) {
  drinks.sort((a, b) => {
    if (a.price > b.price) {
      return 1;
    } else {
      return -1;
    }
  });
  console.log(drinks);
}

sortDrinkByPrice(drinks);

// Exercise 2
function detectWord(hiddenWord) {
  let word = hiddenWord
    .split("")
    .filter((letter) => letter === letter.toLowerCase())
    .join("");
  console.log(word);
}

detectWord("UcUNFYGaFYFYGtNUH");
detectWord("bEEFGBuFBRrHgUHlNFYaYr");
detectWord("YFemHUFBbezFBYzFBYLleGBYEFGBMENTment");

//Exercise 3

function isTrue(expression) {
  if (expression.includes(">") || expression.includes("<")) {
    console.log(eval(expression));
  } else if (expression.includes("=")) {
    expression = expression.split("=");
    console.log(expression[0] == expression[1]);
  } else {
    console.log("The pattern is not respected!");
  }
}

isTrue("25>23");
isTrue("20>23");
isTrue("22<23");
isTrue("25<23");
isTrue("22=23");
isTrue("22>22");

// Exercise 4
let values = [];

function showInk(colors) {
  for (const key in colors) {
    values.push(colors[key]);
  }
  console.log(Math.min(...values));
  values = [];
  // Math.min(...Object.values(colors)) - A much simpler version on the internet of exactly this exercise
}

const ob1 = {
  cyan: 23,
  magenta: 12,
  yellow: 10,
};

const ob2 = {
  cyan: 432,
  magenta: 543,
  yellow: 777,
};

const ob3 = {
  cyan: 700,
  magenta: 700,
  yellow: 0,
};

showInk(ob1);
showInk(ob2);
showInk(ob3);

// Exercise 5

function set(array) {
  let newArr = array
    .filter((item, index) => array.indexOf(item) === index)
    .sort((a, b) => a - b);
  console.log(newArr);
}

set([1, 3, 3, 5, 5]);

set([4, 4, 4, 4]);

set([5, 7, 8, 9, 10, 15]);

set([3, 3, 3, 2, 1]);
