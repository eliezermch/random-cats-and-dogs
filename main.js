const API_KEY_CAT = "74c33cd0-4fd6-455e-bfbf-bbaef039a7bb";

const API_CAT_RANDOM = `https://api.thecatapi.com/v1/images/search`;
const API_URL_FAVORITE_CAT = `https://api.thecatapi.com/v1/favourites`;
const API_URL_UPLOAD_CAT = `https://api.thecatapi.com/v1/images/upload`;
const API_DOG_RANDOM =
  "https://api.thedogapi.com/v1/images/search?api_key=2e646cd3-9c26-4918-a4be-1814b6fea864";

const spanError = document.querySelector("#error");

const btn_cat = document.querySelector(".btn_cat");
const btn_dog = document.querySelector(".btn_dog");
const btnAddCat = document.querySelector(".btn_add_cat");
const btnUploadImageCat = document.querySelector(".btn_upload_cat");

const reloadCat = async () => {
  const response = await fetch(API_CAT_RANDOM);
  const data = await response.json();
  if (response.status !== 200) {
    spanError.textContent = "Error: " + response.status;
    return;
  } else {
    const img = data[0]["url"];
    document.querySelector(".cat-img").src = img;
    btnAddCat.addEventListener("click", () => saveFvoriteCat(data[0]["id"]));
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
    const section = document.getElementById("favorite_cats");
    section.innerHTML = "";
    const h2 = document.createElement("h2");
    const h2Text = document.createTextNode("Favorite cats");
    h2.classList.add("title_favorites", "title");
    h2.appendChild(h2Text);
    section.appendChild(h2);
    data.forEach((cat) => {
      const container = document.createElement("div");
      const containerImg = document.createElement("div");
      const imgCat = document.createElement("img");
      const containerBtn = document.createElement("div");
      const btnDelete = document.createElement("button");
      const btnText = document.createTextNode("Delete to Favorite");

      container.classList.add("container");
      containerImg.classList.add("container-img");
      imgCat.classList.add("img");
      containerBtn.classList.add("container_btn_remove", "container-btn");
      btnDelete.classList.add("btn_remove", "btn");

      btnDelete.appendChild(btnText);
      imgCat.src = cat.image.url;

      container.appendChild(containerImg);
      containerImg.appendChild(imgCat);
      containerBtn.appendChild(btnDelete);
      btnDelete.addEventListener("click", () => deleteFavoriteCat(cat.id));
      toRender.push(container, containerBtn);

      // section.appendChild(container);
      // container.appendChild(containerImg);
      // containerImg.appendChild(imgCat);
      // section.appendChild(containerBtn);
      // containerBtn.appendChild(btnDelete);
    });
    section.append(...toRender);
  }
};

const saveFvoriteCat = async (id) => {
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

deleteFavoriteCat = async (id) => {
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
  const img = data[0]["url"];
  document.querySelector(".dog-img").src = img;
};

btn_dog.addEventListener("click", reloadDog);
window.onload = reloadCat();
window.onload = loadFavoriteCat();
window.onload = reloadDog();
