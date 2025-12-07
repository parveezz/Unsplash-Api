const searchButton = document.getElementById('btn');
const searchInput = document.getElementById('text');

let imageArray = [];

function handleSearch() {
      const inputValue = searchInput.value.trim();

      if (inputValue === '' || !isNaN(inputValue)) {
            alert('Please enter what you want to search for.');
            return;
      } else {
            fetchImages(inputValue);
      }
}

searchButton.addEventListener('click', handleSearch);

async function fetchImages(searchTerm) {
      try {
        //GET THE KEY FROM THE UNSPLASH WEBSITE
            const accessKey = 'YOURS_API_KEY';
            const url = `https://api.unsplash.com/search/photos?query=${searchTerm}&client_id=${accessKey}`;

            const responseData = await fetch(url);
            const responseJson = await responseData.json();

            const images = responseJson.results;

            if (!images || images.length === 0) {
                  alert('No images found for this search.');
                  return;
            }

            imageArray = images;
            renderImagesFromArray();

      } catch (error) {
            console.log(`Error fetching images: ${error}`);
      } finally {
            console.log('Fetch attempt completed.');
      }
}

function renderImagesFromArray() {
      const mainContainer = document.querySelector('main');
      mainContainer.innerHTML = '';

      const sectionContainer = document.createElement('section');
      sectionContainer.classList.add('gridContainer');

      imageArray.forEach(val => {
            const imageCard = document.createElement('div');
            imageCard.classList.add('childGrids');

            const img = document.createElement('img');
            img.src = val.urls.regular;
            img.alt = val.alt_description || 'Unsplash image';

            const desc = document.createElement('p');
            desc.innerText = val.alt_description || 'No description';

            imageCard.appendChild(img);
            imageCard.appendChild(desc);
            sectionContainer.appendChild(imageCard);
      });

      mainContainer.appendChild(sectionContainer);
}
