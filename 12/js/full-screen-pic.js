const SHOW_COMMENTS = 5;
let shownComments = 0;
let comments;

const bigPictureElement = document.querySelector('.big-picture');
const closeBtnElement = document.querySelector('.big-picture__cancel');
const templateCommentElement = document.querySelector('#comment').content;
const bigPictureImgElement = document.querySelector('.big-picture__img img');
const bigPictureLikesElement = document.querySelector('.likes-count');
const bigPictureCommentsNumberElement = document.querySelector('.comments-count');
const bigPictureDescriptionElement = document.querySelector('.social__caption');
const bigPictureCommentsElement = document.querySelector('.social__comments');
const allCommentsNumberElement = document.querySelector('.social__comment-count');
const commentLoaderBtnElement = document.querySelector('.comments-loader');

const createComment = ({avatar, message, name}) => {
  const comment = templateCommentElement.cloneNode(true);

  comment.querySelector('.social__comment img').setAttribute('src', avatar);
  comment.querySelector('.social__comment img').setAttribute('alt', name);
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const onRenderCommentsClick = () => {
  const fragment = document.createDocumentFragment();
  const lastIndex = shownComments + SHOW_COMMENTS;
  const slicedArr = comments.slice(shownComments, lastIndex);
  shownComments = comments.slice(0, lastIndex).length;
  slicedArr.forEach((elem) => {
    const comment = createComment(elem);
    fragment.append(comment);
  });
  bigPictureCommentsElement.append(fragment);
  allCommentsNumberElement.innerHTML = `${shownComments} из <span class="comment-count">${comments.length}</span> комментариев`;

  if (shownComments === comments.length) {
    commentLoaderBtnElement.classList.add('hidden');
  }
};

const getComments = (pictures, currentThumbnail) => {
  const thumbnailId = currentThumbnail.getAttribute('data-id');
  return pictures.find((element) => element.id === Number(thumbnailId)).comments;
};

const initComments = (currentThumbnail) => {
  const thumbnailCommentsNumber = currentThumbnail.querySelector('.picture__comments');
  bigPictureCommentsNumberElement.textContent = thumbnailCommentsNumber.textContent;
  bigPictureCommentsElement.textContent = '';

  commentLoaderBtnElement.classList.remove('hidden');
  shownComments = 0;

  onRenderCommentsClick();
};

const processThumbnail = (currentThumbnail) => {
  const thumbnailLikes = currentThumbnail.querySelector('.picture__likes');
  const thumbnailDescription = currentThumbnail.querySelector('.picture__info');
  bigPictureImgElement.src = currentThumbnail.querySelector('.picture__img').src;
  bigPictureDescriptionElement.textContent = thumbnailDescription.getAttribute('alt');
  bigPictureLikesElement.textContent = thumbnailLikes.textContent;
};

const onModalCloseClick = () => {
  closeModal();
};

const onModalCloseEscape = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeModal();
  }
};

const initModalEventListeneres = () => {
  document.addEventListener('keydown', onModalCloseEscape);
  commentLoaderBtnElement.addEventListener('click', onRenderCommentsClick);
  closeBtnElement.addEventListener('click', onModalCloseClick);
};

const removeModalEventListeneres = () => {
  document.removeEventListener('keydown', onModalCloseEscape);
  commentLoaderBtnElement.removeEventListener('click', onRenderCommentsClick);
  closeBtnElement.removeEventListener('click', onModalCloseClick);
};

function closeModal() {
  document.body.classList.remove('modal-open');
  bigPictureElement.classList.add('hidden');

  removeModalEventListeneres();
}

const onModalOpenClick = (evt, pictures) => {
  if (evt.target.closest('.picture')) {
    evt.preventDefault();
    bigPictureElement.classList.remove('hidden');
    document.body.classList.add('modal-open');

    const currentThumbnail = evt.target.closest('.picture');
    comments = getComments(pictures, currentThumbnail);

    processThumbnail(currentThumbnail);
    initComments(currentThumbnail);

    initModalEventListeneres();
  }
};

export { onModalOpenClick };
