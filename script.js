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
// Переменные для соц. сетей
let telegram = document.querySelector(".icon_tg");
let vkontakte = document.querySelector(".icon_vk");
let whatsApp = document.querySelector(".icon_wa");
const formWhatsApp = document.querySelector(".form_whatsApp");
const formTelegram = document.querySelector(".form_telegram");
let telegramMove = document.getElementById("telegram-move");
let whatsAppMove = document.getElementById("whatsApp-move");
let soundIs = document.querySelector(".sound__is");
// Переменные для бургер-меню
let burgerMenu = document.getElementById("burgerMenu");
let mobileMenu = document.getElementById("mobileMenu");
let mobileMenuClose = document.getElementById("mobileMenuClose");

const telNumber = "79219192032";
let isPlaying = false;
let dropTimer;
let unlock = true;
const timeout = 800;
let isSoundEnabled = true;
let isTypingInProgress = false;
let soundAnimationInterval;

// Карусель переменные
let sertificates = [
  "all-certificates_01.webp",
  "all-certificates_02.webp",
  "all-certificates_03.webp",
  "all-certificates_04.webp",
  "all-certificates_05.webp",
  "all-certificates_06.webp",
  "all-certificates_07.webp",
  "all-certificates_08.webp",
  "all-certificates_09.webp",
  "all-certificates_10.webp",
  "all-certificates_11.webp",
];

let currentCarouselIndex = 0;
let isCarouselDragging = false;
let startCarouselX = 0;
let currentCarouselX = 0;
let autoSlideInterval = null;
let isAutoSlidePaused = false;
const AUTO_SLIDE_DELAY = 4000;
let isMobile = window.innerWidth <= 575;

// Код чтобы попапы не открывались при первичном рендере
document.addEventListener("DOMContentLoaded", function () {
  // Удаляем хэш из URL чтобы предотвратить автоматическое открытие попапа
  if (window.location.hash) {
    window.history.replaceState(null, null, " ");
  }

  // Принудительно скрываем все попапы при загрузке
  const allPopups = document.querySelectorAll(".popup");
  allPopups.forEach((popup) => {
    popup.classList.remove("open");
  });
});

// Добавляем переменные для отслеживания всех таймеров капель
let dropTimers = [];

let soundTyper = new Howl({
  src: ["src/sounds/zvuk-pechatnaya-mashinka.mp3"],
  html5: true,
  autoplay: false,
  volume: 0.3,
  howl: null,
});

let soundDrop = new Howl({
  src: ["src/sounds/zvuk-kapli.mp3"],
  html5: true,
  autoplay: false,
  howl: null,
  volume: 0.03,
});

// Функция для очистки всех таймеров капель
function clearAllDropTimers() {
  dropTimers.forEach((timer) => {
    clearInterval(timer);
    clearTimeout(timer);
  });
  dropTimers = [];

  // Также очищаем основной dropTimer
  if (dropTimer) {
    clearInterval(dropTimer);
    dropTimer = null;
  }
}

// Функция для запуска анимации звука
function startSoundAnimation() {
  if (!isSoundEnabled) return;

  soundIs.classList.add("sound-active");
  if (soundAnimationInterval) {
    clearInterval(soundAnimationInterval);
  }
  soundAnimationInterval = setInterval(() => {
    if (soundIs.classList.contains("sound-active")) {
      soundIs.classList.remove("sound-active");
    } else {
      soundIs.classList.add("sound-active");
    }
  }, 300);
}

// Функция для остановки анимации звука
function stopSoundAnimation() {
  soundIs.classList.remove("sound-active");
  if (soundAnimationInterval) {
    clearInterval(soundAnimationInterval);
    soundAnimationInterval = null;
  }
}

window.onload = function () {
  // Блокируем горизонтальный скролл на время начальной анимации
  document.body.style.overflowX = "hidden";

  // Инициализируем карусель
  initCarousel();

  setTimeout(() => {
    inkBottle.style.transform = "rotate(90deg)";
  }, 1000);

  setTimeout(() => {
    headerContent.classList.add("header_black");
  }, 1500);

  setTimeout(() => {
    inkFlow.style = "opacity:1";
  }, 2000);

  setTimeout(() => {
    if (inkBottle.style.transform == "rotate(90deg)") {
      for (let el of buttons) {
        el.removeAttribute("disabled");
      }
    }
  }, 6000);

  dropWater();

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
  }, 1300);

  setTimeout(() => {
    puzzles.innerHTML = `<div class="puzzles"> 
        <img src="./src/images/photo.webp" class="puz myPhoto photo" />
        </div>`;
    // Восстанавливаем скролл после завершения начальной анимации пазлов
    document.body.style.overflowX = "";
  }, 6300);
};

function dropWater() {
  // Сбрасываем состояние капли
  drop.classList.remove("drop-start", "drop-finish");
  drop.style.opacity = "0";

  // Очищаем все предыдущие таймеры
  clearAllDropTimers();

  setTimeout(function () {
    dropTimer = setInterval(function () {
      drop.classList.remove("drop-start", "drop-finish");
      drop.style.opacity = "0";

      setTimeout(() => {
        drop.classList.add("drop-start");
        drop.style.opacity = "1";
        if (isSoundEnabled) {
          soundDrop.play();
        }
      }, 100);
    }, 11000);
    dropTimers.push(dropTimer);
  }, 3000);

  setTimeout(function () {
    const finishTimer = setInterval(function () {
      drop.classList.add("drop-finish");
    }, 11000);
    dropTimers.push(finishTimer);
  }, 7000);

  setTimeout(function () {
    const resetTimer = setInterval(function () {
      drop.classList.remove("drop-start");
      drop.style.opacity = "0";
    }, 11000);
    dropTimers.push(resetTimer);
  }, 8000);
}

function dropWaterMute() {
  // Сбрасываем состояние капли
  drop.classList.remove("drop-start", "drop-finish");
  drop.style.opacity = "0";

  // Очищаем все предыдущие таймеры
  clearAllDropTimers();

  setTimeout(function () {
    dropTimer = setInterval(function () {
      drop.classList.remove("drop-start", "drop-finish");
      drop.style.opacity = "0";

      setTimeout(() => {
        drop.classList.add("drop-start");
        drop.style.opacity = "1";
      }, 100);
    }, 11000);
    dropTimers.push(dropTimer);
  }, 3000);

  setTimeout(function () {
    const finishTimer = setInterval(function () {
      drop.classList.add("drop-finish");
    }, 11000);
    dropTimers.push(finishTimer);
  }, 7000);

  setTimeout(function () {
    const resetTimer = setInterval(function () {
      drop.classList.remove("drop-start");
      drop.style.opacity = "0";
    }, 11000);
    dropTimers.push(resetTimer);
  }, 8000);
}

inkBottle.addEventListener("click", function () {
  if (inkBottle.style.transform == "rotate(90deg)") {
    inkBottle.style.transform = "rotate(0deg)";
    headerContent.classList.remove("header_black");
    inkFlow.style = "opacity:0";
    clearAllDropTimers();

    // Сбрасываем состояние капли при закрытии чернильницы
    drop.classList.remove("drop-start", "drop-finish");
    drop.style.opacity = "0";
  } else {
    inkBottle.style.transform = "rotate(90deg)";
    headerContent.classList.add("header_black");
    inkFlow.style = "opacity:1";
    dropWater();
  }
});

//  touch-события для мобильных
if ("ontouchstart" in window) {
  puzzles.addEventListener("touchstart", function (event) {
    if (event.target.classList.contains("photo")) {
      puzzles.innerHTML = `<div class="puzzles"> 
        <img src="./src/images/smile.webp" class="puz myPhoto smile" />
      </div>`;
    }
  });

  puzzles.addEventListener("touchend", function (event) {
    if (event.target.classList.contains("smile")) {
      puzzles.innerHTML = `<div class="puzzles"> 
        <img src="./src/images/photo.webp" class="puz myPhoto photo" />
      </div>`;
    }
  });
} else {
  // Оригинальные mouse события для десктопа
  puzzles.addEventListener("mouseover", function (event) {
    console.log("меняем фото на улыбку");
        if (event.target.classList.contains("photo")) {
      puzzles.innerHTML = `<div class="puzzles"> 
        <img src="./src/images/smile.webp" class="puz myPhoto smile" />
      </div>`;
    }
  });

  puzzles.addEventListener("mouseout", function (event) {
    console.log("меняем на обычное фото");
    if (event.target.classList.contains("smile")) {
      puzzles.innerHTML = `<div class="puzzles"> 
        <img src="./src/images/photo.webp" class="puz myPhoto photo" />
      </div>`;
    }
  });
}

puzzles.addEventListener("click", function () {
  // Блокируем скролл на время анимации
  document.body.style.overflow = "hidden";
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
    // Восстанавливаем скролл после завершения анимации
    document.body.style.overflow = "";
  }, 10000);
});

function typeText() {
  if (isTypingInProgress) {
    return;
  }

  isTypingInProgress = true;

  if (isSoundEnabled) {
    soundTyper.play();
    startSoundAnimation();
  }
  isPlaying = true;

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
  }

  setTimeout(() => {
    soundTyper.stop();
    isTypingInProgress = false;
    stopSoundAnimation();
  }, (spanArray.length - 1) * 100);
}

typewriter.addEventListener("click", function () {
  if (isTypingInProgress) {
    return;
  }

  boxText.classList.remove("d-none");
  typeText();
});

let controlSound = document.querySelector(".control-sound");
controlSound.addEventListener("click", function () {
  isSoundEnabled = !isSoundEnabled;

  if (isSoundEnabled) {
    soundTyper.mute(false);
    soundDrop.mute(false);
    clearAllDropTimers();
    dropWater();
    soundIs.style.display = "block";

    // Если звук включен и идет печать - запускаем анимацию
    if (isTypingInProgress) {
      startSoundAnimation();
    }
  } else {
    soundTyper.mute(true);
    soundDrop.mute(true);
    clearAllDropTimers();
    dropWaterMute();
    soundIs.style.display = "none";
    stopSoundAnimation();
  }

  if (isSoundEnabled) {
    controlSound.classList.remove("muted");
    controlSound.classList.add("unmuted");
  } else {
    controlSound.classList.remove("unmuted");
    controlSound.classList.add("muted");
  }
});

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
  }
}
init();

cover.addEventListener("click", (event) => {
  if (event.target.classList.contains("card")) {
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

whatsApp.addEventListener("click", function () {
  const whatsAppPopup = document.getElementById("whatsApp");
  popupOpen(whatsAppPopup);
});

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

// Функция для установки фокуса в попапах
function focusOnInput(popup) {
  setTimeout(() => {
    const telegramInput = popup.querySelector(".input_telegram");
    const whatsAppInput = popup.querySelector(".input_whatsApp");

    if (telegramInput) {
      telegramInput.focus();
    }
    if (whatsAppInput) {
      whatsAppInput.focus();
    }
  }, 100);
}

function popupOpen(popup) {
  if (popup && unlock) {
    const popupActive = document.querySelector(".popup.open");
    if (popupActive) {
      popupClose(popupActive, false);
    }
    popup.classList.add("open");
    // Устанавливаем фокус на инпут
    focusOnInput(popup);
    popup.addEventListener("click", function (e) {
      if (!e.target.closest(".popup__content")) {
        popupClose(e.target.closest(".popup"));
      }
    });
  }
}

function popupClose(popupActive) {
  popupActive.classList.remove("open");
}

// function sendToWhatsapp(text, phone) {
//   text = encodeURIComponent(text);
//   let url = `https://web.whatsapp.com/send?phone=${phone}&text=${text}&source=&data=`;
//   window.open(url);
// }
//Замена функции с использованием официального API
function sendToWhatsapp(text, phone) {
  text = encodeURIComponent(text);
  const formattedPhone = phone.replace(/\D/g, ""); // Убираем все не-цифры

  // Универсальный URL который работает на всех устройствах
  const url = `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${text}`;

  window.open(url, "_blank");
}

formWhatsApp.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = e.currentTarget.querySelector("input").value;
  sendToWhatsapp(text, telNumber);
  e.target.closest(".popup").classList.remove("open");
});

telegram.addEventListener("click", function () {
  const telegramPopup = document.getElementById("telegram");
  popupOpen(telegramPopup);
});

let tg = {
  token: "6508612564:AAEnOAM0mi0XADkb2_daOP6NMs8SU2YhUqY",
  chat_id: "647019829",
};

function sendMessage(text) {
  const url = `https://api.telegram.org/bot${tg.token}/sendMessage?chat_id=${tg.chat_id}&text=${text}`;
  const xht = new XMLHttpRequest();
  xht.open("GET", url);
  xht.send();
}
// Улетающий конверт для Telegram
formTelegram.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = e.currentTarget.querySelector("input").value;
  sendMessage(text);
  e.target.closest(".popup").classList.remove("open");

  // Анимация для Telegram
  if (telegramMove) {
    telegramMove.classList.add("opacity");
    telegramMove.classList.add("telegram-move-animation");

    e.currentTarget.querySelector("input").value = "";

    setTimeout(() => {
      telegramMove.classList.remove("opacity");
      telegramMove.classList.remove("telegram-move-animation");
    }, 5000);
  }
});

// Фейерверк для WhatsApp
formWhatsApp.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = e.currentTarget.querySelector("input").value;
  sendToWhatsapp(text, telNumber);
  e.target.closest(".popup").classList.remove("open");

  // Анимация для WhatsApp
  if (whatsAppMove) {
    whatsAppMove.classList.add("opacity");
    whatsAppMove.classList.add("whatsapp-move-animation");

    e.currentTarget.querySelector("input").value = "";

    setTimeout(() => {
      whatsAppMove.classList.remove("opacity");
      whatsAppMove.classList.remove("whatsapp-move-animation");
    }, 5000);
  }
});

vkontakte.addEventListener("click", function () {
  const vkontaktePopup = document.getElementById("vkontakte");
  popupOpen(vkontaktePopup);
});

// Функции для бургер-меню
function openMobileMenu() {
  mobileMenu.classList.add("open");
  document.body.style.overflow = "hidden"; // Блокируем скролл
}

function closeMobileMenu() {
  mobileMenu.classList.remove("open");
  document.body.style.overflow = ""; // Восстанавливаем скролл
}

// Слушатели событий для бургер-меню
if (burgerMenu) {
  burgerMenu.addEventListener("click", openMobileMenu);
}

if (mobileMenuClose) {
  mobileMenuClose.addEventListener("click", closeMobileMenu);
}

// Закрытие мобильного меню при клике вне контента
mobileMenu.addEventListener("click", function (e) {
  if (e.target === mobileMenu) {
    closeMobileMenu();
  }
});

// Закрытие мобильного меню при нажатии Escape
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && mobileMenu.classList.contains("open")) {
    closeMobileMenu();
  }
});

// Обработчик для мобильного меню - контакты
document.addEventListener("DOMContentLoaded", function () {
  const mobileContactLinks = document.querySelectorAll(
    '.mobile-menu a[href="#contacts"]'
  );

  mobileContactLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Плавно закрываем мобильное меню
      const mobileMenu = document.getElementById("mobileMenu");
      if (mobileMenu) {
        // Добавляем класс для анимации закрытия
        mobileMenu.classList.add("closing");
        mobileMenu.classList.remove("open");

        // Ждем завершения анимации перед скроллом
        setTimeout(() => {
          document.body.style.overflow = "";

          // Плавный скролл к контактам
          const contactsSection = document.getElementById("contacts");
          if (contactsSection) {
            contactsSection.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }, 300); // Должно совпадать с временем CSS transition
      } else {
        // Если меню не найдено, просто скроллим
        const contactsSection = document.getElementById("contacts");
        if (contactsSection) {
          contactsSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });
});

// КАРУСЕЛЬ С МОБИЛЬНОЙ АДАПТАЦИЕЙ

// Инициализация карусели
function initCarousel() {
  const carouselTrack = document.getElementById("carouselTrack");
  if (!carouselTrack) {
    console.error("Carousel track not found!");
    return;
  }

  // Определяем тип устройства
  isMobile = window.innerWidth <= 575;

  // Очищаем трек
  carouselTrack.innerHTML = "";

  // Создаем слайды в зависимости от типа устройства
  if (isMobile) {
    createAllSlidesMobile();
  } else {
    createVisibleSlides();
  }

  // Добавляем индикаторы
  createIndicators();

  // Добавляем кнопки навигации
  createNavigationButtons();

  // Добавляем обработчики событий
  addCarouselEventListeners();

  // Запускаем автопрокрутку
  startAutoSlide();
}

// Создаем все слайды для мобильных
function createAllSlidesMobile() {
  const carouselTrack = document.getElementById("carouselTrack");
  carouselTrack.innerHTML = "";

  sertificates.forEach((cert, index) => {
    const slide = document.createElement("div");
    slide.className = `carousel-slide ${
      index === currentCarouselIndex ? "active" : ""
    }`;
    slide.setAttribute("data-index", index);
    slide.innerHTML = `<img src="./src/sertificates/${cert}" alt="Сертификат ${
      index + 1
    }" class="carousel-image">`;
    carouselTrack.appendChild(slide);
  });
}

// Создаем только видимые слайды для десктопа
function createVisibleSlides() {
  const carouselTrack = document.getElementById("carouselTrack");
  const totalSlides = sertificates.length;

  // Индексы для отображаемых слайдов
  const prevIndex = (currentCarouselIndex - 1 + totalSlides) % totalSlides;
  const nextIndex = (currentCarouselIndex + 1) % totalSlides;

  // Очищаем трек
  carouselTrack.innerHTML = "";

  // Создаем и добавляем слайды в правильном порядке
  createSlide(prevIndex, "side");
  createSlide(currentCarouselIndex, "active");
  createSlide(nextIndex, "side");
}

// Создание одного слайда
function createSlide(index, className) {
  const carouselTrack = document.getElementById("carouselTrack");
  const slide = document.createElement("div");
  slide.className = `carousel-slide ${className}`;
  slide.innerHTML = `<img src="./src/sertificates/${
    sertificates[index]
  }" alt="Сертификат ${index + 1}" class="carousel-image">`;
  carouselTrack.appendChild(slide);
}

// Создаем индикаторы
function createIndicators() {
  const container = document.querySelector(".carousel-container");
  let indicatorsContainer = container.querySelector(".carousel-indicators");

  if (!indicatorsContainer) {
    indicatorsContainer = document.createElement("div");
    indicatorsContainer.className = "carousel-indicators";
    container.appendChild(indicatorsContainer);
  }

  indicatorsContainer.innerHTML = "";

  sertificates.forEach((_, index) => {
    const indicator = document.createElement("div");
    indicator.className = `carousel-indicator ${
      index === currentCarouselIndex ? "active" : ""
    }`;
    indicator.setAttribute("data-index", index);
    indicator.addEventListener("click", () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
  });
}

// Создаем кнопки навигации
function createNavigationButtons() {
  const carouselContainer = document.querySelector(".carousel-container");

  // Удаляем старые кнопки если есть
  const oldPrevBtn = carouselContainer.querySelector(".carousel-btn.prev");
  const oldNextBtn = carouselContainer.querySelector(".carousel-btn.next");
  if (oldPrevBtn) oldPrevBtn.remove();
  if (oldNextBtn) oldNextBtn.remove();

  // Создаем кнопки только для мобильных
  if (isMobile) {
    const prevBtn = document.createElement("button");
    prevBtn.className = "carousel-btn prev";
    prevBtn.innerHTML =
      '<img src="https://github.com/ElPetra/My_site/blob/main/src/images/left.webp?raw=true" alt="Previous" class="arrow-icon">';
    prevBtn.addEventListener("click", () => carouselPrev());

    const nextBtn = document.createElement("button");
    nextBtn.className = "carousel-btn next";
    nextBtn.innerHTML =
      '<img src="https://github.com/ElPetra/My_site/blob/main/src/images/right.webp?raw=true" alt="Next" class="arrow-icon">';
    nextBtn.addEventListener("click", () => carouselNext());

    carouselContainer.appendChild(prevBtn);
    carouselContainer.appendChild(nextBtn);
  }
}

// Автопрокрутка
function startAutoSlide() {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
  }

  autoSlideInterval = setInterval(() => {
    if (!isAutoSlidePaused && !isCarouselDragging) {
      carouselNext();
    }
  }, AUTO_SLIDE_DELAY);
}

function pauseAutoSlide() {
  isAutoSlidePaused = true;
}

function resumeAutoSlide() {
  isAutoSlidePaused = false;
}

// Обработчики событий для перетаскивания
function addCarouselEventListeners() {
  const carouselTrack = document.getElementById("carouselTrack");
  const carouselContainer = document.querySelector(".carousel-container");

  // Мышь
  carouselTrack.addEventListener("mousedown", carouselStartDrag);
  document.addEventListener("mousemove", carouselDrag);
  document.addEventListener("mouseup", carouselEndDrag);

  // Тач-события
  carouselTrack.addEventListener("touchstart", carouselStartDrag);
  document.addEventListener("touchmove", carouselDrag);
  document.addEventListener("touchend", carouselEndDrag);

  // События для паузы автопрокрутки при наведении
  carouselContainer.addEventListener("mouseenter", pauseAutoSlide);
  carouselContainer.addEventListener("mouseleave", resumeAutoSlide);

  // Обработчик ресайза
  window.addEventListener("resize", handleResize);
}

// Обработчик изменения размера окна
function handleResize() {
  const wasMobile = isMobile;
  isMobile = window.innerWidth <= 575;

  // Если режим изменился, переинициализируем карусель
  if (wasMobile !== isMobile) {
    initCarousel();
  }
}

function carouselStartDrag(e) {
  isCarouselDragging = true;
  startCarouselX = getCarouselClientX(e);
  currentCarouselX = startCarouselX;

  const carouselTrack = document.getElementById("carouselTrack");
  carouselTrack.classList.add("dragging");

  // Пауза автопрокрутки при начале драга
  pauseAutoSlide();

  e.preventDefault();
}

function carouselDrag(e) {
  if (!isCarouselDragging) return;

  e.preventDefault();
  currentCarouselX = getCarouselClientX(e);
}

function carouselEndDrag(e) {
  if (!isCarouselDragging) return;

  isCarouselDragging = false;
  const carouselTrack = document.getElementById("carouselTrack");
  carouselTrack.classList.remove("dragging");

  // Определяем направление свайпа
  const diff = startCarouselX - currentCarouselX;
  const threshold = isMobile ? 30 : 50; // Меньший порог для мобильных

  if (Math.abs(diff) > threshold) {
    if (diff > 0) {
      carouselNext();
    } else {
      carouselPrev();
    }
  }

  // Возобновляем автопрокрутку через задержку после драга
  setTimeout(() => {
    if (!isCarouselDragging) {
      resumeAutoSlide();
    }
  }, 1000);
}

function getCarouselClientX(e) {
  return e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
}

function carouselNext() {
  currentCarouselIndex = (currentCarouselIndex + 1) % sertificates.length;
  updateCarousel();
}

function carouselPrev() {
  currentCarouselIndex =
    (currentCarouselIndex - 1 + sertificates.length) % sertificates.length;
  updateCarousel();
}

function goToSlide(index) {
  currentCarouselIndex = index;
  updateCarousel();
}

function updateCarousel() {
  const carouselTrack = document.getElementById("carouselTrack");

  if (isMobile) {
    // Для мобильных обновляем классы у всех слайдов
    updateMobileSlides();
  } else {
    // Для десктопа пересоздаем видимые слайды
    createVisibleSlides();
  }

  updateIndicators();
}

// Обновление слайдов для мобильных
function updateMobileSlides() {
  const slides = document.querySelectorAll(".carousel-slide");
  slides.forEach((slide, index) => {
    if (index === currentCarouselIndex) {
      slide.classList.add("active");
      slide.style.display = "flex";
    } else {
      slide.classList.remove("active");
      slide.style.display = "none";
    }
  });
}

// Обновление индикаторов
function updateIndicators() {
  const indicators = document.querySelectorAll(".carousel-indicator");
  indicators.forEach((indicator, index) => {
    if (index === currentCarouselIndex) {
      indicator.classList.add("active");
    } else {
      indicator.classList.remove("active");
    }
  });
}

// Очистка при размонтировании
function destroyCarousel() {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
  }

  // Удаляем обработчик ресайза
  window.removeEventListener("resize", handleResize);
}

// Инициализация при загрузке
document.addEventListener("DOMContentLoaded", function () {
  initCarousel();
});

// Очистка при уходе со страницы
window.addEventListener("beforeunload", destroyCarousel);

// Универсальный обработчик для всех кнопок закрытия попапов
document.addEventListener("DOMContentLoaded", function () {
  // Обработчик для всех кнопок закрытия с классом close-popup
  const closeButtons = document.querySelectorAll(".close-popup");
  closeButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const popup = this.closest(".popup");
      if (popup) {
        popupClose(popup);
      }
    });
  });
});
