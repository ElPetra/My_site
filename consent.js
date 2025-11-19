// consent.js - скрипт только для страницы согласия
console.log("🔄 consent.js loaded");

function initConsentForm() {
  console.log("🎯 Initializing consent form...");

  const checkbox = document.getElementById("consentCheckbox");
  const button = document.getElementById("consentButton");

  console.log("📋 Found elements:", {
    checkbox: !!checkbox,
    button: !!button,
  });

  if (checkbox && button) {
    // Обработчик изменения чекбокса
    checkbox.addEventListener("change", function () {
      console.log("🔘 Checkbox changed:", this.checked);

      button.disabled = !this.checked;

      if (this.checked) {
        button.style.backgroundColor = "#300d0d";
        button.style.opacity = "1";
        button.style.cursor = "pointer";
        button.style.transform = "scale(1.02)";
        console.log("🟢 Button ENABLED");
      } else {
        button.style.backgroundColor = "#543d3d";
        button.style.opacity = "0.6";
        button.style.cursor = "not-allowed";
        button.style.transform = "scale(1)";
        console.log("🔴 Button DISABLED");
      }
    });

    // Обработчик клика по кнопке
    button.addEventListener("click", function () {
      console.log("🖱️ Button clicked, disabled:", this.disabled);

      if (!this.disabled) {
        console.log("✅ Processing consent...");

        // Анимация нажатия
        this.style.transform = "scale(0.95)";

        setTimeout(() => {
          this.style.transform = "scale(1)";

          // Сохранение согласия
          localStorage.setItem("userConsent", "accepted");
          localStorage.setItem("consentTimestamp", new Date().toISOString());

          // Показываем сообщение об успехе
          showSuccessMessage();

          // Перенаправление через 2 секунды
          setTimeout(() => {
            window.location.href = "./index.html";
          }, 2000);
        }, 150);
      }
    });

    function showSuccessMessage() {
      const successDiv = document.createElement("div");
      successDiv.className = "consent-success show";
      successDiv.innerHTML = `
                <div style="font-size: 24px; margin-bottom: 10px;">✅</div>
                <strong>Согласие успешно принято!</strong>
                <div style="margin-top: 8px; font-size: 0.9em;">
                    Перенаправление на главную страницу...
                </div>
            `;
      document.querySelector(".consent-form").appendChild(successDiv);

      // Блокируем форму
      checkbox.disabled = true;
      button.disabled = true;
      button.textContent = "Согласие принято";
      button.style.backgroundColor = "#2d5016";
    }

    console.log("🎉 Consent form initialized successfully");
  } else {
    console.error("❌ Elements not found!");
  }
}

// Инициализация при загрузке документа
document.addEventListener("DOMContentLoaded", initConsentForm);
