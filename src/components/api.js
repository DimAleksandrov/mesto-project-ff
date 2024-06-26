const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-16',
  headers: {
      authorization: '94a91796-fbdf-4e14-9e38-9ff505a2733d',
      'Content-Type': 'application/json'
  }
}

function handleResponse(response) {
  // обрабатываем ответ сервера
  if (response.ok) {
    return response.json();
  }
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${response.status}`);
}

function request(url, options) {
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(url, options).then(handleResponse)
}

const getUserInformation = (() => {
  return request(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
})

const getCards = (() => {
  return request(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
})

function loadData() {
  return Promise.all([getUserInformation(), getCards()])
}


function editProfil(profileTitle, profileDescription) {
  return request(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
          name: profileTitle,
          about: profileDescription
      })
  })
};


function createNewCard(placeNameInput, linkInput) {
  return request(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
          name: placeNameInput.value,
          link: linkInput.value,
      })
  })
}

function editAvatar(profilImageLink) {
  return request(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
          avatar: profilImageLink
      })
  })
};

function deleteCardOnServer(cardId, config) {
  return request(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
}

//PUT https://nomoreparties.co/v1/cohortId/cards/likes/cardId
function addLikeOnServer(likeArr, likeQunt, cardId, config) {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
    body: JSON.stringify(likeArr)
  })
}

//DELETE https://nomoreparties.co/v1/cohortId/cards/likes/cardId
function deleteLikeOnServer(cardId, likeQunt, config) {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
}

export {
  config, getUserInformation, getCards, loadData, createNewCard, editProfil, editAvatar,
  deleteCardOnServer, addLikeOnServer, deleteLikeOnServer, 
};