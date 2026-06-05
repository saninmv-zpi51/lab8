const API_KEY = "56184954-0a0357b38dbe2b41f9ec98edc";

const form = document.querySelector(".search-form");
const gallery = document.querySelector(".search-gallery");
const loader = document.querySelector(".loader");

const lightbox = new SimpleLightbox(".search-gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

form.addEventListener("submit", event => {
  event.preventDefault();

  const query = form.elements.searchQuery.value.trim();

  if (query === "") {
    alert("Please enter a search query.");
    return;
  }

  gallery.innerHTML = "";
  showLoader();

  fetchImages(query)
    .then(data => {
      if (data.hits.length === 0) {
        alert("Sorry, there are no images matching your search query. Please try again!");
        return;
      }

      gallery.innerHTML = createGalleryMarkup(data.hits);
      lightbox.refresh();
    })
    .catch(error => {
      console.error(error);
      alert("Something went wrong. Please try again later.");
    })
    .finally(() => {
      hideLoader();
    });
});

function fetchImages(query) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
  });

  return fetch(`https://pixabay.com/api/?${params}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
}

function createGalleryMarkup(images) {
  return images
    .map(image => `
      <a href="${image.largeImageURL}" class="search-card">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy">

        <div class="info">
          <p><b>Likes</b><br>${image.likes}</p>
          <p><b>Views</b><br>${image.views}</p>
          <p><b>Comments</b><br>${image.comments}</p>
          <p><b>Downloads</b><br>${image.downloads}</p>
        </div>
      </a>
    `)
    .join("");
}

function showLoader() {
  loader.classList.remove("is-hidden");
}

function hideLoader() {
  loader.classList.add("is-hidden");
}