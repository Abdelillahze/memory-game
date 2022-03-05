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

  // start generation
  for (let i = 0; i < cards.length; i++) {
    // selector
    let randomNumber = Math.floor(Math.random() * (imgs.length - 1));
    let imgElement = document.createElement("img");
    let div = document.createElement("div");
    // add img and to used

    for (let i = 0; i < used.length; i++) {
      if (used.filter((e) => e == imgs[i]).length == 2) {
        imgs.splice(i, 1);
        randomNumber = Math.floor(Math.random() * (imgs.length - 1));
      }
    }

    div.classList.add("back");
    imgElement.src = `images/${imgs[randomNumber]}`;
    div.appendChild(imgElement);
    cards[i].prepend(div);
    used.push(imgs[randomNumber]);
  }
}

generateImgs();
