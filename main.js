import {
  loadFavoriteCat,
  loadFavoriteDog,
  reloadCat,
  reloadDog,
} from "./utils/funcions.js";

// CAT
const btn_cat = document.querySelector(".btn_cat");
btn_cat.addEventListener("click", reloadCat);

// DOG
const btn_dog = document.querySelector(".btn_dog");
btn_dog.addEventListener("click", reloadDog);

window.onload = () => {
  reloadCat();
  loadFavoriteCat();
  reloadDog();
  loadFavoriteDog();
};
