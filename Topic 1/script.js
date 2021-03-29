// Exercise 1 -----------------------------------------------------------------------
const drinks = [
  { name: "lemonade", price: 50 },
  { name: "lime", price: 10 },
  { name: "tequila", price: 30 },
  { name: "cocktail", price: 25 },
  { name: "rom", price: 14 },
];

const sortDrinksByPrice = (arr) => arr.sort((a, b) => a.price - b.price);

console.log('%c ---------Exercise 1--------- ', 'background: #222; color: #bada55');
console.log(sortDrinksByPrice(drinks));

// Exercise 2 -----------------------------------------------------------------------
function detectWord(hiddenWord) {
  let word = hiddenWord
    .split("")
    .filter((letter) => letter === letter.toLowerCase())
    .join("");
  return word;
}

const word1 = detectWord("UcUNFYGaFYFYGtNUH");
const word2 = detectWord("bEEFGBuFBRrHgUHlNFYaYr");
const word3 = detectWord("YFemHUFBbezFBYzFBYLleGBYEFGBMENTment");
const word4 = detectWord("HDSDIYPjaIDSvaDSDKIOscriIUYBMLOIGpISDGUtRR");

console.log('%c ---------Exercise 2--------- ', 'background: #222; color: #bada55');
console.table([word1, word2, word3, word4]);

//Exercise 3 -----------------------------------------------------------------------

function isTrue(expression) {
  if (expression.match("[0-9]+[<|>|=]+[0-9]")) {
    const newExpression = expression.replace("=", "===");
    return eval(newExpression);
  }
  return "The pattern is not respected!";
}

console.log('%c ---------Exercise 3--------- ', 'background: #222; color: #bada55');
console.log(`"25>23" is evaluated to: ${isTrue("25>23")}`);
console.log(`"20>23" is evaluated to: ${isTrue("20>23")}`);
console.log(`"22<23" is evaluated to: ${isTrue("22<23")}`);
console.log(`"25<23" is evaluated to: ${isTrue("25<23")}`);
console.log(`"22=23" is evaluated to: ${isTrue("22=23")}`);
console.log(`"22>22" is evaluated to: ${isTrue("22>22")}`);
console.log(`"22!=22" is evaluated to: ${isTrue("22!=22")}`);
console.log(`"22222=!" is evaluated to: ${isTrue("22222=!")}`);

// Exercise 4 -----------------------------------------------------------------------

function showInk(colors) {
  let values = [];
  for (const key in colors) {
    values.push(colors[key]);
  }
  return Math.min(...values);
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

console.log('%c ---------Exercise 4--------- ', 'background: #222; color: #bada55');
console.log(`I can print ${showInk(ob1)} pages.`);
console.log(`I can print ${showInk(ob2)} pages.`);
console.log(`I can print ${showInk(ob3)} pages.`);

// Exercise 5 -----------------------------------------------------------------------

function set(array) {
  return array
    .filter((item, index) => array.indexOf(item) === index)
    .sort((a, b) => a - b);
}

console.log('%c ---------Exercise 5--------- ', 'background: #222; color: #bada55');
console.log(set([1, 3, 3, 5, 5]));
console.log(set([4, 4, 4, 4]));
console.log(set([5, 7, 8, 9, 10, 15]));
console.log(set([3, 3, 3, 2, 1]));
