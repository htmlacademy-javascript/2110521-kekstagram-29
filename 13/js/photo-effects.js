const EFFECTS = [
  {
    name: 'chrome',
    minValue: 0,
    maxValue: 1,
    step: 0.1,
    filter: 'grayscale',
    measure: '',
  },
  {
    name: 'sepia',
    minValue: 0,
    maxValue: 1,
    step: 0.1,
    filter: 'sepia',
    measure: '',
  },
  {
    name: 'marvin',
    minValue: 0,
    maxValue: 100,
    step: 1,
    filter: 'invert',
    measure: '%',
  },
  {
    name: 'phobos',
    minValue: 0,
    maxValue: 3,
    step: 0.1,
    filter: 'blur',
    measure: 'px',
  },
  {
    name: 'heat',
    minValue: 1,
    maxValue: 3,
    step: 0.1,
    filter: 'brightness',
    measure: '',
  }
];

const imgUploadPreviewImgElement = document.querySelector('.img-upload__preview img');
const imgUploadEffectLevelElement = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');
let effect;

// получаем значение ползунка
const onSliderValueUpdate = () => {
  if (effect) {
    const sliderValue = sliderElement.noUiSlider.get();
    // как работает computedStyleMap
    imgUploadPreviewImgElement.style.filter = `${effect.filter}(${sliderValue}${effect.measure})`;
    effectLevelValueElement.value = parseFloat(sliderValue).toFixed(2);
  }
};

// создаем слайдер
const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: EFFECTS[0].minValue,
      max: EFFECTS[0].maxValue,
    },
    start: EFFECTS[0].maxValue,
    step: EFFECTS[0].step
  });

  imgUploadEffectLevelElement.classList.add('hidden');
  //устанавливается обработчик события 'update' для слайдера
  sliderElement.noUiSlider.on('update', onSliderValueUpdate);
  imgUploadPreviewImgElement.style.filter = 'none';
};

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: effect.minValue,
      max: effect.maxValue,
    },
    start: effect.maxValue,
    step: effect.step
  });
};

const onPictureEffect = (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    const effectValue = evt.target.value;
    if (evt.target.value === 'none') {
      imgUploadEffectLevelElement.classList.add('hidden');
      imgUploadPreviewImgElement.style.filter = 'none';
      effectLevelValueElement.value = '';
      effect = null;
    } else {
      imgUploadEffectLevelElement.classList.remove('hidden');
      effect = EFFECTS.find((element) => element.name === effectValue);
      updateSlider();
    }
  }
};

const destroySlider = () => {
  const originalEffectElement = document.querySelector('#effect-none');
  originalEffectElement.checked = true;
  sliderElement.noUiSlider.destroy();
  effect = null;
};

export { createSlider, onPictureEffect, destroySlider };
