const SEND_FORM_URL = 'https://29.javascript.pages.academy/kekstagram';
const GET_DATA_URL = 'https://29.javascript.pages.academy/kekstagram/data';

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  throw new Error('Something went wrong');
};

const sendFormData = (formElement, onSuccess, onError) => {
  const formData = new FormData(formElement);

  fetch(SEND_FORM_URL,
    {
      method: 'POST',
      body: formData,
    }
  )
    .then(checkResponse)
    .then(onSuccess)
    .catch(() => onError());
};

const getData = (onSuccess, onError) => {
  fetch(GET_DATA_URL)
    .then(checkResponse)
    .then(onSuccess)
    .catch(onError);
};

export { sendFormData, getData };
