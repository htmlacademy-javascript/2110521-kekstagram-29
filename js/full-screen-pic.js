import {similarPhotos} from './miniature.js';

//Контейнер с чужими изображениями
const otherPicContainer = document.querySelector('.pictures');
//Контейнер полноэкранного показа изображения
const fullPictureContainer = document.querySelector('.big-picture');
//Полноэкранное изображение
const fullSizePic = document.querySelector('.big-picture__img img');
//Количество лайков на изображении
const likeCount = document.querySelector('.likes-count');
//Контейнер с количеством комментариев на изображении
const commentCount = fullPictureContainer.querySelector('.social__comment-count');
//Количество комментариев на изображении
const commentsCount = commentCount.querySelector('.comments-count');
//Подпись к изображению
const photoDescription = document.querySelector('.social__caption');
//Кнопка закрытия полноэкранного отображения
const fullPicCancel = fullPictureContainer.querySelector('.big-picture__cancel');
//Кнопка загрузить ещё комментарии
const commentsLoader = fullPictureContainer.querySelector('.comments-loader');
//Контейнер с самими комментариями
const commentsList = fullPictureContainer.querySelector('.social__comments');
//Контейнер одного комментария
const commentTemplate = commentsList.querySelector('.social__comment');
//В переменной хранится массив ещё неотрисованных комментариев выбранной полноразмерной фотографии
let partCommentsArray;

//Добавляю слушатель на контейнер с делегированием
otherPicContainer.addEventListener('click', onPicClick);

// Функция для проверки нажатой ESC и последующего закрытия окна
const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeUserModal();
  }
};

// Функция для закрытия окна по крестику
const onFullPicCancel = () => {
  closeUserModal();
};

// Функция открытия окна
function openUserModal () {
  commentsLoader.addEventListener ('click', (onFiveComments));
  fullPictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  fullPicCancel.addEventListener('click', onFullPicCancel);
  otherPicContainer.removeEventListener('click', onPicClick);
}

// Функция закрытия окна
function closeUserModal () {
  fullPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  fullPicCancel.removeEventListener('click', onFullPicCancel);
  commentsLoader.removeEventListener('click', (onFiveComments));
  otherPicContainer.addEventListener('click', onPicClick);
}

//Функция по отрисовке полноразмерного окна
function onPicClick (evt) {
  if (evt.target.closest('.picture')) {
    const clickPicture = evt.target.closest('.picture');
    //Отрисовываю выбранное изображение и сопутствующую информацию
    fullSizePic.src = clickPicture.querySelector('.picture__img').src;
    likeCount.textContent = clickPicture.querySelector('.picture__likes').textContent;
    commentsCount.textContent = clickPicture.querySelector('.picture__comments').textContent;
    photoDescription.textContent = clickPicture.querySelector('.picture__img').alt;
    commentsList.innerHTML = '';
    partCommentsArray = similarPhotos.find((element) => element.id === +clickPicture.dataset.id).comments.slice(0);
    onFiveComments(partCommentsArray);
    openUserModal();
  }
}

//Функция по добавлению 5 первых комментариев из массива комментариев (используется копия оригинального)
function onFiveComments () {
  const addComments = partCommentsArray.splice(0, 5);
  addComments.forEach((comment) => {
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    commentsList.appendChild(commentElement);
  });
  hideCommentLoader();
  updateCommentCount();
}

//Обновление строки с количеством комментариев + исправление поведения при изначальном 0 комментариев
function updateCommentCount () {
  if (+commentsCount.textContent > 0) {
    commentCount.innerHTML = `${commentsList.querySelectorAll('.social__comment').length} из ${commentsCount.textContent} комментариев`;
  } else {
    commentCount.innerHTML = '0 из 0 комментариев';
  }
}

//Убираю/добавляю кнопку загрузить ещё, если комментарии кончились
function hideCommentLoader () {
  if (partCommentsArray.length === 0) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
}
