# Налаштування PlanPilot на Netlify

Цей документ описує процес міграції проекту PlanPilot з serveo.net на Netlify.

## Кроки налаштування

1. **Створіть аккаунт на Netlify**
   - Зареєструйтесь на [netlify.com](https://www.netlify.com/)
   - Створіть новий проект, пов'язавши його з репозиторієм GitHub

2. **Налаштуйте змінні середовища**
   - У панелі Netlify перейдіть до "Site settings" > "Environment variables"
   - Додайте наступні змінні:
     - `BOT_TOKEN` - токен Telegram бота
     - `WEBAPP_URL` - URL вашого додатку на Netlify (наприклад, https://planpilot.netlify.app)
     - `MONGODB_URI` - URI вашої бази даних MongoDB

3. **Налаштуйте домен**
   - У панелі Netlify перейдіть до "Site settings" > "Domain management"
   - Додайте ваш власний домен або використовуйте домен, наданий Netlify
   - Налаштуйте SSL/TLS сертифікат (Netlify робить це автоматично)

4. **Оновіть URL в Telegram Bot**
   - Оновіть URL веб-додатку в налаштуваннях BotFather для вашого бота

## Локальна розробка

Для розробки локально:

1. Встановіть Netlify CLI:
   ```
   npm install -g netlify-cli
   ```

2. Запустіть локальний сервер:
   ```
   cd client
   npm run netlify:dev
   ```

Це запустить локальну версію з Netlify Functions на порту 8888.

## Структура проекту

- `netlify.toml` - конфігурація деплою для Netlify
- `client/` - React/Vite клієнт
- `server/functions/` - Netlify функції для API
  - `api.js` - головна функція для обробки API запитів

## Важливі зміни

1. Serveo.net більше не використовується
2. API запити перенаправляються на Netlify Functions (/.netlify/functions/api)
3. Налаштування CORS оновлені для роботи з Netlify
4. URL веб-додатку налаштовується через змінну середовища WEBAPP_URL 