import asyncio
import logging
import os
from datetime import datetime

from aiohttp import web
from aiogram import Bot, Dispatcher, types
from aiogram.filters import CommandStart
from aiogram.types import (
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    WebAppInfo,
)
from dotenv import load_dotenv

load_dotenv()

BOT_TOKEN = os.getenv("BOT_TOKEN")
ADMIN_CHAT_ID = os.getenv("ADMIN_CHAT_ID")
WEBAPP_URL = os.getenv("WEBAPP_URL", "https://your-domain.com")

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@dp.message(CommandStart())
async def cmd_start(message: types.Message):
    keyboard = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="Открыть визитку",
                    web_app=WebAppInfo(url=WEBAPP_URL),
                )
            ]
        ]
    )
    await message.answer(
        "Добро пожаловать в Unicon Outsourcing!\n\n"
        "Нажмите кнопку ниже, чтобы узнать о наших услугах и оставить заявку.",
        reply_markup=keyboard,
    )


# --- HTTP-сервер для приёма заявок ---

async def handle_request(request: web.Request) -> web.Response:
    try:
        data = await request.json()
    except Exception:
        return web.json_response({"ok": False, "error": "Invalid JSON"}, status=400)

    name = data.get("name", "—")
    email = data.get("email", "—")
    phone = data.get("phone", "—")
    company = data.get("company", "—")
    tg_user_id = data.get("tg_user_id", "")
    tg_username = data.get("tg_username", "")

    now = datetime.now().strftime("%d.%m.%Y %H:%M")
    tg_info = ""
    if tg_username:
        tg_info = f"\nTelegram: @{tg_username} (ID: {tg_user_id})"
    elif tg_user_id:
        tg_info = f"\nTelegram ID: {tg_user_id}"

    text = (
        f"📩 <b>Новая заявка</b>\n\n"
        f"👤 <b>Имя:</b> {name}\n"
        f"📧 <b>Email:</b> {email}\n"
        f"📞 <b>Телефон:</b> {phone}\n"
        f"🏢 <b>Компания:</b> {company}"
        f"{tg_info}\n\n"
        f"🕐 {now}"
    )

    try:
        await bot.send_message(chat_id=ADMIN_CHAT_ID, text=text, parse_mode="HTML")
    except Exception as e:
        logger.error(f"Failed to send message to admin: {e}")
        return web.json_response({"ok": False, "error": "Bot error"}, status=500)

    return web.json_response({"ok": True})


async def handle_cors_preflight(request: web.Request) -> web.Response:
    return web.Response(
        status=200,
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    )


@web.middleware
async def cors_middleware(request, handler):
    response = await handler(request)
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    return response


async def main():
    # HTTP-сервер
    app = web.Application(middlewares=[cors_middleware])
    app.router.add_post("/api/request", handle_request)
    app.router.add_route("OPTIONS", "/api/request", handle_cors_preflight)

    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, "0.0.0.0", 8080)
    await site.start()
    logger.info("HTTP server started on port 8080")

    # Telegram polling
    logger.info("Starting bot polling...")
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
