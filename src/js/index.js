import SlimSelect from "slim-select";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { fetchBreeds, fetchCatByBreedId } from "./cat-api.js";
import elementManager from './elementManager.js';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');

elementManager.show(loader);

const drawBreedList = (data) => {
  const breedData = data.map(({ id, name }) => {
    return { text: name, value: id };
  });

  breedData.unshift({text: '', placeholder: true});

  breedSlimSelect.setData(breedData);

  elementManager.hide(loader);
  elementManager.show(breedSelect);
}

const drawCat = (data) => {
  const { url, breeds: [{ name, temperament, description }] } = data;

  catInfo.innerHTML = `
    <img class="cat-img" src="${url}" alt="${name}">
    <div class="cat-content">
      <div class="cat-name">${name}</div>
      <div class="cat-description">${description}</div>
      <div class="cat-temperament">Temperament: ${temperament}</div>
    </div>
  `;

  elementManager.hide(loader);
  elementManager.show(catInfo);
}

const breedSlimSelect = new SlimSelect({
  select: breedSelect,
  settings: {
    placeholderText: 'Select a cat',
  },
  events: {
    afterChange: (newVal) => {
      const breedId = newVal[0].value;

      if (breedId) {
        elementManager.hide(catInfo);
        elementManager.show(loader);

        fetchCatByBreedId(breedId)
          .then(({ data }) => drawCat(data[0]))
          .catch(() => {
            iziToast.error({
              message: "Oops! Something went wrong! Try reloading the page!",
              position: "topRight",
            })
          });
      }
    }
  }
})

fetchBreeds()
  .then(({ data }) => drawBreedList(data))
  .catch(() => {
    iziToast.error({
      message: "Oops! Something went wrong! Try reloading the page!",
      position: "topRight",
    })
  });
