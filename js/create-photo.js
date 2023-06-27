import {getRandomInteger, getRandomArrayElement} from './util.js';

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

// Генератор рандомного индекса
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Counter
function makeCounter() {
  let currentCount = 0;
  return () => {
    currentCount += 1;
    return currentCount;
  };
}
let counter = makeCounter();

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
  url: `photos/${getRandomInteger(1, 25)}.jpg`,
  description: getRandomArrayElement(description),
  likes: getRandomInteger(15, 200),
  comment: Array.from({ length: getRandomInteger(0, 30) }, createComment),
});

const generatePhoto = Array.from({ length: 25 }, createPhoto);
