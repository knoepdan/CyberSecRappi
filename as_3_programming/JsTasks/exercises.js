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
  '{ "name": "Dan Knopf", "age": "45", "Hobbies": ["javascript programming", "breathing"] }';
let obFromJson = JSON.parse(jsonString);
obFromJson.dateOfBirth = new Date(1977, 8, 15); // will be serialized to ISO 8601 -> "1977-09-14T23:00:00.000Z" (Z for UTC, there is a timezone conversion)
const backToJson = JSON.stringify(obFromJson);
obFromJson = JSON.parse(backToJson); // dateOfBirth will be a string now
let dateOfBirthAsDate = new Date(obFromJson.dateOfBirth); // now we have a date again.
// ### Background on dates, JSON and JS
// JSON doesn't know dates so a javascript date has to be be converted to a string (number would theoretically be possible as well: nof ticks since 1970..)
// It would be possible to overwrite the JSON parse method: https://weblog.west-wind.com/posts/2014/jan/06/javascript-json-date-parsing-and-real-dates (false positivs possible though)
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
    console.log(
      `${typeof caseMatchingTest}  '${caseMatchingTest}' (simple string)`
    );
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
// algorithm: loop through input and search the smallest that is bigger than the number found during the last round (no optimization, no usage of built-in functionality etc. )
for (let i = 0; i <= input.length; i++) {
  const mastBeBigger =
    sorted.length > 0 ? sorted[sorted.length - 1] : undefined;
  let smallestVal = undefined;
  console.log(`Outer loop ${i}  '${mastBeBigger}' (finding smallest value)`);
  for (let y = 0; y < input.length; y++) {
    const val = input[y];
    console.log(
      `-- inner loop ${y}  '${val}'   (smallest val so far: ${smallestVal}, must be bigger than ${mastBeBigger})`
    );
    if (
      (smallestVal === undefined || smallestVal > val) &&
      (val > mastBeBigger || mastBeBigger === undefined)
    ) {
      smallestVal = val;
    }
  }
  if (smallestVal !== undefined) {
    console.log("Value added: " + smallestVal);
    sorted.push(smallestVal);
  }
}
console.log("Sorted array: " + sorted); //2,5,88,564

// 4.2.4.1 methods
const isBetween = (noToCheck, noOne, noTwo) => {
  let biggerNo = noOne;
  let smallerNo = noTwo;
  if (smallerNo > biggerNo) {
    biggerNo = noTwo;
    smallerNo = noOne;
  }
  if (noToCheck <= biggerNo && noToCheck >= smallerNo) {
    return true;
  }
  return false;
};

const isInsideCuboid = (cuboidCoordinates, point) => {
  let [pointOne, pointTwo] = cuboidCoordinates;
  console.log(
    `${point.x}, ${point.y}, ${point.z} -> ${JSON.stringify(
      pointOne
    )} | ${JSON.stringify(pointTwo)} `
  );
  if (
    isBetween(point.x, pointOne.x, pointTwo.x) &&
    isBetween(point.y, pointOne.y, pointTwo.y) &&
    isBetween(point.z, pointOne.z, pointTwo.z)
  ) {
    return true;
  }
  return false;
};
const isInside = isInsideCuboid(
  [
    { x: 4, y: 1, z: 7 },
    { x: 7, y: 6, z: 300 },
  ],
  { x: 4, y: 2, z: 77 }
);
console.log(`is inside defined cuboid: ${isInside}`);
// shorthand syntax to return object:  p => {a:"b"};  // (brackets only for object, or no brackets at all for primitive types)
// assigning property value that has the same name as the property key: Example: let xx = 2; let ob = {x}; // ob now has property x with value 2

// 4.3.1 Template Strings & Spread Operator
let meOb = JSON.parse(jsonString); // defined above: '{ "name": "Dan Knopf", "age": "45", "Hobbies": ["javascript programming", "breathing"] }';
const meNow = {
  currentActivity: "learning JS",
  currentStateOfMind: "guru-like enlightened",
};
const meComplete = { ...meOb, ...meNow };
console.log("merged object: " + JSON.stringify(meComplete));

// 4.3.2 Variable as Property key
const getPropOfOb = (ob, nameOfProp) => {
  const propertyIsDefined = nameOfProp in ob; // in is similar to 'hasOwnProperty' but takes inheritance into account
  if (propertyIsDefined) {
    let val = ob[nameOfProp];
    if (val === undefined) {
      return `'${nameOfProp}' is defined but not set (meaning undefined or null)`;
    }
    return val; // jabadabadu, we have a property value (could be null though)
  }
  return `'${nameOfProp}' is not defined`;
};
meOb.aa = undefined;
console.log(getPropOfOb(meOb, "name")); // we get value (or null)
console.log(getPropOfOb(meOb, "aa")); // ..is defined but
console.log(getPropOfOb(meOb, "namasdfasdfeOIDoNotExist")); // ..is not defined

// 4.4.1 Searching
const getEvenNumbers = (numbersArray) => {
  const result = numbersArray.filter((n) => n % 2 === 0);
  return result;
};
const evenNumbers = getEvenNumbers([2, 6, -2, 423, 88, 3]);
console.log("Even numbers: " + evenNumbers);

// 4.4.2 Sorting
const numbers = [2, 12, 6, 22, 423, 88, 6, 17];
const sortAlph = numbers.sort((a, b) => {
  const aa = "" + a;
  const bb = "" + b;
  return aa - bb;
}); // just numbers.sort() would also be possible
const sortNumeric = numbers.sort((a, b) => a - b);
console.log("Sorted alphabethically: " + sortAlph);
console.log("Sorted numerically: " + sortNumeric);

// 4.4.3 Mapping
const tripleOne = [4, 3, 8]; // x,y,z
const tripleTwo = [4, 77, 8]; // x,y,z
const tripleArray = [tripleOne, tripleTwo];
const getCoordinateObArray = (tripletsArr) => {
  return tripletsArr.map((trip) => {
    return { x: trip[0], y: trip[1], z: trip[2] };
  });
};
console.log(
  "tranformed tripplets: " + JSON.stringify(getCoordinateObArray(tripleArray))
);

// 4.4.4 Aggregating
function objectify(names) {
  return names.reduce((result, current) => {
    result[current] = current.length;
    return result;
  }, {});
}
console.log(objectify(["an", "apple", "must", "be", "red"])); // => { "an": 2, "apple": 5, "must": 4, "be": 2, "red": 3 }

// 4.5 Journeyman's Piece (optional)
// Factorial: skipped
// Analyze code
// whatAmI function -> merges bar into foo. 
const whatAmI = (foo, bar) => {  // maybe a good name would be: mergeObInto (not 100% about that name as the feature to delete props in foo makes it a bit difficult to come up with a perfect name for me)
  if (!bar) {
    return foo;
  }
  const result = JSON.parse(JSON.stringify(foo)); // create a copy of foo (deep copy)
  Object.keys(bar).forEach((key) => {
    const value = bar[key];
    if (value === null) {
      result[key] && delete result[key]; // remove property from result
    } else if (value !== undefined) {
      if (Array.isArray(value)) {
        throw "Array elements not supported!"; // just not supported.. (would probably not be too difficult to implement)
      } else if (typeof value === "object" && foo[key]) {
        result[key] = whatAmI(foo[key], value);  // recursion
      } else {
        result[key] = value;
      }
    }
  });
  return result;
};
console.log('Res: ' + JSON.stringify(whatAmI({aa: "bbla", bb: 234, cc: "cccc", dd: [1,44]},  {aa: "aaaa", bb: null, bbzz: 234})));
