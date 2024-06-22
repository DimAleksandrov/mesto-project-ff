(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-16",headers:{authorization:"94a91796-fbdf-4e14-9e38-9ff505a2733d","Content-Type":"application/json"}};function t(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function n(e,n){return fetch(e,n).then(t)}var r=document.querySelector("#card-template").content;function o(e,t,n,o){var a=r.querySelector(".places__item").cloneNode(!0),c=a.querySelector(".card__image"),i=a.querySelector(".card__title"),u=a.querySelector(".card__delete-button"),l=a.querySelector(".card__like-button"),s=a.querySelector(".card__like-quantity"),d=n.deleteCard,f=n.likedCard,p=n.viewedImage;return c.src=e.link,c.alt=e.name,i.textContent=e.name,s.textContent=e.likes.length,e.owner._id===t?u.classList.remove("delete-button-hidden"):u.classList.add("delete-button-hidden"),e.likes.forEach((function(e){t===e._id&&l.classList.add("card__like-button_is-active")})),u.addEventListener("click",(function(){d(a,e,o)})),l.addEventListener("click",(function(){f(l,s,e,o)})),c.addEventListener("click",(function(){p(c,i)})),a}function a(e){"Escape"===e.key&&i(document.querySelector(".popup_is-opened"))}function c(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",a)}function i(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",a)}function u(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""}function l(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}function s(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector));l(n,e.querySelector(t.submitButtonSelector),t),n.forEach((function(n){u(e,n,t)}))}function d(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранить",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Сохранение...";t.textContent=e?r:n}function f(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранение...";t.preventDefault();var r=t.submitter,o=r.textContent;d(!0,r,o,n),e().then((function(){t.target.reset()})).catch((function(e){console.error("Ошибка: ".concat(e))})).finally((function(){d(!1,r,o)}))}var p={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},m=document.querySelector(".places__list"),v=document.querySelector(".profile__edit-button"),_=document.querySelector(".profile__add-button"),y=document.querySelector(".popup_type_edit"),h=document.querySelector(".popup_type_avatar"),b=document.querySelector(".popup_type_new-card"),S=document.querySelector(".popup_type_image"),g=(document.querySelectorAll(".popup__close"),document.forms.edit_profile),C=document.forms.new_avatar,k=document.forms.new_place,E=g.elements.name,L=g.elements.description,q=C.elements.avatar_link,x=k.elements.place_name,A=k.elements.link,w=document.querySelector(".profile__title"),U=document.querySelector(".profile__description"),O=document.querySelector(".profile__image"),T=document.querySelector(".popup__image"),j=document.querySelector(".popup__caption"),B=Array.from(document.querySelectorAll(".popup"));function I(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var P,N={deleteCard:function(e,t,r){(function(e,t){return n("".concat(t.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:t.headers})})(t._id,r).then((function(){e.remove()})).catch((function(e){console.log(e)}))},likedCard:function(e,t,r,o){e.classList.contains("card__like-button_is-active")?function(e,t,r){return n("".concat(r.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:r.headers})}(r._id,0,o).then((function(n){e.classList.remove("card__like-button_is-active"),t.textContent=n.likes.length})).catch((function(e){console.log(e)})):function(e,t,r,o){return n("".concat(o.baseUrl,"/cards/likes/").concat(r),{method:"PUT",headers:o.headers,body:JSON.stringify(e)})}(r.likes,0,r._id,o).then((function(n){e.classList.add("card__like-button_is-active"),t.textContent=n.likes.length})).catch((function(e){console.log(e)}))},viewedImage:function(e,t){c(S),T.src=e.src,T.alt=e.alt,j.textContent=t.textContent}},J="",M="";Promise.all([n("".concat(e.baseUrl,"/users/me"),{headers:e.headers}),n("".concat(e.baseUrl,"/cards"),{headers:e.headers})]).then((function(t){var n,r,a=(r=2,function(e){if(Array.isArray(e))return e}(n=t)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a,c,i=[],u=!0,l=!1;try{if(a=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=a.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(c=n.return(),Object(c)!==c))return}finally{if(l)throw o}}return i}}(n,r)||function(e,t){if(e){if("string"==typeof e)return I(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?I(e,t):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=a[0],i=a[1];w.textContent=c.name,U.textContent=c.about,O.style.backgroundImage="url(".concat(c.avatar,")"),M=c._id,function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"append";t.forEach((function(t){var r=o(t,M,N,e);m[n](r)}))}(i)})).catch((function(e){console.log("Ошибка. Запрос не выполнен: ",e)})),B.forEach((function(e){e.classList.add("popup_is-animated")})),v.addEventListener("click",(function(){c(y),E.value=w.textContent,L.value=U.textContent,s(y,p)})),O.addEventListener("click",(function(){c(h),C.reset(),s(h,p)})),_.addEventListener("click",(function(){c(b),k.reset(),s(b,p)})),B.forEach((function(e){e.addEventListener("mousedown",(function(t){t.target.classList.contains("popup__close")&&i(e),t.currentTarget===t.target&&i(e)}))})),P=p,Array.from(document.querySelectorAll(P.formSelector)).forEach((function(e){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);l(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?u(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),l(n,r,t)}))}))}(e,P)})),g.addEventListener("submit",(function(t){f((function(){return function(t,r){return n("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:t,about:r})})}(E.value,L.value).then((function(){w.textContent=E.value,U.textContent=L.value})).then((function(){i(y)}))}),t)})),C.addEventListener("submit",(function(t){J=q.value,f((function(){return function(t){return n("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:t})})}(J).then((function(e){O.style.backgroundImage="url(".concat(e.avatar,")"),i(h)}))}),t)})),k.addEventListener("submit",(function(t){f((function(){return function(t,r){return n("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:t.value,link:r.value})})}(x,A).then((function(t){var n=m.firstChild;m.insertBefore(o(t,M,N,e),n),i(b)}))}),t)}))})();