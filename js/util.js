// Get random integer
const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Генератор рандомного индекса
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Counter
function makeCounter() {
  let currentCount = 0;
  return () => currentCount += 1;
}
let counter = makeCounter();
// каждый вызов возвращает результат, увеличивая счётчик
/* console.log(counter());
console.log(counter()); */

function collisionRandom(lower, upper) {
  const randomNumbers = [];

  return function() {
    let newNumber = null;
    console.log(randomNumbers);

    if (upper - lower === randomNumbers.length) {
      return 'Все варианты исчерпаны';
    }

    while (randomNumbers.includes(newNumber) || newNumber === null) {
      newNumber = getRandomInteger(lower, upper);
    }

    randomNumbers.push(newNumber);

    return newNumber;
  };
}

let result = collisionRandom(5, 8);

export {getRandomInteger, getRandomArrayElement, counter};
