import { sendFormData } from './requests.js';
import { closeModal } from './upload-image.js';

const HASHTAGS_MAX_NUMBER = 5;
const formElement = document.querySelector('#upload-select-image');
const descriptionFieldElement = document.querySelector('.text__description');
const hashtagsInputElement = formElement.querySelector('.text__hashtags');
const submitButtonElement = formElement.querySelector('#upload-submit');
const MessageStatuses = {
  SUCCESS: 'success',
  ERROR: 'error',
};
let messageElement;

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const clearFormValidation = () => {
  pristine.reset();
};

const onOutsideMessageClick = (evt) => {
  if (evt.target.classList.contains('success') || evt.target.classList.contains('error')) {
    evt.target.remove();
  }
};

const onModalCloseEscape = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    const modalMessage = document.querySelector('.success');
    if (modalMessage) {
      onMessageClose(modalMessage);
    }
  }
};

const showMessage = (element, text = null) => {
  messageElement = element;
  const modalElement = document.querySelector(`#${element}`).content;
  const message = modalElement.cloneNode(true);
  const messageModalElement = message.querySelector(`.${element}`);
  const buttonElement = messageModalElement.querySelector(`.${element}__button`);
  if (text) {
    const errorTitleElement = messageModalElement.querySelector(`.${element}__title`);
    errorTitleElement.textContent = text;
  }
  document.body.append(message);
  buttonElement.addEventListener('click', onMessageClose);
  messageModalElement.addEventListener('click', onOutsideMessageClick);
  submitButtonElement.disabled = false;
};


const onSuccess = () => {
  showMessage(MessageStatuses.SUCCESS);
  closeModal();
  document.addEventListener('keydown', onModalCloseEscape);
};

// Отоброжаем сообщение об ошибке
const onError = (text = null) => {
  showMessage(MessageStatuses.ERROR, text);
};

function onMessageClose() {
  const messageModalElement = document.querySelector(`.${messageElement}`);
  const buttonElement = messageModalElement.querySelector(`.${messageElement}__button`);

  messageModalElement.remove();
  document.removeEventListener('keydown', onModalCloseEscape);
  buttonElement.removeEventListener('click', onMessageClose);
  messageModalElement.removeEventListener('click', onOutsideMessageClick);
}

//отправляем форму отключаем кнопку
const onSubmit = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    submitButtonElement.disabled = true;
    sendFormData(evt.target, onSuccess, onError);
  }
};

// валидация описания
const validateDescriptionField = (value) => value.length <= 140;


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

export { initValidator, onSubmit, onError, clearFormValidation };
