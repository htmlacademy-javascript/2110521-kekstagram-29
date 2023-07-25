const HASHTAGS_MAX_NUMBER = 5;
const formElement = document.querySelector('#upload-select-image');
const descriptionFieldElement = document.querySelector('.text__description');
const hashtagsInputElement = formElement.querySelector('.text__hashtags');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const validateDescriptionField = (value) => {
  return value.length <= 140
}
const onSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    formElement.submit();
  }
};

const normalizeTags = (value) => value
  .trim()
  .split(' ')
  //фильтруем массив, убираем пробелы
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
}

export { initValidator, onSubmit };
