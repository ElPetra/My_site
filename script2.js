let inkBottle = document.querySelector(".ink-bottle");
let headerContent = document.querySelector(".header__content");
let buttons = document.querySelectorAll(".header-link");
let inkFlow = document.querySelector(".ink_flow");
let myPhoto = document.querySelector(".myPhoto");
let photo = document.querySelector(".photo");
let smile = document.querySelector(".smile");
let drop = document.querySelector(".drop");
let typewriter = document.querySelector(".typewriter");
let boxText = document.querySelector(".box-text");
let puzzles = document.querySelector(".puzzles");
let puzzl = document.querySelectorAll(".puz");
let cover = document.querySelector(".cover");
let telegram = document.querySelector(".icon_tg");
let vkontakte = document.querySelector(".icon_vk");
let whatsApp = document.querySelector(".icon_wa");
const formWhatsApp = document.querySelector(".form_whatsApp");
const formTelegram = document.querySelector(".form_telegram");
let fly = document.querySelector(".popup__message");
let portfolio = document.querySelector(".portfolio");

const telNumber = "79219192032";
// let myAudio = document.getElementById("myAudio");
let isPlaying = false;
let dropTimer;
let unlock = true;
const timeout = 800;

// Глобальные флаги для управления звуком
let isSoundEnabled = true;
let isTypewriterActive = false;
let isBottleFallen = false;

window.onload = function () {
  //бутылек падает
  setTimeout(() => {
    inkBottle.style.transform = "rotate(90deg)";
    isBottleFallen = true;
  }, 1000);
  //header окрашивается
  setTimeout(() => {
    headerContent.classList.add("header_black");
  }, 1500);
  //чернила разливаются
  setTimeout(() => {
    inkFlow.style = "opacity:1";
  }, 2000);
  //кнопки разблокируются
  setTimeout(() => {
    if (inkBottle.style.transform == "rotate(90deg)") {
      for (let el of buttons) {
        el.removeAttribute("disabled");
      }
    }
  }, 6000);

  // запускаем каплю:
  if (isSoundEnabled) {
    dropWater();
  } else {
    dropWaterMute();
  }

  // let contacts = document.querySelector(".header-link_contacts");
  // contacts.scrollIntoView({
  //   behavior: "smooth",
  //   block: "end"
  // });

  //запускаем летящие пазлы
  setTimeout(() => {
    puzzles.innerHTML = `<div class="puzzles">
          <img src="./src/images/1puz.webp" class="puz puzzl1" />
          <img src="./src/images/2puz.webp" class="puz puzzl2" />
          <img src="./src/images/3puz.webp" class="puz puzzl3" />
          <img src="./src/images/4puz.webp" class="puz puzzl4" />
          <img src="./src/images/5puz.webp" class="puz puzzl5" />
          <img src="./src/images/6puz.webp" class="puz puzzl6" />
          <img src="./src/images/7puz.webp" class="puz puzzl7" />
          <img src="./src/images/8puz.webp" class="puz puzzl8" />
          <img src="./src/images/9puz.webp" class="puz puzzl9" />
          <img src="./src/images/photo.webp" class="myPhoto d-none photo" />
          <img src="./src/images/smile.webp" class="myPhoto d-none smile"/>
          </div>`;
  }, 4000);
  //меняем на общую фотографию без границ пазлов
  setTimeout(() => {
    puzzles.innerHTML = `<div class="puzzles"> 
        <img src="./src/images/photo.webp" class="puz myPhoto photo" />
        </div>`;
  }, 9000);
};

//функция для интервального падения капли
function dropWater() {
  if (!isBottleFallen) return;
  clearInterval(dropTimer);

  setTimeout(function () {
    dropTimer = setInterval(function () {
      if (!isBottleFallen) return;
      drop.classList.add("drop-start");
      drop.style = "opacity:1";
      if (isSoundEnabled) soundDrop.play();
    }, 11000);
  }, 3000);
  setTimeout(function () {
    setInterval(function () {
      if (!isBottleFallen) return;
      drop.classList.add("drop-finish");
    }, 11000);
  }, 7000);
  setTimeout(function () {
    setInterval(function () {
      if (!isBottleFallen) return;
      drop.classList.remove("drop-start");
      drop.style = "opacity:0";
    }, 11000);
  }, 8000);
}

//функция для интервального падения капли без звука
function dropWaterMute() {
  if (!isBottleFallen) return;
  clearInterval(dropTimer);

  setTimeout(function () {
    dropTimer = setInterval(function () {
      if (!isBottleFallen) return;
      drop.classList.add("drop-start");
      drop.style = "opacity:1";
    }, 11000);
  }, 3000);
  setTimeout(function () {
    setInterval(function () {
      if (!isBottleFallen) return;
      drop.classList.add("drop-finish");
    }, 11000);
  }, 7000);
  setTimeout(function () {
    setInterval(function () {
      if (!isBottleFallen) return;
      drop.classList.remove("drop-start");
      drop.style = "opacity:0";
    }, 11000);
  }, 8000);
}

//бутылочка падает и встает обратно при нажатии
inkBottle.addEventListener("click", function () {
  if (inkBottle.style.transform == "rotate(90deg)") {
    inkBottle.style.transform = "rotate(0deg)";
    headerContent.classList.remove("header_black");
    inkFlow.style = "opacity:0";
    isBottleFallen = false;
    clearInterval(dropTimer);
  } else {
    inkBottle.style.transform = "rotate(90deg)";
    headerContent.classList.add("header_black");
    inkFlow.style = "opacity:1";
    isBottleFallen = true;
    if (isSoundEnabled) {
      dropWater();
    } else {
      dropWaterMute();
    }
  }
});

//меняем общую фотографию на фото с языком
puzzles.addEventListener("mouseover", function (event) {
  if (event.target.classList.contains("photo")) {
    puzzles.innerHTML = `<div class="puzzles"> 
        <img src="./src/images/smile.webp" class="puz myPhoto smile" />
        </div>`;
    photo.classList.remove("d-none");
  }
});
//меняем обратно общую фотографию на обычную
puzzles.addEventListener("mouseout", function (event) {
  if (event.target.classList.contains("smile")) {
    puzzles.innerHTML = `<div class="puzzles"> 
        <img src="./src/images/photo.webp" class="puz myPhoto photo" />
        </div>`;
    smile.classList.add("d-none");
  }
});
//при клике на фотографию - пазлы разлетаются и слетаются обратно через какое-то время
puzzles.addEventListener("click", function () {
  puzzles.innerHTML = `<div class="puzzles">
  <img src="./src/images/1puz.webp" class="puz puzzl1 puz-reverse" />
          <img src="./src/images/2puz.webp" class="puz puzzl2 puz-reverse" />
          <img src="./src/images/3puz.webp" class="puz puzzl3 puz-reverse" />
          <img src="./src/images/4puz.webp" class="puz puzzl4 puz-reverse" />
          <img src="./src/images/5puz.webp" class="puz puzzl5 puz-reverse" />
          <img src="./src/images/6puz.webp" class="puz puzzl6 puz-reverse" />
          <img src="./src/images/7puz.webp" class="puz puzzl7 puz-reverse" />
          <img src="./src/images/8puz.webp" class="puz puzzl8 puz-reverse" />
          <img src="./src/images/9puz.webp" class="puz puzzl9 puz-reverse" />
          </div>`;
  setTimeout(() => {
    puzzles.innerHTML = `<div class="puzzles">
          <img src="./src/images/1puz.webp" class="puz puzzl1" />
          <img src="./src/images/2puz.webp" class="puz puzzl2" />
          <img src="./src/images/3puz.webp" class="puz puzzl3" />
          <img src="./src/images/4puz.webp" class="puz puzzl4" />
          <img src="./src/images/5puz.webp" class="puz puzzl5" />
          <img src="./src/images/6puz.webp" class="puz puzzl6" />
          <img src="./src/images/7puz.webp" class="puz puzzl7" />
          <img src="./src/images/8puz.webp" class="puz puzzl8" />
          <img src="./src/images/9puz.webp" class="puz puzzl9" />
          </div>`;
  }, 5000);
  setTimeout(() => {
    puzzles.innerHTML = `<div class="puzzles"> 
        <img src="./src/images/photo.webp" class="puz myPhoto photo" />
        </div>`;
  }, 10000);
});

let soundTyper = new Howl({
  src: ["./src/sounds/zvuk-pechatnaya-mashinka.mp3"],
  html5: true,
  autoplay: false,
  howl: null,
});

let soundDrop = new Howl({
  src: ["./src/sounds/zvuk-kapli.mp3"],
  html5: true,
  autoplay: false,
  howl: null,
  volume: 0.1,
});

// let myAudio = new Audio();
// myAudio.src = "./src/sounds/zvuk-pechatnaya-mashinka.mp3";

//открытие модального окна при клике на кнопку портфолио
portfolio.addEventListener("click", function () {
  const portfolioPopup = document.querySelector("#portfolioPopup");
  popupOpen(portfolioPopup);
});


//печатная машинка
function typeText() {
  if (isTypewriterActive) return;

  isTypewriterActive = true;
  boxText.classList.remove("d-none");

  if (isSoundEnabled) {
    soundTyper.play();
  }

  const paragraphs = document.querySelectorAll(".print-text");
  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i];
    const text = paragraph.innerText;
    paragraph.innerHTML = "";

    for (let j = 0; j < text.length; j++) {
      const span = document.createElement("span");
      span.innerText = text.charAt(j);
      span.classList.add("fade-in");
      paragraph.appendChild(span);
    }
  }

  const spanArray = Array.from(document.getElementsByTagName("span"));
  for (let i = 0; i < spanArray.length; i++) {
    setTimeout(() => {
      spanArray[i].style.opacity = "1";
    }, i * 100);
    setTimeout(() => {
      if (isSoundEnabled) {
        soundTyper.stop();
      }
    }, (spanArray.length - 1) * 100);
  }
}

// обработчик печатной машинки
typewriter.addEventListener("click", function () {
  typeText();
});

// управление звуком
let controlSound = document.querySelector(".control-sound");
controlSound.addEventListener("click", function () {
  isSoundEnabled = !isSoundEnabled;

  if (isSoundEnabled) {
    // Включаем звук
    if (isBottleFallen) {
      clearInterval(dropTimer);
      dropWater();
    }
  } else {
    // Выключаем звук
    soundDrop.stop();
    if (isBottleFallen) {
      clearInterval(dropTimer);
      dropWaterMute();
    }
  }
  // Визуальная индикация состояния звука
  controlSound.classList.toggle("muted", !isSoundEnabled);
});

function changeIsPlaying() {
  isPlaying ? (isPlaying = false) : (isPlaying = true);
  console.log(isPlaying);
}

//функционал с карточками:
function randomRotate(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

const images = [
  "manuscript1.webp",
  "manuscript2.webp",
  "manuscript3.webp",
  "manuscript4.webp",
  "manuscript5.webp",
];
let count = images.length;

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function shuffleLinks(array) {
  let m = array.length,
    t,
    i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

let links = [
  "https://ubit.store/",
  "https://elpetra.github.io/rick-and-morty/",
  "https://elpetra.github.io/Harry-Potter/",
  "https://elpetra.github.io/Emoji-react/",
  "https://elpetra.github.io/InkHouse_pictures/",
  "https://elpetra.github.io/Weather/",
  "https://elpetra.github.io/coin/",
  "https://github.com/ElPetra/Ageld-bank",
  "https://github.com/ElPetra/Avangard-bank",
  "https://elpetra.github.io/rock-paper-scissors/",
  "https://elpetra.github.io/Ball/",
];

function init() {
  shuffle(images);

  for (let i = 0; i < images.length; i++) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.style.background = `url("./src/images/${images[i]}")`;
    card.style.backgroundSize = "cover";
    card.style.transform = `rotate(${randomRotate(
      -15,
      15
    )}deg) translate(${randomRotate(-40, 40)}px, ${randomRotate(-40, 40)}px)`;
    cover.append(card);
    let cardInside = document.createElement("div");
    cardInside.classList.add("cardInside");
    card.append(cardInside);
    let link = document.createElement("a");
    link.classList.add("link");
    for (let j = 0; j < links.length; j++) {
      link.innerHTML = links[j];
      link.setAttribute("href", links[j]);
      link.target = "_blank";
    }
    cardInside.appendChild(link);
    shuffleLinks(links);

    // for (let i = 0; i < links.length; i++) {
    //   console.log(links[i]);
    //   link.innerHTML = links[i];
    //   link.setAttribute("href", links[i]);
    //   link.target = "_blank";
    // }
    // cardInside.appendChild(link);
  }
}
init();

cover.addEventListener("click", (event) => {
  if (event.target.classList.contains("card")) {
    console.log(event.target);
    event.target.classList.add("go");
    count--;
  }
  if (count == 0) {
    let deletedCards = document.querySelectorAll(".card");
    for (let i = 0; i < deletedCards.length; i++) {
      deletedCards[i].remove();
    }
    init();
    count = images.length;
  }
});

//FOOTER
//слушатель-событие на кнопку whatsApp
whatsApp.addEventListener("click", function () {
  // const popupName = whatsApp.getAttribute("href").replace("#", "");
  const whatsAppPopup = document.getElementById("whatsApp");
  popupOpen(whatsAppPopup);
  // e.preventDefault();
});
//слушатель-событие на крестик в модальном окне
const popupCloseIcon = document.querySelectorAll(".close-popup");
if (popupCloseIcon.length > 0) {
  for (let i = 0; i < popupCloseIcon.length; i++) {
    const el = popupCloseIcon[i];
    el.addEventListener("click", function (e) {
      popupCloseIcon(el.closest(".popup"));
      e.preventDefault();
    });
  }
}
//функция открытия модального окна
function popupOpen(popup) {
  if (popup && unlock) {
    const popupActive = document.querySelector(".popup.open");
    if (popupActive) {
      popupClose(popupActive, false);
    }
    popup.classList.add("open");
    popup.addEventListener("click", function (e) {
      if (!e.target.closest(".popup__content")) {
        popupClose(e.target.closest(".popup"));
      }
    });
  }
}
//функция закрытия модального окна
function popupClose(popupActive) {
  popupActive.classList.remove("open");
}

//функция отправки сообщения на whatsApp
function sendToWhatsapp(text, phone) {
  text = encodeURIComponent(text);
  let url = `https://web.whatsapp.com/send?phone=${phone}&text=${text}&source=&data=`;
  window.open(url);
}

formWhatsApp.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = e.currentTarget.querySelector("input").value;
  sendToWhatsapp(text, telNumber);
  e.target.closest(".popup").classList.remove("open");
});

//слушатель-событие на кнопку telegram
telegram.addEventListener("click", function () {
  const telegramPopup = document.getElementById("telegram");
  popupOpen(telegramPopup);
});

//функция отправки сообщения в telegram
let tg = {
  token: "6508612564:AAEnOAM0mi0XADkb2_daOP6NMs8SU2YhUqY",
  chat_id: "647019829",
};

function sendMessage(text) {
  const url = `https://api.telegram.org/bot${tg.token}/sendMessage?chat_id=${tg.chat_id}&text=${text}`; // The url to request
  const xht = new XMLHttpRequest();
  xht.open("GET", url);
  xht.send();
}

formTelegram.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = e.currentTarget.querySelector("input").value;
  sendMessage(text);
  e.target.closest(".popup").classList.remove("open");
  fly.classList.add("opacity", "move");
  e.currentTarget.querySelector("input").value = "";
  setTimeout(() => {
    fly.classList.remove("opacity", "move");
  }, 5000);
});

//слушатель-событие на кнопку vkontakte
vkontakte.addEventListener("click", function () {
  const vkontaktePopup = document.getElementById("vkontakte");
  popupOpen(vkontaktePopup);
});
