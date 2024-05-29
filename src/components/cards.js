export {initialCards};

const arhyzImage = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg", import.meta.url);
const chelabinskOblastImage  = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg", import.meta.url);
const ivanovoImage = new  URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg", import.meta.url);
const kamchatkaImage = new  URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg", import.meta.url);
const holmogorImage = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg", import.meta.url);
const baikalImage = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg", import.meta.url);

const initialCards = [
    {
      name: "Архыз",
      link: arhyzImage,
      alt: "Горы в солнечную погоду. Видны остатки снега"
    },
    {
      name: "Челябинская область",
      link: chelabinskOblastImage,
      alt: "Озеро. С одной стороны каменный берег с небольшим количеством снега, с другой в низине - небольшой лес."
    },
    {
      name: "Иваново",
      link: ivanovoImage,
      alt: "Панельные девятиэтажки стаят вплотную друг с другом"
    },
    {
      name: "Камчатка",
      link: kamchatkaImage,
      alt: "Гора посередине с заснеженным хребтом. Вид на гору с подножья горы"
    },
    {
      name: "Холмогорский район",
      link: holmogorImage,
      alt: "Железная дорога разрезает невысокий лес пополам"
    },
    {
      name: "Байкал",
      link: baikalImage,
      alt: "Небольшпя часть скалистого зимнего берега озера Байкал "
    }
];