import { onThumbnailsLoaded, onThumbnailsLoadedError } from './miniature.js';
import { initValidator } from'./form-validation.js';
import { uploadImg } from './upload-image.js';
import { getData } from './requests.js';

getData(onThumbnailsLoaded, onThumbnailsLoadedError);
uploadImg();
initValidator();
