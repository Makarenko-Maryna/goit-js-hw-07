import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

console.log(galleryItems);
const galleryContainer = document.querySelector(".js-gallery");
const createGalleryCards = createGalleryImages(galleryItems);
galleryContainer.insertAdjacentHTML("beforeend", createGalleryCards);
galleryContainer.addEventListener("click", addGalleryContainerClick);

function createGalleryImages(galleryItems) {
  return galleryItems.map(({ preview, original, description }) => {

       return `
      <a class="gallery__item" href="${original}">
         <img class="gallery__image" src="${preview}" alt="${description}" />
      </a>
    `;
  }).join("");

}

function addGalleryContainerClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  lightbox.on('show.simpleLightbox');

}

var lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    navText: ['<', '>'],
    widthRatio: 0.9,
    heightRatio: 1,
    fadeSpeed: 300,

}).on('show.simpleLightbox');