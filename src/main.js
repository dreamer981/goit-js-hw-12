import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const apiKey = '48552658-8d0576f2bce30f826d9dd5e42';

const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more');

let page = 1;

searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchImages(query);
  } else {
    alert('Please enter a valid search term!');
  }
});

loadMoreButton.addEventListener('click', function() {
  const query = searchInput.value.trim();
  loadMoreImages(query);
});

// Async/Await kullanarak fetch işlemi
async function fetchImages(query) {
  loader.style.display = 'block';  // Yükleme göstergesini aç
  gallery.innerHTML = '';  // Önceki görselleri temizle

  try {
    const response = await fetch(`https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&per_page=15&page=${page}`);
    const data = await response.json();
    
    const images = data.hits;

    if (images.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight'
      });
      return;
    }

    let imageMarkup = '';
    images.forEach(image => {
      imageMarkup += `
        <a href="${image.largeImageURL}" class="gallery-item">
          <img src="${image.webformatURL}" alt="${image.tags}" />
          <div class="image-info">
            <p>Likes: ${image.likes}</p>
            <p>Views: ${image.views}</p>
            <p>Comments: ${image.comments}</p>
            <p>Downloads: ${image.downloads}</p>
          </div>
        </a>
      `;
    });

    gallery.innerHTML = imageMarkup;  // Galeriye HTML ekle
    updateLightbox();  // SimpleLightbox'u güncelle
    loader.style.display = 'none';  // Yükleme göstergesini kapat
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'An error occurred while loading images!',
      position: 'topRight'
    });
    console.error("Error:", error);
    loader.style.display = 'none';
  }

  loadMoreButton.style.display = 'block';  // Butonu görünür yap
}

// Async/Await kullanarak loadMore işlemi
async function loadMoreImages(query) {
  page++;
  loader.style.display = 'block';  // Yükleme göstergesini aç

  try {
    const response = await fetch(`https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&per_page=15&page=${page}`);
    const data = await response.json();
    
    const images = data.hits;

    if (images.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'No more images found!',
        position: 'topRight'
      });
      loader.style.display = 'none';
      return;
    }

    let imageMarkup = '';
    images.forEach(image => {
      imageMarkup += `
        <a href="${image.largeImageURL}" class="gallery-item">
          <img src="${image.webformatURL}" alt="${image.tags}" />
          <div class="image-info">
            <p>Likes: ${image.likes}</p>
            <p>Views: ${image.views}</p>
            <p>Comments: ${image.comments}</p>
            <p>Downloads: ${image.downloads}</p>
          </div>
        </a>
      `;
    });

    gallery.innerHTML += imageMarkup;
    updateLightbox();
    loader.style.display = 'none';
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'An error occurred while loading images!',
      position: 'topRight'
    });
    console.error("Error:", error);
    loader.style.display = 'none';
  }
}

// SimpleLightbox'u başlat
let lightbox = new SimpleLightbox('.gallery a');

// Galeri güncellendiğinde SimpleLightbox'u yenile
function updateLightbox() {
  lightbox.refresh();
}
