const images = [
    {
    preview: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Kuindzhi_Ai-Petri_Crimea_1898_1908.jpg",
    original: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Kuindzhi_Ai-Petri_Crimea_1898_1908.jpg",
    description: "Класичні твори мистецтва",
    },
  {
    preview: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=500",
    original: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=1200",
    description: "Картинна галерея",
  },
  {
    preview: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=500",
    original: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1200",
    description: "Виставковий простір",
  },
  {
    preview: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=500",
    original: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=1200",
    description: "Музейні твори мистецтва",
  },
  {
    preview: "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=500",
    original: "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=1200",
    description: "Виставка сучасного мистецтва",
  },
  {
    preview: "https://images.unsplash.com/photo-1577720580479-7d839d829c73?w=500",
    original: "https://images.unsplash.com/photo-1577720580479-7d839d829c73?w=1200",
    description: "Картинна галерея",
  },
];

const gallery = document.querySelector(".gallery");

const galleryMarkup = images
  .map(image => `
    <li class="gallery-item">
      <img
        src="${image.preview}"
        data-original="${image.original}"
        alt="${image.description}"
        class="gallery-image"
      >
      <p>${image.description}</p>
    </li>
  `)
  .join("");

gallery.innerHTML = galleryMarkup;

gallery.addEventListener("click", event => {
  if (event.target.nodeName !== "IMG") {
    return;
  }

  const largeImageURL = event.target.dataset.original;
  const description = event.target.alt;

  console.log(largeImageURL);

  const instance = basicLightbox.create(`
    <div class="modal-content">
      <img src="${largeImageURL}" alt="${description}">
      <p>${description}</p>
    </div>
  `);

  instance.show();
});