// Ця утиліта допомагає тестувати Telegram Mini App з різними параметрами
// Щоб використати, додайте цей скрипт на сторінку `local-test.html`

// Функція для оновлення даних користувача
function updateTelegramUser(userData) {
  if (!window.Telegram || !window.Telegram.WebApp) {
    console.error('Telegram WebApp не ініціалізований');
    return;
  }

  // Оновлюємо дані користувача
  window.Telegram.WebApp.initDataUnsafe.user = {
    ...window.Telegram.WebApp.initDataUnsafe.user,
    ...userData
  };
  
  // Оновлюємо дані на сторінці
  const tgDataElement = document.getElementById('tgData');
  if (tgDataElement) {
    tgDataElement.textContent = JSON.stringify(window.Telegram.WebApp.initDataUnsafe, null, 2);
  }
  
  console.log('Дані користувача оновлено:', window.Telegram.WebApp.initDataUnsafe.user);
  
  // Якщо iframe завантажений, перезавантажуємо його для застосування змін
  const frame = document.getElementById('frame');
  if (frame && frame.src !== 'about:blank') {
    frame.src = frame.src;
  }
}

// Функція для імітації різних користувачів
const testUsers = {
  default: {
    id: 123456789,
    first_name: "Test",
    last_name: "User",
    username: "testuser",
    language_code: "en"
  },
  admin: {
    id: 987654321,
    first_name: "Admin",
    last_name: "User",
    username: "adminuser",
    language_code: "uk",
    is_admin: true
  },
  newUser: {
    id: 555555555,
    first_name: "New",
    last_name: null,
    username: null,
    language_code: "uk"
  }
};

// Функція для швидкого перемикання між користувачами
function switchToUser(userType) {
  if (testUsers[userType]) {
    updateTelegramUser(testUsers[userType]);
    return true;
  } else {
    console.error(`Користувач типу "${userType}" не знайдений`);
    return false;
  }
}

// Функція для імітації параметрів запуску
function setStartParam(param) {
  if (!window.Telegram || !window.Telegram.WebApp) {
    console.error('Telegram WebApp не ініціалізований');
    return;
  }
  
  window.Telegram.WebApp.initDataUnsafe.start_param = param;
  
  // Оновлюємо дані на сторінці
  const tgDataElement = document.getElementById('tgData');
  if (tgDataElement) {
    tgDataElement.textContent = JSON.stringify(window.Telegram.WebApp.initDataUnsafe, null, 2);
  }
  
  console.log('Параметр запуску встановлено:', param);
}

// Експортуємо функції для використання на сторінці
window.TelegramTester = {
  updateUser: updateTelegramUser,
  switchToUser: switchToUser,
  setStartParam: setStartParam,
  testUsers: testUsers
};

console.log('Утиліта для тестування Telegram даних завантажена. Використовуйте функції:');
console.log('- TelegramTester.switchToUser("default"/"admin"/"newUser")');
console.log('- TelegramTester.setStartParam("your-param")');
console.log('- TelegramTester.updateUser({ custom: "value" })'); 