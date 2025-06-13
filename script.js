// Инициализация VK API
const vk = new VKIO.API({
  token: "ВАШ_ТОКЕН_СЕРВИСНОГО_КЛЮЧА_VK",  // Из настроек приложения VK
  apiVersion: "5.131"
});

// Загрузка данных пользователя
async function loadUserData() {
  try {
    const user = await vk.call("users.get", { fields: "photo_100" });
    const balance = 1000; // Здесь будет запрос к вашему API (например, Render/Railway)
    document.getElementById("user-info").innerHTML = `
      <img src="${user[0].photo_100}" width="50" style="border-radius: 50%">
      <p>${user[0].first_name}, баланс: <strong>${balance} коинов</strong></p>
    `;
  } catch (error) {
    console.error("Ошибка:", error);
  }
}

// Ежедневный бонус
function getDailyBonus() {
  fetch("https://your-backend.vercel.app/api/daily", {  // Замените на ваш API
    method: "POST",
    body: JSON.stringify({ user_id: 123 })  // Здесь реальный ID пользователя
  })
    .then(response => response.json())
    .then(data => alert(`Получено ${data.bonus} коинов!`));
}

// Создание клана
function createClan() {
  const clanName = document.getElementById("clan-name").value;
  fetch("https://your-backend.vercel.app/api/clans", {
    method: "POST",
    body: JSON.stringify({ name: clanName, user_id: 123 })
  })
    .then(response => response.json())
    .then(data => alert(`Клан "${data.name}" создан!`));
}

// Показ меню кланов
function showClanMenu() {
  document.getElementById("clan-menu").classList.toggle("hidden");
}

// Загружаем данные при запуске
loadUserData();
