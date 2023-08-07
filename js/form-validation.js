import { sendFormData } from './requests.js';
import { closeModal } from './upload-image.js';

const HASHTAGS_MAX_NUMBER = 5;
const formElement = document.querySelector('#upload-select-image');
const descriptionFieldElement = document.querySelector('.text__description');
const hashtagsInputElement = formElement.querySelector('.text__hashtags');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const onMessageClose = (modalMessage) => {
  modalMessage.remove();
};

const onOutsideMessageClick = (evt) => {
  if (evt.target.classList.contains('success') || evt.target.classList.contains('error')) {
    evt.target.remove();
  }
};

const onSuccess = () => {
  const successModalElement = document.querySelector('#success').content;
  const successMessage = successModalElement.cloneNode(true);
  const successMessageModalElement = successMessage.querySelector('.success');
  const successButtonElement = successMessageModalElement.querySelector('.success__button');
  document.body.append(successMessage);
  successButtonElement.addEventListener('click', () => onMessageClose(successMessageModalElement));
  successMessageModalElement.addEventListener('click', onOutsideMessageClick);
  closeModal();
};

const onError = (text = null) => {
  const errorModalElement = document.querySelector('#error').content;
  const errorMessage = errorModalElement.cloneNode(true);
  const errorMessageModalElement = errorMessage.querySelector('.error');
  const errorButtonElement = errorMessageModalElement.querySelector('.error__button');
  if (text) {
    const errorTitleElement = errorMessageModalElement.querySelector('.error__title');
    errorTitleElement.textContent = text;
  }
  document.body.append(errorMessage);
  errorButtonElement.addEventListener('click', () => onMessageClose(errorMessageModalElement));
  errorMessageModalElement.addEventListener('click', onOutsideMessageClick);
};

const descriptionMaxLength = 140;

// валидация описания
const validateDescriptionField = (value) => value.length <= descriptionMaxLength;

const onSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    sendFormData(evt.target, onSuccess, onError);
  }
};

const normalizeTags = (value) => value
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));

const validateUniqueHashtags = (value) => {
  const hashtags = normalizeTags(value);
  // находим все уникальные хештеги
  const uniqueHashtags = new Set(hashtags.map((hashtag) => hashtag.toLowerCase()));
  // производим проверку
  return hashtags.length === uniqueHashtags.size;
};

const validateRegexpHashtags = (value) => {
  const hashtags = normalizeTags(value);
  const hashtagRegexp = /^#[a-zа-яё0-9]{1,19}$/i;
  return hashtags.find((hashtag) => !hashtagRegexp.test(hashtag)) === undefined;
};

const validateHashtagsNumber = (value) => {
  const hashtags = normalizeTags(value);
  return hashtags.length <= HASHTAGS_MAX_NUMBER;
};
const initValidator = () => {
  pristine.addValidator(
    hashtagsInputElement,
    validateRegexpHashtags,
    'введён невалидный хэш-тег'
  );

  pristine.addValidator(
    hashtagsInputElement,
    validateUniqueHashtags,
    'хэш-теги повторяются'
  );

  pristine.addValidator(
    hashtagsInputElement,
    validateHashtagsNumber,
    'превышено количество хэш-тегов'
  );

  pristine.addValidator(
    descriptionFieldElement,
    validateDescriptionField,
    'длина комментария не может составлять больше 140 символов'
  );
};

export { initValidator, onSubmit, onError };
