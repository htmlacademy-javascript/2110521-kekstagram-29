import { onError } from './form-validation.js';

const picturesContainerElement = document.querySelector('.pictures');
const templatePicture = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = ({ id, url, comments, likes, description }) => {
  const thumbnail = templatePicture.cloneNode(true);

  thumbnail.setAttribute('data-id', id);
  thumbnail.querySelector('.picture__img').setAttribute('src', url);
  thumbnail.querySelector('.picture__info').setAttribute('alt', description);
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  return thumbnail;
};

const renderThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    fragment.append(thumbnail);
  });

  picturesContainerElement.appendChild(fragment);
  //picturesContainerElement.addEventListener('click', (evt) => onModalOpenClick(evt, pictures));
};

const onThumbnailsLoaded = (response) => {
  renderThumbnails(response);
};

const onThumbnailsLoadedError = () => {
  onError('Упс, что-то пошло не так.');
};

export { onThumbnailsLoaded, onThumbnailsLoadedError };
