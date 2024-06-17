export {config, getUserInformation, getCards, loadData, createNewCard, editProfil, editAvatar,
        deleteCardOnServer, addLikeOnServer, deleteLikeOnServer, 
        // checkImagelink
};

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-16',
  headers: {
      authorization: '94a91796-fbdf-4e14-9e38-9ff505a2733d',
      'Content-Type': 'application/json',
  }
}

function handleError(err) {
  // обрабатываем ошибку
  console.log(err);
}

function handleResponse(response) {
  // обрабатываем ответ сервера
  if (response.ok) {
    return response.json();
  }
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${response.status}`);
}

const getUserInformation = new Promise((resolve) => {
  return fetch(`${config.baseUrl}/users/me`, {
          headers: config.headers, 
      })
      .then(handleResponse)
      .then((result) => {
          resolve(result);
      })
      .catch (handleError)
})

const getCards = new Promise((resolve) => {
  return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
    })
      .then(handleResponse)
      .then((result) => {
          resolve(result);
      })
      .catch(handleError)
})

function loadData() {
  return Promise.all([getUserInformation, getCards])
  //.then(handleResponse)
  .catch(handleError)
}


function editProfil(profileTitle, profileDescription) {
  return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
          name: profileTitle.textContent,
          about: profileDescription.textContent
      })
  })
  .then(handleResponse)
  .catch(handleError)
};


function createNewCard(placeNameInput, linkInput) {
  return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
          name: placeNameInput.value,
          link: linkInput.value,
      })
  })
  .then(handleResponse)
  .catch(handleError)
}

// function checkImagelink(profilImageLink) {
//   return fetch(`${profilImageLink}`, {
//       method: 'HEAD',
//       headers: {
//         "Content-Type": "image/jpeg",
//       }
//   })
//   .then(handleResponse)
//   .catch(handleError)
// };

function editAvatar(profilImageLink) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
          avatar: profilImageLink
      })
  })
  .then(handleResponse)
  .catch(handleError)
};

function deleteCardOnServer(cardId, config) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(handleResponse)
  .catch(handleError)
}

//PUT https://nomoreparties.co/v1/cohortId/cards/likes/cardId
function addLikeOnServer(likeArr, likeQunt, cardId, config) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
    body: JSON.stringify(likeArr)
  })
  .then(handleResponse)
  .catch(handleError)
}

//DELETE https://nomoreparties.co/v1/cohortId/cards/likes/cardId
function deleteLikeOnServer(cardId, likeQunt, config) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(handleResponse)
  .catch(handleError)
}