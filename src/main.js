import axios from "axios";
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
let totalHits = 0; // Toplam sonuç sayısını takip etmek için

searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    page = 1; // Yeni aramada sayfa sıfırlanmalı
    fetchImages(query);
  } else {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a valid search term!',
      position: 'topRight'
    });
  }
});

loadMoreButton.addEventListener('click', function() {
  const query = searchInput.value.trim();
  if (query) {
    page++; 
    loadMoreImages(query);
  }
});

// Axios kullanarak API çağrısı
async function fetchImages(query) {
  loader.style.display = 'block';
  gallery.innerHTML = ''; // Önceki sonuçları temizle
  loadMoreButton.style.display = 'none'; // Daha fazla yükle butonunu gizle

  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: apiKey,
        q: query,
        image_type: 'photo',
        per_page: 40, 
        page: page
      }
    });

    const data = response.data;
    totalHits = data.totalHits; // Toplam sonuç sayısını al

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight'
      });
      return;
    }

    renderImages(data.hits);
    loader.style.display = 'none';

    // Eğer toplam sonuç sayısından daha az resim varsa "Daha Fazla Yükle" butonunu göster
    if (page * 40 < totalHits) {
      loadMoreButton.style.display = 'block';
    }
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

// Sayfalama için daha fazla yükle fonksiyonu
async function loadMoreImages(query) {
  loader.style.display = 'block';

  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: apiKey,
        q: query,
        image_type: 'photo',
        per_page: 40, 
        page: page
      }
    });

    const data = response.data;

    renderImages(data.hits);
    loader.style.display = 'none';

    // Eğer toplam sonuçları aştıysak "Daha Fazla Yükle" butonunu gizle
    if (page * 40 >= totalHits) {
      loadMoreButton.style.display = 'none';
      iziToast.info({
        title: 'Info',
        message: 'You have reached the end of the results.',
        position: 'topRight'
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'An error occurred while loading more images!',
      position: 'topRight'
    });
    console.error("Error:", error);
    loader.style.display = 'none';
  }
}

// Galeriye görselleri ekleme
function renderImages(images) {
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
}

// SimpleLightbox'u güncelleyen fonksiyon
let lightbox = new SimpleLightbox('.gallery a');
function updateLightbox() {
  lightbox.refresh();
}
