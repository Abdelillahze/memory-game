// selector
let cards = document.querySelectorAll(".parent .card.infinished");
let check = [];
let timeout = true;
let congrats = document.querySelector(".congrats");
// when click flip

if (timeout) {
  cards.forEach(
    (e) =>
      (e.onclick = () => {
        if (!timeout) return;
        e.classList.add("active");
        check.push(e);
        if (new Set([...check]).size == 2) {
          let values = [...check];
          // timeout
          timeout = false;
          setTimeout(() => {
            cards.forEach((el) => el.classList.remove("active"));
            timeout = true;
          }, 500);
          check.length = 0;
          // smaller
          if (values[0].id == values[1].id && values[0] != values[1]) {
            // add finished class and remove infinished
            values[0].classList.add("finished");
            values[0].classList.remove("infinished");
            values[1].classList.add("finished");
            values[1].classList.remove("infinished");
            // empty the array
            values.length = 0;
          }
        }
      })
  );
}

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
    // remove from arr and names
    arr.splice(randomNumber, 1);
    names.splice(randomNumber, 1);
    // append element
    div.appendChild(img);
    cards[i].prepend(div);
  }
}

displayRandom(generateImgs());
