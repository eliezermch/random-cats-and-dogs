const API_KEY_CAT = "74c33cd0-4fd6-455e-bfbf-bbaef039a7bb";
const API_CAT_RANDOM = `https://api.thecatapi.com/v1/images/search`;
const API_URL_FAVORITE_CAT = `https://api.thecatapi.com/v1/favourites`;
const API_URL_UPLOAD_CAT = `https://api.thecatapi.com/v1/images/upload`;
//
const API_KEY_DOG = "2e646cd3-9c26-4918-a4be-1814b6fea864";
const API_DOG_RANDOM = "https://api.thedogapi.com/v1/images/search";
const API_URL_FAVORITE_DOG = `https://api.thedogapi.com/v1/favourites/`;
const API_URL_UPLOAD_DOG = `https://api.thedogapi.com/v1/images/upload`;
//
const spanError = document.querySelector("#error");

// CAT
const sectionCat = document.getElementById("favorite_cats");

// DOG
const sectionDog = document.getElementById("favorite_dogs");

const btn_cat = document.querySelector(".btn_cat");
const btnAddCat = document.querySelector(".btn_add_cat");
const btn_dog = document.querySelector(".btn_dog");
const btnAddDog = document.querySelector(".btn_add_dog");
const btnUploadImageDog = document.querySelector(".btn_upload_cat");

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
    // btnAddCat.addEventListener("click", saveFavoriteCat(data[0]["id"]));
  }
};

btn_cat.addEventListener("click", reloadCat);

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

      // section.appendChild(container);
      // container.appendChild(containerImg);
      // containerImg.appendChild(imgCat);
      // section.appendChild(containerBtn);
      // containerBtn.appendChild(btnDelete);
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
  // btnAddCat.removeEventListener("click", saveFavoriteCat(data[0]["id"]));
};

const deleteFavoriteCat = async (id) => {
  const response = await fetch(
    `https://api.thecatapi.com/v1/favourites/${id}`,
    {
      method: "DELETE",
      headers: {
        "X-API-KEY": API_KEY_CAT,
      },
    }
  );
  const data = await response.json();
  if (response.status !== 200) {
    spanError.textContent = "Error: " + response.status + " " + data.message;
    return;
  } else {
    loadFavoriteCat();
  }
};

// const uploadImageCat = async () => {
//   const form = document.getElementById("uploadingForm");
//   const formData = new FormData(form);

//   console.log(formData.get("file"));
//   const response = await fetch(API_URL_UPLOAD_CAT, {
//     method: "POST",
//     headers: {
//       "Content-Type": "multipart/form-data",
//       X_API_KEY: API_KEY_CAT,
//     },
//     body: formData,
//     mode: "no-cors",
//   });
//   if (response.status !== 200) {
//     spanError.textContent = "Error: " + response.status;
//     return;
//   } else {
//     console.log("foto subida :)))");
//   }
// };

// btnUploadImageCat.addEventListener("click", uploadImageCat);

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

btn_dog.addEventListener("click", reloadDog);

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
  const response = await fetch(
    `https://api.thedogapi.com/v1/favourites/${id}`,
    {
      method: "DELETE",
      headers: {
        "X-API-KEY": API_KEY_DOG,
      },
    }
  );
  const data = await response.json();
  if (response.status !== 200) {
    spanError.textContent = "Error: " + response.status + " " + data.message;
    return;
  } else {
    loadFavoriteDog();
  }
};

// const uploadImageDog = async () => {
//   const form = document.getElementById("uploadingForm");
//   const formData = new FormData(form);

//   console.log(formData.get("file"));
//   const response = await fetch(API_URL_UPLOAD_DOG, {
//     method: "POST",
//     headers: {
//       "Content-Type": "multipart/form-data",
//       X_API_KEY: API_KEY_DOG,
//     },
//     body: formData,
//     mode: "no-cors",
//   });
//   if (response.status !== 200) {
//     spanError.textContent = "Error: " + response.status;
//     return;
//   } else {
//     console.log("foto subida :)))");
//   }
// };

// btnUploadImageDog.addEventListener("click", uploadImageDog);

window.onload = reloadCat();
window.onload = loadFavoriteCat();
window.onload = reloadDog();
window.onload = loadFavoriteDog();
