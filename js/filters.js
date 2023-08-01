const PICTURES_COUNT = 10;

const FiltersId = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const sortRandomly = () => Math.random() - 0.5;
let pictures = [];
let currentId = FiltersId.DEFAULT;

const sortByComments = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const getFilteredArray = () => {
  switch (currentId) {
    case FiltersId.RANDOM:
      return [...pictures].sort(sortRandomly).slice(0, PICTURES_COUNT);
    case FiltersId.DISCUSSED:
      return [...pictures].sort(sortByComments);
    default:
      return [...pictures];
  }
};

// выбор фильтра и отображения изображений на веб-странице на основе выбранного фильтра
const initializeFilter = (photosArr, callback) => {
  pictures = [...photosArr];
  document.querySelector('.img-filters__form').addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }
    if (evt.target.id === currentId) {
      return;
    }
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    currentId = evt.target.id;
    callback(getFilteredArray());
  });
};

export { initializeFilter };
