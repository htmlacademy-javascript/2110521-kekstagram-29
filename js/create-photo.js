import {getRandomInteger, getRandomArrayElement} from './utils.js';

//Массивы
const messagePool = [
  'Всё отлично!',
  'В целом всё неплохо.Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неёполучилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ? !',
];

const namePool = [
  'Лео Месси',
  'Неймар',
  'Карим Бензема',
  'Кевин Де Брюйне',
  'Мохаммед Салах',
  'Килиан Мбаппе',
  'Эрлинг Холланд',
  'Харри Кейн',
  'Мартин Эдегор',
  'Винисиус Жуниор',
];

const description = [
  'хороший день!',
  'Все довольны',
  'Чудесно!',
  'Требуем продолжения.',
  'Выходные',
  'гуд',
  'Мы обязательно встретимся.',
  'Никто.',
  'А скоро Новый Год =)',
  'Скоро!!!',
];

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//id generator
const createRandomIdGenerator = (min, max) => {
  const previousValue = [];

  return function () {
    let currentValue = getRandomPositiveInteger(min, max);
    if (previousValue.length >= (max - min +1)) {
      console.log(previousValue.length);
      return null;
    }
    while (previousValue.includes(currentValue)){
      currentValue = getRandomPositiveInteger(min, max);
    }
    previousValue.push(currentValue);
    return currentValue;
  };
};

const generateUrlId = createRandomIdGenerator(1, 25);

// Counter
function makeCounter() {
  let currentCount = 0;
  return () => {
    currentCount += 1;
    return currentCount;
  };
}
let counter = makeCounter(1, 25);

//Генерируем коммент
const createComment = () => ({
  id: 100 + counter(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message:
  getRandomInteger(1, 2) > 1
    ? getRandomArrayElement(messagePool) + ' ' + getRandomArrayElement(messagePool)
    : getRandomArrayElement(messagePool),
  name: getRandomArrayElement(namePool),
});

//Генерируем Фото
const createPhoto = () => ({
  id: counter(),
  url: `photos/${generateUrlId()}.jpg`,
  description: getRandomArrayElement(description),
  likes: getRandomInteger(15, 200),
  comments: Array.from({ length: getRandomInteger(0, 30) }, createComment),
});

const generatePhoto = () => Array.from({ length: 25 }, createPhoto);

export {generatePhoto};
