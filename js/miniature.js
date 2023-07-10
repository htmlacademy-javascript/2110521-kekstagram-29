import {generatePhoto} from './create-photo.js';

const sectionOtherUSers = document.querySelector('.pictures');
sectionOtherUSers.querySelector('.picture__title').classList.remove('visually-hidden');

const similarFotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const similarFotos = generatePhoto();
const similarFotoFragment = document.createDocumentFragment();

similarFotos.forEach(({url, comments, likes, description}) => {
  const fotoElement = similarFotoTemplate.cloneNode(true);
  fotoElement.querySelector('.picture__img').src = url;
  fotoElement.querySelector('.picture__comments').textContent = comments.length;
  fotoElement.querySelector('.picture__likes').textContent = likes;
  fotoElement.querySelector('.picture__img').alt = description
  fotoElement.comments = comments;
  similarFotoFragment.appendChild(fotoElement);
});

sectionOtherUSers.appendChild(similarFotoFragment);

export {similarFotos};
