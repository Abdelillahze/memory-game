// selector
let cards = document.querySelectorAll(".parent .card.infinished");
let times = 0;
let timeout = true;
let check = [];
let congrats = document.querySelector(".congrats");
// when click flip
cards.forEach(
  (e) =>
    (e.onclick = () => {
      if (timeout) {
        e.classList.add("active");
        check.push(e);
        if (check.length == 2) {
          if (
            check[0].children[0].children[0].src ==
            check[1].children[0].children[0].src
          ) {
            check[0].classList.remove("infinished");
            check[0].classList.add("finished");
            check[1].classList.remove("infinished");
            check[1].classList.add("finished");
          }
          check = [];
        }
        times++;
        if (times == 2) {
          timeout = false;
          setTimeout(() => {
            cards.forEach((el) => el.classList.remove("active"));
            timeout = true;
          }, 500);
          times = 0;
        }
      }
    })
);

setInterval(() => {
  let cards = document.querySelector(".card.infinished");
  if (cards == null) {
    congrats.style.display = "grid";
  }
});

// generate random cards
function generateImgs() {
  // selectors
  let imgs = [
    "camera.svg",
    "file-empty.svg",
    "home.svg",
    "image.svg",
    "music.svg",
    "pencil.svg",
  ];
  let used = [];
  let result = [];

  // start generation
  for (let i = 0; i < cards.length; i++) {
    // selector
    let randomNumber = Math.floor(Math.random() * (imgs.length - 1));
    for (let i = 0; i < imgs.length; i++) {
      if (used.filter((e) => e == imgs[i]).length == 2) {
        imgs.splice(i, 1);
        randomNumber = Math.floor(Math.random() * (imgs.length - 1));
      }
    }
    result.push(imgs[randomNumber]);
    used.push(imgs[randomNumber]);
  }
  return result;
}

// display randomly

function displayRandom(arr) {
  // loop
  for (let i = 0; i < cards.length; i++) {
    // random number
    let randomNumber = Math.floor(Math.random() * (arr.length - 1));
    // create elements
    let img = document.createElement("img");
    let div = document.createElement("div");
    // set classes and src
    div.classList.add("back");
    img.src = `images/${arr[randomNumber]}`;
    // remove from arr
    arr.splice(randomNumber, 1);
    // append element
    div.appendChild(img);
    cards[i].prepend(div);
  }
}

displayRandom(generateImgs());
