import TelegramBot from 'node-telegram-bot-api'
import dotenv from 'dotenv'
dotenv.config()

const token = process.env.BOT_TOKEN

const bot = new TelegramBot(token, { polling: true })

bot.onText(/\/echo (.+)/, (msg, match) => {

	const chatId = msg.chat.id
	const resp = match[1]

	bot.sendMessage(chatId, resp)
})
bot.on('message', async (msg) => {
	const chatId = msg.chat.id

	bot.sendMessage(chatId, 'Received your message')

	const text = msg.text
	if (text === '/start') {
		await bot.sendMessage(chatId, 'Welcome to the bot', {
			reply_markup: {
				keyboard: [[{ text: 'Accept terms and conditions', web_app: { url: 'https://www.google.com' } }]]
			}
		})
		await bot.sendMessage(chatId, 'Welcome to club buddy', {
			reply_markup: {
				inline_keyboard: [[{ text: 'Accept terms and conditions', web_app: { url: 'https://www.google.com' } }]]
			}
		})
	}
})