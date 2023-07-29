import { onError } from './form-validation.js';
import { onModalOpenClick } from './full-screen-pic.js';
import { initializeFilter } from './filters.js';
import { debounce } from './utils.js';

const galleryContainerElement = document.querySelector('.pictures');
const templatePicture = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = ({ id, url, comments, likes, description }) => {
  const thumbnail = templatePicture.cloneNode(true);

  thumbnail.setAttribute('data-id', id);
  thumbnail.querySelector('.picture__img').setAttribute('src', url);
  thumbnail.querySelector('.picture__img').setAttribute('alt', description);
  thumbnail.querySelector('.picture__info').setAttribute('alt', description);
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  return thumbnail;
};

const renderThumbnails = (pictures) => {
  document.querySelectorAll('.picture').forEach((element) => element.remove());
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    fragment.append(thumbnail);
  });

  galleryContainerElement.appendChild(fragment);
};

const onThumbnailsLoaded = (response) => {
  renderThumbnails(response);
  galleryContainerElement.addEventListener('click', (evt) => onModalOpenClick(evt, response));
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  initializeFilter(response, debounce(renderThumbnails));
};

const onThumbnailsLoadedError = () => {
  onError('Упс, что-то пошло не так.');
};

export { onThumbnailsLoaded, onThumbnailsLoadedError };
