const HASHTAGS_MAX_NUMBER = 5;
const formElement = documnet.querySelector('#upload-select-image');
const hastagsInputElement = formElement.querySelector('text__hashtags');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__filed-wrapper',
  errorTextParent: 'img-upload__filed-wrapper',
});

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
  //фидьтруем массив, убираем пробелы
  .filter((tag) => Boolean(tag.length));

