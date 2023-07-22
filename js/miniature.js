import {generatePhoto} from './create-photo.js';

const sectionOtherUSers = document.querySelector('.pictures');
const similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const similarPhotos = generatePhoto();
const similarPhotoFragment = document.createDocumentFragment();

similarPhotos.forEach(({url, comments, likes, description}) => {
  const photoElement = similarPhotoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.querySelector('.picture__img').alt = description
  similarPhotoFragment.appendChild(photoElement);
});

sectionOtherUSers.appendChild(similarPhotoFragment);

export {similarPhotos};
