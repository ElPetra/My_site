let puz1 = document.querySelector(".puz1");
let puz2 = document.querySelector(".puz2");
let puz3 = document.querySelector(".puz3");
let puz4 = document.querySelector(".puz4");
let puz5 = document.querySelector(".puz5");
let puz6 = document.querySelector(".puz6");
let puz7 = document.querySelector(".puz7");
let puz8 = document.querySelector(".puz8");
let puz9 = document.querySelector(".puz9");

setTimeout(() => {
  console.log("пазлы летят");
  puz1.classList.add("puzzl1");
  puz2.classList.add("puzzl2");
  puz3.classList.add("puzzl3");
  puz4.classList.add("puzzl4");
  puz5.classList.add("puzzl5");
  puz6.classList.add("puzzl6");
  puz7.classList.add("puzzl7");
  puz8.classList.add("puzzl8");
  puz9.classList.add("puzzl9");
}, 5000);




puzzles.addEventListener("mouseover", function (event) {
  event.target.setAttribute("src", "./src/images/smile.webp");
  myPhoto.classList.remove("d-none");
});
puzzles.addEventListener("mouseout", function (event) {
  event.target.setAttribute("src", "./src/images/photo.webp");
  myPhoto.classList.add("d-none");
});
puzzles.addEventListener("click", function () {
  console.log("разбиваем на пазлы");
  puzzles.innerHTML = ` <img src="./src/images/1puz.webp" class="puz puz1" />
          <img src="./src/images/2puz.webp" class="puz puz2" />
          <img src="./src/images/3puz.webp" class="puz puz3" />
          <img src="./src/images/4puz.webp" class="puz puz4" />
          <img src="./src/images/5puz.webp" class="puz puz5" />
          <img src="./src/images/6puz.webp" class="puz puz6" />
          <img src="./src/images/7puz.webp" class="puz puz7" />
          <img src="./src/images/8puz.webp" class="puz puz8" />
          <img src="./src/images/9puz.webp" class="puz puz9" />`;
});