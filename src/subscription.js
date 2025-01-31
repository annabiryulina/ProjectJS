const emailInput = document.getElementById("emailInput");
const subscribeButton = document.getElementById("subscribeButton");
const resultElement = document.getElementById("result");

subscribeButton.addEventListener("click", function(event) {
  event.preventDefault(); // Отключение перезагрузки страницы

  const emailValue = emailInput.value;

  if (validateEmail(emailValue)) {
    // Код подписки на рассылку
    resultElement.textContent = "Подписка на рассылку выполнена успешно";
  } else {
    resultElement.textContent = "Неверный формат email";
  }
});

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export {validateEmail};
