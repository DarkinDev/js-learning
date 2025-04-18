function getFullName(firstName, lastName) {
  return capitalize(firstName + " " + lastName);
}

function capitalize(str) {
  let array1 = str.split(" ");
  let newarray1 = [];

  for (let x = 0; x < array1.length; x++) {
    newarray1.push(array1[x].charAt(0).toUpperCase() + array1[x].slice(1));
  }
  return newarray1.join(" ");
}

const maxOfThree = (a, b, c) => {
  return Math.max(a, b, c);
};

const getAge = (birthYear) => 2025 - birthYear;

const calculateBMI = (weight, height) => {
  return weight / height ** 2;
};

console.log(getFullName("hello", "world"));
console.log(capitalize("the quick brown fox"));
console.log(maxOfThree(5, 7, 1));
console.log(getAge(2005));
console.log(calculateBMI(93, 1.8));
