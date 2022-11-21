// 4.2.1 DataTypes

// attention: typeof null -> will show "object" (see https://stackoverflow.com/questions/18808226/why-is-typeof-null-object)
console.log(
  `${typeof undefined} ${typeof true} ${typeof "s"} ${typeof 42} ${typeof 12345678901234567890n} ${typeof {
    a: false,
  }}  ${typeof null}  ${typeof Symbol("aa")} `
);

// 4.2.2.1 Constants and variables
let s1 = "s";
const s2 = "s";
let n1 = 2;
const n2 = 22293;
n1 = "Now I am a string all of a sudden"; // possible
try {
  n2 = 3;
} catch (e) {
  console.warn("Cannot assign value to a constant: " + e.message);
}

// 4.2.2.2 objects
const jsonString =
  '{ "name": "Dan Knopf", "age": "45", "Hobbies": ["javascript programmign", "breathing"] }';
let obFromJson = JSON.parse(jsonString);
obFromJson.dateOfBirth = new Date(1977, 8, 15); // will be serialized to ISO 8601 -> "1977-09-14T23:00:00.000Z" (Z for UTC, there is a timezone conversion)
const backToJson = JSON.stringify(obFromJson);
obFromJson = JSON.parse(backToJson); // dateOfBirth will be a string now
let dateOfBirthAsDate = new Date(obFromJson.dateOfBirth); // now we have a date again.
// ### Background on dates, JSON and JS
// JSON doesn't know dates so a javascript date has to be be converted to a string (number would theoretically possible as well: nof ticks since 1970..)
// It would be possible to overwrite the JSON parse method: https://weblog.west-wind.com/posts/2014/jan/06/javascript-json-date-parsing-and-real-dates (false positivs possible)
// Timezone issues: Another problem of JS date to JSON conversion can be the timezone: new Date(...) usually uses local time but is serialized to UTC.
//   possible issues: a) actual offset gets lost b) date might change -> so applications need to be able to handle this

// 4.2.2.3 Arrays & Maps
const pwArray = [
  "1234",
  "abc",
  "MyBirthdayDividedByMyAuntsNofPimplesMultipliedByMyShoeSize",
];
const urls = ["https://myEbanking", "https://cookingRecipes", "https://myMail"];
const map = new Map();
map.set(urls[0], 1); // -> cookingRecipies: abc
map.set(urls[1], 0);
map.set(urls[2], 2);

// 4.2.3.1 Conditions
let x = 4,
  y = 1; // Remark: example is not really well structured + there are no type checks, minus value checks etc.
if (x < 10 && y < 10 && x * y > 50) {
  console.log("fits");
} else if (x > 10 || y > 10) {
  console.log("out of bounds"); // or throw  (usually, i would place out of bound checks first)
} else if (x * y < 50) {
  console.log("uncomfortable");
} else {
  console.log("We get here with 5 * 10"); // this is what we missed
}

// 4.2.3.2 Case matching
const caseMatchingTest = 2;
switch (typeof caseMatchingTest) {
  case "string":
    console.log(`${typeof caseMatchingTest}  '${caseMatchingTest}' (simple string)`);
    break;
  case "number":
    console.log(
      `${typeof caseMatchingTest}  '${caseMatchingTest}' (may fav. no is: -3493,39293423987492783450912323678345234234723462345786234095827342783409576123'40982340578)`
    );
    break;
  default:
    console.log(
      `${typeof caseMatchingTest}  '${caseMatchingTest}' (Testimony of me being to lazy to implement all types)`
    );
    break;
}

// 4.2.3.3 Loops
const input = [5, 2, 564, 88];
const sorted = new Array();
// algorithm: loop through input and search the smallest that is bigger than the number found during the last round (no optimization etc. )
for (let i = 0; i <= input.length; i++) {
  const mastBeBigger = sorted.length > 0 ? sorted[sorted.length-1] : undefined;
  let smallestVal = undefined;
  console.log(`Outer loop ${i}  '${mastBeBigger}' (finding smallest value)`);
  for (let y = 0; y < input.length; y++) {
    const val = input[y];
    console.log(
      `-- inner loop ${y}  '${val}'   (smallest val so far: ${smallestVal}, must be bigger than ${mastBeBigger})`
    );
    if ((smallestVal === undefined || smallestVal > val) && (val > mastBeBigger || mastBeBigger === undefined)) {
      smallestVal = val;
    }
  }

  console.log('Value added: ' + smallestVal);
  sorted.push(smallestVal);
}
console.log("Sorted array: " + sorted); //2,5,88,564
