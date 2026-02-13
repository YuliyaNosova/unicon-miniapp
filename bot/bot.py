import asyncio
import json
import logging
import os
from datetime import datetime

from aiogram import Bot, Dispatcher, F, types
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


@dp.message(F.web_app_data)
async def handle_web_app_data(message: types.Message):
    try:
        data = json.loads(message.web_app_data.data)
    except (json.JSONDecodeError, AttributeError):
        logger.error("Invalid web_app_data received")
        return

    name = data.get("name", "—")
    email = data.get("email", "—")
    phone = data.get("phone", "—")
    company = data.get("company", "—")

    user = message.from_user
    now = datetime.now().strftime("%d.%m.%Y %H:%M")

    tg_info = ""
    if user.username:
        tg_info = f"\nTelegram: @{user.username} (ID: {user.id})"
    else:
        tg_info = f"\nTelegram ID: {user.id}"

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
        await message.answer("Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.")
    except Exception as e:
        logger.error(f"Failed to send message to admin: {e}")
        await message.answer("Произошла ошибка при отправке заявки. Попробуйте позже.")


async def main():
    logger.info("Starting bot polling...")
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
