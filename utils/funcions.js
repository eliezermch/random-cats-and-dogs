const DOG_API_DOMAIN = "https://api.thecatapi.com/v1";
const CAT_API_DOMAIN = "https://api.thedogapi.com/v1";

const API_KEY_CAT = "74c33cd0-4fd6-455e-bfbf-bbaef039a7bb";
const API_CAT_RANDOM = `${DOG_API_DOMAIN}/images/search`;
const API_URL_FAVORITE_CAT = `${DOG_API_DOMAIN}/favourites`;
// const API_URL_UPLOAD_CAT = `${DOG_API_DOMAIN}/images/upload`;

const API_KEY_DOG = "2e646cd3-9c26-4918-a4be-1814b6fea864";
const API_DOG_RANDOM = `${CAT_API_DOMAIN}/images/search`;
const API_URL_FAVORITE_DOG = `${CAT_API_DOMAIN}/favourites/`;
// const API_URL_UPLOAD_DOG = `${CAT_API_DOMAIN}/images/upload`;

const spanError = document.querySelector("#error");

/* ===== CAT ===== */
const sectionCat = document.getElementById("favorite_cats");
const btnAddCat = document.querySelector(".btn_add_cat");

const reloadCat = async () => {
  const response = await fetch(API_CAT_RANDOM);
  const data = await response.json();
  if (response.status !== 200) {
    spanError.textContent = "Error: " + response.status;
    return;
  } else {
    const img = document.querySelector(".cat-img");
    img.src = data[0]["url"];
    btnAddCat.onclick = () => saveFavoriteCat(data[0]["id"]);
  }
};

const loadFavoriteCat = async () => {
  const response = await fetch(API_URL_FAVORITE_CAT, {
    method: "GET",
    headers: {
      "X-API-KEY": API_KEY_CAT,
    },
  });
  const data = await response.json();
  if (response.status !== 200) {
    spanError.textContent = "Error: " + response.status + " " + data.message;
    return;
  } else {
    const toRender = [];
    sectionCat.innerHTML = "";
    data.forEach((cat) => {
      const container = document.createElement("div");
      const subContainer = document.createElement("div");
      const containerImg = document.createElement("div");
      const imgCat = document.createElement("img");
      const containerBtn = document.createElement("div");
      const btnDelete = document.createElement("button");
      const btnText = document.createTextNode("Delete from Favorite");

      container.classList.add("container");
      subContainer.classList.add("sub-container");
      containerImg.classList.add("container-img");
      imgCat.classList.add("img");
      containerBtn.classList.add("container_btn_remove", "container-btn");
      btnDelete.classList.add("btn_remove", "btn");

      btnDelete.appendChild(btnText);
      imgCat.src = cat.image.url;

      subContainer.append(containerImg, containerBtn);
      containerImg.appendChild(imgCat);
      containerBtn.appendChild(btnDelete);
      btnDelete.addEventListener("click", () => deleteFavoriteCat(cat.id));
      container.appendChild(subContainer);

      toRender.push(container);
    });
    sectionCat.append(...toRender);
  }
};

const saveFavoriteCat = async (id) => {
  const response = await fetch(API_URL_FAVORITE_CAT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY_CAT,
    },
    body: JSON.stringify({
      image_id: id,
    }),
  });
  const data = await response.json();
  if (response.status !== 200) {
    spanError.textContent = "Error: " + response.status + " " + data.message;
    return;
  } else {
    loadFavoriteCat();
  }
};

const deleteFavoriteCat = async (id) => {
  const response = await fetch(`${DOG_API_DOMAIN}/favourites/${id}`, {
    method: "DELETE",
    headers: {
      "X-API-KEY": API_KEY_CAT,
    },
  });
  const data = await response.json();
  if (response.status !== 200) {
    spanError.textContent = "Error: " + response.status + " " + data.message;
    return;
  } else {
    loadFavoriteCat();
  }
};

/* ===== DOG ===== */
const sectionDog = document.getElementById("favorite_dogs");
const btnAddDog = document.querySelector(".btn_add_dog");
const btnUploadImageDog = document.querySelector(".btn_upload_cat");

const reloadDog = async () => {
  const response = await fetch(API_DOG_RANDOM);
  const data = await response.json();
  if (response.status !== 200) {
    spanError.textContent = "Error: " + response.status;
    return;
  } else {
    const img = document.querySelector(".dog-img");
    img.src = data[0]["url"];
    btnAddDog.onclick = () => saveFavoriteDog(data[0]["id"]);
  }
};

const loadFavoriteDog = async () => {
  const response = await fetch(API_URL_FAVORITE_DOG, {
    headers: {
      "X-API-KEY": API_KEY_DOG,
    },
  });
  const data = await response.json();
  if (response.status !== 200) {
    spanError.textContent = "Error: " + response.status;
    return;
  } else {
    const toRender = [];
    sectionDog.innerHTML = "";
    data.forEach((dog) => {
      const container = document.createElement("div");
      const subContainer = document.createElement("div");
      const containerImg = document.createElement("div");
      const imgDog = document.createElement("img");
      const containerBtn = document.createElement("div");
      const btnDelete = document.createElement("button");
      const btnText = document.createTextNode("Delete from Favorite");

      container.classList.add("container");
      subContainer.classList.add("sub-container");
      containerImg.classList.add("container-img");
      imgDog.classList.add("img");
      containerBtn.classList.add("container_btn_remove", "container-btn");
      btnDelete.classList.add("btn_remove", "btn");

      btnDelete.appendChild(btnText);
      imgDog.src = dog.image.url;

      subContainer.append(containerImg, containerBtn);
      containerImg.appendChild(imgDog);
      containerBtn.appendChild(btnDelete);
      btnDelete.addEventListener("click", () => deleteFavoriteDog(dog.id));
      container.appendChild(subContainer);

      toRender.push(container);
    });
    sectionDog.append(...toRender);
  }
};

const saveFavoriteDog = async (id) => {
  const response = await fetch(API_URL_FAVORITE_DOG, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY_DOG,
    },
    body: JSON.stringify({
      image_id: id,
    }),
  });
  const data = await response.json();
  if (response.status !== 200) {
    spanError.textContent = "Error: " + response.status + " " + data.message;
    return;
  } else {
    loadFavoriteDog();
  }
};

const deleteFavoriteDog = async (id) => {
  const response = await fetch(`${CAT_API_DOMAIN}/v1/favourites/${id}`, {
    method: "DELETE",
    headers: {
      "X-API-KEY": API_KEY_DOG,
    },
  });
  const data = await response.json();
  if (response.status !== 200) {
    spanError.textContent = "Error: " + response.status + " " + data.message;
    return;
  } else {
    loadFavoriteDog();
  }
};

export {
  reloadCat,
  loadFavoriteCat,
  saveFavoriteCat,
  deleteFavoriteCat,
  reloadDog,
  loadFavoriteDog,
  saveFavoriteDog,
  deleteFavoriteDog,
};
