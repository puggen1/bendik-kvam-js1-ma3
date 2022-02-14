let container = document.querySelector(".container");
let html = "";
let info = document.querySelector("#info");

const key = "5d1f76e9a33947f791c71f3158fdf344";
const url =
  "https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-rating&key=";
//standar fetch, put it into a function so it is kind of universal, but only with getting final url and getting result. the function  that display the result is not universal.
function getApi(api, key) {
  let finalUrl = api + key;
  fetch(finalUrl)
    .then((apiResponse) => apiResponse.json())
    .then((data) => displayApi(data.results))
    .catch((error) => showError(error))
    .finally(() => {
      clearInterval(interval);
    });
}
//function to display success message and the api result.
function displayApi(api) {
  //showing each game in api
  for (let i = 0; i < api.length; i++) {
    if (i === 8) {
      break;
    }
    let tagsQuantity = api[i].tags.length;
    html += `
    <div class="game">
      <p class="name">${api[i].name}</p>
      <p class="rating">Rating: ${api[i].rating}</p>
      <p class="tags"> number of tags: ${tagsQuantity}</p>
      </div>`;
  }
  //adding a message when it did as intended:
  //originaly this message said how many games it was showing, but when i read we only should show the 8 first, i removed it so it didnt show the wrong amount( i used api.length).
  info.innerHTML = `<div class="successContainer">
  <p>Success! Showing games: </p>
  </div>`;
  //adding the games
  container.innerHTML = html;
}

function showError(error) {
  info.innerHTML = `<div class="errorcontainer"><p>Something went wrong. ${error}</p></div>`;
  //removing loader here when error, since it only removes loader when successful because of container.innerHTML = html
  // i could also use a += and remove loader on .finally... i tried this, but for some reason nothing happend and im not so sure why.
  container.innerHTML = "";
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
