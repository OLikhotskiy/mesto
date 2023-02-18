(()=>{"use strict";class e{static selectors={pic:".element__picture",title:".element__title",like:".element__like",likeActive:"element__like_active",likeNumber:".element__likes-number",trash:".element__trash",trashHide:"element__trash_hide",element:".element",caption:".popup__image-caption",big:".popup__big-pic"};constructor(e,t,s,i,{handleCardDelete:r,handleCardLike:n}){this._card=e,this._name=e.name,this._link=e.link,this._userId=t,this._likesActive=e.likes,this._templateSelector=s,this._handleCardClick=i,this._handleCardDelete=r,this._handleCardLike=n}_getTemplate(){return document.querySelector(this._templateSelector).content.querySelector(e.selectors.element).cloneNode(!0)}generateCard(){return this._element=this._getTemplate(),this._cardPic=this._element.querySelector(e.selectors.pic),this._cardLike=this._element.querySelector(e.selectors.like),this._cardTitle=this._element.querySelector(e.selectors.title),this._cardTrash=this._element.querySelector(e.selectors.trash),this._cardPic.src=this._link,this._cardPic.alt=this._name,this._cardTitle.textContent=this._name,this._hangEventListeners(),this._card.owner._id!==this._userId&&this._element.querySelector(e.selectors.trash).classList.add(e.selectors.trashHide),this._likesNumber(),this.isLiked(),this._element}deleteCard=()=>{this._element.remove()};_likesNumber(){this._element.querySelector(e.selectors.likeNumber).textContent=this._likesActive.length}addLikes(e){this._likesActive=e,this.isLiked(),this._likesNumber()}_deleteLikes(){return this._likesActive.some((e=>e._id===this._userId))}isLiked(){if(this._deleteLikes())return this._cardLike.classList.add(e.selectors.likeActive),!0;this._cardLike.classList.remove(e.selectors.likeActive)}_hangEventListeners(){this._cardLike.addEventListener("click",(()=>{this._handleCardLike(this._card)})),this._cardTrash.addEventListener("click",(()=>{this._handleCardDelete(this._card)})),this._cardPic.addEventListener("click",(()=>this._handleCardClick(this._name,this._link)))}}const t={inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};class s{constructor(e,t){this._inputSelector=e.inputSelector,this._buttonSubmitSelector=e.submitButtonSelector,this._inactiveButtonClass=e.inactiveButtonClass,this._inputErrorClass=e.inputErrorClass,this._errorClass=e.errorClass,this._form=t,this._inputList=Array.from(this._form.querySelectorAll(this._inputSelector)),this._buttonSubmit=this._form.querySelector(this._buttonSubmitSelector)}_checkInputValidity=e=>{const t=this._form.querySelector(`#${e.id}-error`);e.validity.valid?this._hideError(e,t):this._showError(e,t)};_hideError(e,t){t.textContent="",t.classList.remove(this._errorClass),e.classList.remove(this._inputErrorClass)}_showError(e,t){t.textContent=e.validationMessage,t.classList.add(this._errorClass),e.classList.add(this._inputErrorClass)}toggleSubmitButtonState=()=>{this._inputList.every((e=>e.validity.valid))?(this._buttonSubmit.classList.remove(this._inactiveButtonClass),this._buttonSubmit.disabled=!1):(this._buttonSubmit.classList.add(this._inactiveButtonClass),this._buttonSubmit.disabled=!0)};_hangEventListener=()=>{this._inputList.forEach((e=>{e.addEventListener("input",(()=>{this._checkInputValidity(e),this.toggleSubmitButtonState()}))}))};enableValidation=()=>{this._hangEventListener()};resetValidation=()=>{this._inputList.forEach((e=>{const t=this._form.querySelector(`#${e.id}-error`);this._hideError(e,t)})),this.toggleSubmitButtonState()}}class i{constructor(e){this._popup=document.querySelector(e)}open(){this._popup.classList.add("popup_is-open"),document.addEventListener("keyup",this._handleEscClose)}close(){this._popup.classList.remove("popup_is-open"),document.removeEventListener("keyup",this._handleEscClose)}_handleEscClose=e=>{"Escape"===e.key&&this.close()};setEventListeners(){this._popup.addEventListener("click",(e=>{e.target.closest(".popup__overlay")&&!e.target.classList.contains("popup__close")||this.close()}))}handleProcessing(e,t){this._popup.querySelector(".button_submit").textContent=`${t}`}}class r extends i{constructor(e,t){super(e),this._handleSubmit=t,this._form=this._popup.querySelector(".popup__form"),this._inputs=Array.from(this._form.querySelectorAll(".popup__input"))}_getInputValues(){const e={};return this._inputs.forEach((t=>{const s=t.name,i=t.value;e[s]=i})),e}setEventListeners(){super.setEventListeners(),this._form.addEventListener("submit",(e=>{e.preventDefault(),this._handleSubmit(this._getInputValues())}))}close(){super.close(),this._form.reset()}}const n=document.querySelector(".profile__edit"),o=document.querySelector(".popup_type_profile-edit"),a=document.querySelector(".popup__input_type_name"),l=document.querySelector(".popup__input_type_about"),c=document.querySelector(".profile__add"),h=document.querySelector(".popup_type_add"),_=document.querySelector("#update-avatar-form"),d=document.querySelector(".profile__avatar-container"),u=new class{constructor({name:e,about:t,avatar:s}){this._name=document.querySelector(e),this._about=document.querySelector(t),this._avatar=document.querySelector(s),this._userId=null}getUserInfo(){return{name:this._name.textContent,about:this._about.textContent,avatar:this._avatar.src}}getUserId(){return this._userId}setUserInfo(e){this._name.textContent=e.name,this._about.textContent=e.about,this._avatar.src=e.avatar,this._userId=e._id}}({name:".profile__name",about:".profile__about",avatar:".profile__avatar"}),p=new class extends i{constructor(e){super(e),this._popupImage=this._popup.querySelector(".popup__big-pic"),this._popupImageCaption=this._popup.querySelector(".popup__image-caption")}open(e,t){this._popupImageCaption.textContent=e,this._popupImage.alt=e,this._popupImage.src=t,super.open()}}(".popup_type_image"),m=new r(".popup_type_add",(function(e){m.handleProcessing(!0,"Создание..."),y.addCard(e).then((e=>e.json())).then((e=>{C(e),m.close()})).catch((e=>console.log(e))).finally((()=>m.handleProcessing(!1,"Создать")))})),b=new r(".popup_type_profile-edit",(function(e){b.handleProcessing(!0,"Сохранение..."),y.setUserInfo(e).then((e=>e.json())).then((e=>{u.setUserInfo(e),b.close()})).catch((e=>console.log(e))).finally((()=>b.handleProcessing(!0,"Сохранить")))})),v=new r(".popup_update_avatar",(function(e){v.handleProcessing(!0,"Сохранение..."),y.changeAvatar(e.link).then((e=>{u.setUserInfo(e),v.close()})).catch((e=>console.log(e))).finally((()=>v.handleProcessing(!1,"Сохранить")))})),k=new class extends i{constructor(e){super(e),this._popup=document.querySelector(e)}open(){super.open()}handleSubmit(e){this._handleSubmit=e}setEventListeners(){super.setEventListeners(),this._popup.addEventListener("submit",(e=>{e.preventDefault(),this._handleSubmit()}))}}(".popup_del_card"),f=new s(t,o),S=new s(t,h),L=new s(t,_),g=new class{constructor(e,t,s){this._items=e,this._renderer=t,this._container=document.querySelector(s)}renderItems=e=>{e.forEach((e=>{this._renderer(e)}))};addItem=e=>{this._container.append(e)}}(C,".elements"),y=new class{constructor({baseUrl:e,headers:t}){this._baseUrl=e,this._headers=t}getInitialCards(){return fetch(`${this._baseUrl}/cards/`,{headers:this._headers}).then((e=>e.ok?e.json():Promise.reject(`Ошибка: ${e.status}`)))}addCard(e){return fetch(`${this._baseUrl}/cards/`,{method:"POST",headers:this._headers,body:JSON.stringify({name:e.name,link:e.link})})}deleteCard(e){return fetch(`${this._baseUrl}/cards/${e}`,{method:"DELETE",headers:this._headers}).then((e=>e.ok?e.json():Promise.reject())).catch((e=>console.log(e)))}getUserInfo(){return fetch(`${this._baseUrl}/users/me/`,{headers:this._headers}).then((e=>e.ok?e.json():Promise.reject(`Ошибка: ${e.status}`)))}setUserInfo(e){return fetch(`${this._baseUrl}/users/me/`,{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e.name,about:e.about})})}changeAvatar(e){return fetch(`${this._baseUrl}/users/me/avatar`,{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})}).then((e=>e.ok?e.json():Promise.reject(`Ошибка: ${e.status}. Проверьте путь к изображению`)))}like(e){return fetch(`${this._baseUrl}/cards/${e}/likes`,{method:"PUT",headers:this._headers}).then((e=>e.ok?e.json():Promise.reject()))}deleteLike(e){return fetch(`${this._baseUrl}/cards/${e}/likes`,{method:"DELETE",headers:this._headers}).then((e=>e.ok?e.json():Promise.reject()))}}({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-59",headers:{authorization:"2785cf20-4641-41b7-b993-5f3d50ff39ad","Content-Type":"application/json"}});function C(e){g.addItem(E(e))}Promise.all([y.getUserInfo(),y.getInitialCards()]).then((([e,t])=>{u.setUserInfo(e),g.renderItems(t)})).catch((e=>console.log(e)));const E=t=>{const s=new e(t,u.getUserId(),"#element-template",I,{handleCardDelete:()=>{k.open(),k.handleSubmit((()=>{k.handleProcessing(!0,"Удаление..."),y.deleteCard(t._id).then((()=>{s.deleteCard(),k.close()})).catch((e=>console.log(e))).finally((()=>{k.handleProcessing(!0,"Да")}))}))},handleCardLike:e=>{!0!==s.isLiked()?y.like(e._id).then((e=>{s.addLikes(e.likes)})).catch((e=>console.log(e))):y.deleteLike(e._id).then((e=>{s.addLikes(e.likes)})).catch((e=>console.log(e)))}});return s.generateCard()};function I(e,t){p.open(e,t)}L.enableValidation(),f.enableValidation(),S.enableValidation(),b.setEventListeners(),m.setEventListeners(),k.setEventListeners(),p.setEventListeners(),v.setEventListeners(),c.addEventListener("click",(function(){S.resetValidation(),m.open()})),n.addEventListener("click",(function(){const{name:e,about:t}=u.getUserInfo();a.value=e,l.value=t,f.resetValidation(),b.open()})),d.addEventListener("click",(function(){L.resetValidation(),v.open()}))})();