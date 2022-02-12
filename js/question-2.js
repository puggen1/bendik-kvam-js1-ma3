let container = document.querySelector(".container");
let html = "";
const key = "5d1f76e9a33947f791c71f3158fdf344";
const url =
  "https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-rating&key=";

function getApi(api, key) {
  let finalUrl = api + key;
  fetch(finalUrl)
    .then((apiResponse) => apiResponse.json())
    .then((data) => displayApi(data.results))
    .catch((error) => showError(error))
    .finally(() => clearInterval(interval));
}
//remember api need .results
function displayApi(api) {
  for (let i = 0; i < api.length; i++) {
    let tagsQuantity = api[i].tags.length;
    html += `<div class="game">
      <p class="name">${api[i].name}</p>
      <p class="rating">${api[i].rating}</p>
      <p class="tags"> number of tags: ${tagsQuantity}</p>
      </div>`;
  }
  container.innerHTML = html;
}

function showError(error) {
  console.log(error);
}

// some style for loader, it dont show here cause it loads to fast but just a small response in addition to the loader wheel.
let loadingText = document.querySelector(".loading p");
let interval = setInterval(loader, 250);
window.onload = () => interval;

function loader() {
  loadingText.innerHTML += ".";
  console.log(loadingText.innerHTML);
  if (loadingText.innerHTML.length === 10) {
    loadingText.innerHTML = "loading";
  }
}
getApi(url, key);
