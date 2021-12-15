import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const refs = {
    gallery: document.querySelector(".js-gallery"),
    lightbox: document.querySelector(".js-lightbox"),
    btnClose: document.querySelector('button[data-action="close-lightbox"]'),
    lightboxImage: document.querySelector(".lightbox__image"),
    lightboxOgverlay: document.querySelector(".lightbox__overlay"),
};


// Сделай такую же галерею как в первом задании, но используя 
// библиотеку SimpleLightbox, которая возьмет на себя обработку кликов 
// по изображениям, открытие и закрытие модального окна, 
// а также пролистывание изображений при помощи клавиатуры.

// Посмотри демо видео работы галереи с подключенной библиотекой.

// Необходимо немного изменить разметку карточки галереи, используй этот шаблон.

// <a class="gallery__item" href="large-image.jpg">
//   <img class="gallery__image" src="small-image.jpg" alt="Image description" />
// </a>
const imgMarkup = new Array(imgCount)
  .fill(0)
  .map((_, i) => {
    return `
    <a
      class="gallery__link"
      href=${galleryItems [i].original}
    >
      <img
        class="gallery__image"
        src=${galleryItems[i].preview}
        alt=${galleryItems[i].description}
      />
    </a>
  `;
  }).join("");
    
// // рендер разметки в DOM
refs.gallery.innerHTML = imgMarkup;

 // делегируем нажатия на элементах галереи
refs.gallery.addEventListener("click", handlerClick);
refs.gallery.addEventListener("keydown", _.throttle(closeModal, 300));

// обработчик событий
function handlerClick(e) {
  if (e.target.nodeName !== "IMG") return;
  e.preventDefault();
  openModal(e.target);
}

// открыть модалку
function openModal(e) {
  refs.lightbox.on("show.simpleLightbox");

  addModalListener();
}

var lightbox = new SimpleLightbox(".js-gallery a", {
    captionsData: "alt",
    captionsDelay: 250,
    navText: ["<", ">"],
    widthRatio: 0.9,
    heightRatio: 1,
    fadeSpeed:300,
}).on("show.simpleLigthbox")

// Выполняй это задание в файлах 02-lightbox.html и 02-lightbox.js. Разбей его на несколько подзадач:

//    Создание и рендер разметки по массиву данных galleryItems и 
// предоставленному шаблону элемента галереи.
// Используй готовый код из первого задания.

//    Подключение скрипта и стилей библиотеки используя CDN сервис cdnjs.
// Необходимо добавить ссылки на два файла: simple - lightbox.min.js и 
// simple - lightbox.min.css.
//    Инициализация библиотеки после того как элементы галереи созданы и 
// добавлены в div.gallery.Для этого ознакомься с документацией 
// SimpleLightbox - в первую очередь секции «Usage» и «Markup».
//    Посмотри в документации секцию «Options» и добавь отображение подписей 
// к изображениям из атрибута alt.Пусть подпись будет снизу и 
// появляется через 250 миллисекунд после открытия изображения.