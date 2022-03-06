// selector
let cards = document.querySelectorAll(".parent .card.infinished");
let times = 0;
let check = [];
let timeout = true;
let congrats = document.querySelector(".congrats");
// when click flip
cards.forEach(
  (e) =>
    (e.onclick = () => {
      if (!timeout) return;
      e.classList.add("active");
      times++;
      check.push(e);
      if (times == 2) {
        // smaller
        if (check[0].id == check[1].id) {
          // add finished class and remove infinished
          check[0].classList.add("finished");
          check[0].classList.add("infinished");
          check[1].classList.add("finished");
          check[1].classList.add("infinished");
          // empty the array
          check.length = 0;
        }
        // timeout
        timeout = false;
        setTimeout(() => {
          cards.forEach((el) => el.classList.remove("active"));
          timeout = true;
        }, 500);
        times = 0;
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
  let names = arr.map((e) => e.slice(0, e.search(".svg")));
  // loop
  for (let i = 0; i < cards.length; i++) {
    // random number
    let randomNumber = Math.floor(Math.random() * (arr.length - 1));
    // create elements
    let img = document.createElement("img");
    let div = document.createElement("div");
    // set classes and src
    div.classList.add("back");
    cards[i].id = names[randomNumber];
    img.src = `images/${arr[randomNumber]}`;
    // remove from arr
    arr.splice(randomNumber, 1);
    // append element
    div.appendChild(img);
    cards[i].prepend(div);
  }
}

displayRandom(generateImgs());
