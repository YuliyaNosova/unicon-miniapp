# Telegram Mini App — Unicon Outsourcing

Визитка компании Unicon Outsourcing в формате Telegram Mini App с формой для отправки заявок.

## Структура

```
frontend/   — React + Vite (веб-приложение)
bot/        — Python-бот (aiogram 3) + HTTP-сервер для приёма заявок
```

## 1. Создание бота в Telegram

1. Откройте [@BotFather](https://t.me/BotFather) в Telegram
2. Отправьте `/newbot`, следуйте инструкциям, получите **API-токен**
3. Отправьте `/mybots` → выберите бота → **Bot Settings** → **Menu Button** → задайте URL вашего фронтенда (после деплоя)

## 2. Запуск фронтенда

```bash
cd frontend
npm install
npm run dev
```

Для production-сборки:

```bash
npm run build
```

Файлы появятся в `frontend/dist/` — разместите их на любом хостинге с HTTPS.

## 3. Запуск бота

```bash
cd bot
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Создайте `.env` файл на основе `.env.example`:

```bash
cp .env.example .env
```

Заполните переменные:

| Переменная     | Описание                                                   |
| -------------- | ---------------------------------------------------------- |
| `BOT_TOKEN`    | Токен бота от @BotFather                                   |
| `ADMIN_CHAT_ID`| ID чата, куда будут приходить заявки (ваш личный или группа)|
| `WEBAPP_URL`   | URL задеплоенного фронтенда (HTTPS)                        |

Запуск:

```bash
python bot.py
```

Бот запустится в режиме polling + HTTP-сервер на порту 8080 для приёма заявок.

## 4. Как узнать свой ADMIN_CHAT_ID

1. Напишите боту [@userinfobot](https://t.me/userinfobot) — он покажет ваш ID
2. Или отправьте любое сообщение своему боту, затем откройте:
   `https://api.telegram.org/bot<ваш_токен>/getUpdates` — найдите `"chat":{"id":...}`

## 5. Настройка фронтенда для работы с ботом

В `frontend/` создайте файл `.env`:

```
VITE_API_URL=https://your-server.com
```

Это адрес, где запущен `bot.py` (порт 8080).

## 6. Деплой

### Фронтенд
Подойдёт любой статический хостинг с HTTPS: Vercel, Netlify, GitHub Pages, nginx.

### Бот
Запустите `bot.py` на VPS (Ubuntu, Debian). Пример с systemd:

```ini
# /etc/systemd/system/unicon-bot.service
[Unit]
Description=Unicon Outsourcing Telegram Bot
After=network.target

[Service]
WorkingDirectory=/path/to/bot
ExecStart=/path/to/bot/venv/bin/python bot.py
Restart=always
EnvironmentFile=/path/to/bot/.env

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable unicon-bot
sudo systemctl start unicon-bot
```

Для проксирования HTTP-сервера через nginx (HTTPS):

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:8080;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```
