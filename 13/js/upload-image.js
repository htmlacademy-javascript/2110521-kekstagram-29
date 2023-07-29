import { onSubmit, onMessageClose, clearFormValidation } from'./form-validation.js';
import { createSlider, onPictureEffect, destroySlider } from './photo-effects.js';


const SizeOptions = {
  step: 25,
  max: 100,
  min: 25,
};
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
let currentScale = SizeOptions.max;


const uploadImageInputElement = document.querySelector('#upload-file');
const uploadImageOverlayElement = document.querySelector('.img-upload__overlay');
const uploadImageCloseElement = document.querySelector('.img-upload__cancel');
const scaleControlMinusElement = document.querySelector('.scale__control--smaller');
const scaleControlPlusElement = document.querySelector('.scale__control--bigger');
const scaleControlValueElement = document.querySelector('.scale__control--value');
const textHashtagsElement = document.querySelector('.text__hashtags');
const textDescriptionElement = document.querySelector('.text__description');
const imgUploadPreviewImgElement = document.querySelector('.img-upload__preview img');
const formElement = document.querySelector('#upload-select-image');
const effectsListElement = document.querySelector('.effects__list');

const onModalCloseClick = () => {
  closeModal();
};

const onModalCloseEscape = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    const modalMessage = document.querySelector('.success') || document.querySelector('.error');
    if (modalMessage) {
      onMessageClose(modalMessage);
    } else {
      closeModal();
    }
  }
};

const scaleImg = () => {
  imgUploadPreviewImgElement.style.transform = `scale(${currentScale / SizeOptions.max})`;
  scaleControlValueElement.value = `${currentScale}%`;
};

const resetImgScale = () => {
  currentScale = SizeOptions.max;
  scaleImg();
};

const onPictureIncrease = () => {
  if (currentScale < SizeOptions.max) {
    currentScale += SizeOptions.step;
    scaleImg();
  }
};

const onPictureDecrease = () => {
  if (currentScale > SizeOptions.min) {
    currentScale -= SizeOptions.step;
    scaleImg();
  }
};

const onInputKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

const addModalEventListeneres = () => {
  uploadImageCloseElement.addEventListener('click', onModalCloseClick);
  document.addEventListener('keydown', onModalCloseEscape);
  scaleControlPlusElement.addEventListener('click', onPictureIncrease);
  scaleControlMinusElement.addEventListener('click', onPictureDecrease);
  textHashtagsElement.addEventListener('keydown', onInputKeydown);
  textDescriptionElement.addEventListener('keydown', onInputKeydown);
  formElement.addEventListener('submit', onSubmit);
  effectsListElement.addEventListener('click', onPictureEffect);
};

const removeModalEventListeneres = () => {
  uploadImageCloseElement.removeEventListener('click', onModalCloseClick);
  document.removeEventListener('keydown', onModalCloseEscape);
  scaleControlPlusElement.removeEventListener('click', onPictureIncrease);
  scaleControlMinusElement.removeEventListener('click', onPictureDecrease);
  textHashtagsElement.removeEventListener('keydown', onInputKeydown);
  textDescriptionElement.removeEventListener('keydown', onInputKeydown);
  formElement.removeEventListener('submit', onSubmit);
  effectsListElement.removeEventListener('click', onPictureEffect);
};

const onFileChange = () => {
  uploadImageOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  const file = uploadImageInputElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const uploadedFile = URL.createObjectURL(file);
    imgUploadPreviewImgElement.src = uploadedFile;
    document.querySelectorAll('.effects__preview').forEach((element) => {
      element.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
  }

  resetImgScale();
  addModalEventListeneres();
  createSlider();
};

const uploadImg = () => {
  uploadImageInputElement.addEventListener('change', onFileChange);
};

function closeModal() {
  uploadImageOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  textHashtagsElement.value = '';
  textDescriptionElement.value = '';
  scaleControlValueElement.value = '100%';

  clearFormValidation();
  removeModalEventListeneres();
  destroySlider();
}

export { uploadImg, closeModal }
