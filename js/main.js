const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;


/* const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}; */

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

// Вспомогательные функции
const generatePhotoId = getRandomInteger(0, 25);
const generateMessageId = getRandomInteger(1, 100); // Как сделать так чтоб случайное число не повторялось

// Генератор рандомного индекса
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

//Генерируем сообщение
const generateMessage = () => {
  const message = [];
  while (message.length < getRandomInteger(0, 1)) {
    message.push(getRandomArrayElement(messagePool));
  }
  return message;
};

//Генерируем коммент
const createComment = () => ({
  id: generateMessageId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: generateMessage(),
  name: getRandomArrayElement(namePool),
});

//Генерируем Фото
const createPhoto = () => ({
  id: generatePhotoId(),
  url: `photos/${getRandomInteger(1, 25)}.jpg`,
  description: getRandomArrayElement(description),
  likes: getRandomInteger(15, 200),
  comment: Array.from({ length: getRandomInteger(0, 30) }, createComment),
});

const generatePhoto = Array.from({ length: 25 }, createPhoto);
