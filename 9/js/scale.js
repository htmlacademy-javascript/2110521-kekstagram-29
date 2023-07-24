const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DIVIDER = 100;

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

let currentScale = MAX_SCALE;

const changeScale = (value) => {
  imgUploadPreview.style.transform = `scale(${value / DIVIDER})`;
  scaleControlValue.value = `${value}%`;
};

const scaleControlSmallerClickHandler = (evt) => {
  evt.preventDefault();
  if (currentScale > MIN_SCALE) {
    currentScale -= SCALE_STEP;
    changeScale(currentScale);
  }
};

const scaleControlBiggerClickHandler = (evt) => {
  evt.preventDefault();
  if (currentScale < MAX_SCALE) {
    currentScale += SCALE_STEP;
    changeScale(currentScale);
  }
};

const initScale = () => {
  scaleControlSmaller.addEventListener('click', scaleControlSmallerClickHandler);
  scaleControlBigger.addEventListener('click', scaleControlBiggerClickHandler);
};

const resetScale = () => {
  currentScale = MAX_SCALE;
  changeScale(MAX_SCALE);
};

export { initScale, resetScale };
