// Выполняй это задание в файлах 01-gallery.html и 01-gallery.js. Разбей его на несколько подзадач:

// Создание и рендер разметки по массиву данных galleryItems и предоставленному шаблону элемента галереи.
// Реализация делегирования на div.gallery и получение url большого изображения.
// Подключение скрипта и стилей библиотеки модального окна basicLightbox. Используй CDN сервис jsdelivr и добавь в проект ссылки на минифицированные (.min) файлы библиотеки.
// Открытие модального окна по клику на элементе галереи. Для этого ознакомься с документацией и примерами.
// Замена значения атрибута src элемента <img> в модальном окне перед открытием. Используй готовую разметку модального окна с изображением из примеров библиотеки basicLightbox.

// import { galleryItems } from './gallery-items.js';
// import * as galleryItems from './gallery-items.js';
// Change code below this line

// console.log(galleryItems);

// const addGallery = document.querySelector('.gallery');

// // const addLink = document.createElement("a");
// addLink.classList = "gallery-link";
// addLink.href = "large-image.jpg"

// // const addImg = document.createElement("img");
// addImg.classList = "gallery__image"
// addImg.src = "small-image.jpg";
// addImg.data.source = "large-image.jpg";
// addImg.alt = "Image description";

// addLink.appendChild(addImg);

// addGallery.appendChild(addLink);
// Разметка элемента галереи
// Ссылка на оригинальное изображение должна храниться в data-атрибуте source на элементе <img>, и указываться в href ссылки. Не добавляй другие HTML теги или CSS классы кроме тех, что есть в этом шаблоне.

// <div class="gallery__item">
//   <a class="gallery__link" href="large-image.jpg">
//     <img
//       class="gallery__image"
//       src="small-image.jpg"
//       data-source="large-image.jpg"
//       alt="Image description"
//     />
//   </a>
// </div>

// Обрати внимание на то, что изображение обернуто в ссылку, а значит при клике по умолчанию пользователь будет перенаправлен на другую страницу. Запрети это поведение по умолчанию.

// получить картинки
import { galleryItems } from './gallery-items.js';
// console.log(galleryItems);
// количество картинок
const imgCount = galleryItems.length;
// ссылки на элементы HTML
const refs = {
    gallery: document.querySelector(".js-gallery"),
    lightbox: document.querySelector(".js-lightbox"),
    btnClose: document.querySelector('button[data-action="close-lightbox"]'),
    lightboxImage: document.querySelector(".lightbox__image"),
    lightboxOgverlay: document.querySelector(".lightbox__overlay"),
};

// console.log(refs.gallery);

// сформировать массив шаблонных строк с разметкой согласно шаблона
const imgMarkup = new Array(imgCount)
  .fill(0)
  .map((_, i) => {
    return `
    <li class="gallery__item">
    <a
      class="gallery__link"
      href=${galleryItems [i].original}
    >
      <img
        class="gallery__image"
        src=${galleryItems[i].preview}
        data-source=${galleryItems[i].original}
        alt=${galleryItems[i].description}
      />
    </a>
  </li>
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
  refs.lightbox.classList.add("is-open");

  uploadPictures(e.dataset.source, e.alt);
  addModalListener();
}

// слушать события в модалке
function addModalListener() {
  refs.btnClose.addEventListener("click", closeModal);
  refs.lightboxOgverlay.addEventListener("click", closeModal);
}

// убрать прослушку с модалки
function removeModalListener() {
  refs.btnClose.removeEventListener("click", closeModal);
  refs.lightboxOgverlay.removeEventListener("click", closeModal);
}

// загрузить картинку
function uploadPictures(src, alt) {
  refs.lightboxImage.src = src;
  refs.lightboxImage.alt = alt;
}
// закрыть модалку
function closeModal(e) {
  const triggers = [
    "Escape",
    "ArrowRight",
    "ArrowLeft",
    "lightbox__button",
    "lightbox__overlay",
  ];
  if (!triggers.includes(e.key || e.target.className)) return;
  if (e.key === "ArrowRight" || e.key === "ArrowLeft") return leafOver(e.key);

    refs.lightbox.classList.remove("is-open");
    removeModalListener();

  uploadPictures("", "");
}

// // Для отмены действия браузера по умолчанию на объекте события есть стандартный метод preventDefault().
// const form = document.querySelector(".register-form");

// form.addEventListener("submit", (event) => {
//   event.preventDefault();
//   const {
//     elements: { username, password }
//   } = event.currentTarget;
//   console.log(username.value, password.value);
// });

// листать картинки стрелками
function leafOver(key) {
  const imgCurrentLink = document.querySelector(".lightbox__image").src;
  const currentIndex = moduleGallery.galleryItems.findIndex(
    (link) => link.original === imgCurrentLink
  );
  let newIndex;
  switch (key) {
    case "ArrowRight":
      newIndex =
        currentIndex < imgCount - 1
          ? (newIndex = currentIndex + 1)
          : (newIndex = 0);
      break;
    case "ArrowLeft":
      newIndex =
        currentIndex > 0
          ? (newIndex = currentIndex - 1)
          : (newIndex = imgCount - 1);
      break;
  }
  uploadPictures(
    moduleGallery.galleryItems[newIndex].original,
    moduleGallery.galleryItems[newIndex].description
  );
}

