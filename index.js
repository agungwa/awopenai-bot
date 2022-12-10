import { ChatGPTAPI } from "chatgpt";
import { Telegraf } from "telegraf";
import dotenv from 'dotenv'
dotenv.config()

async function chat() {
    const bot = new Telegraf(process.env.TELEGRAM_TOKEN)
    const api = new ChatGPTAPI({
        sessionToken: process.env.CHAT_TOKEN
    })
    
    await api.ensureAuth()

    bot.start((ctx) => ctx.reply('Welcome to AW open AI'));
    bot.help((ctx) => ctx.reply('Type : Help me please!'));
    bot.hears('hi', (ctx) => ctx.reply('Hey there'));
    bot.on('text', async (ctx) => {
        const response = await api.sendMessage( ctx.message?.text );
        bot.telegram.sendMessage(ctx.chat.id, response);
      })

    bot.launch();
    // Enable graceful stop
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));

}

chat()

