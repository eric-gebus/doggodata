import { Request, Response } from "express";


interface Chat {
  id: string;
}

interface Message {
  text: string;
  chat: Chat;
}

const allowedMessages = new Set (['woof', 'waff', 'ruff', 'arf', 'wouf', 'waf', 'yap', 'growl'])

export async function bark (req: Request, res: Response): Promise<void> {
  try {
    if (!process.env.API_KEY) {
      throw new Error('Missing Telegram API key');
    }

    const { message } = req.body as { message: Message };

    console.log(message)

    if (!message || !message.text || !message.chat || !message.chat.id) {
      res.sendStatus(200);
      return;
    }

    res.sendStatus(200);

    const messageText = message.text.toLowerCase();
    let replyText = ''

    if (messageText === '/start') {
      replyText = `Awroo! Welcome to DoggoBot 🐶!\nBark at me with words like "woof", "ruff", or "growl", and I'll tell you a dog fact!`;
    } else if (!allowedMessages.has(messageText)) {
      replyText = `I don't speak hooman, rrruff!`;
    } else {
      try {
        const factRes = await fetch(`https://dogapi.dog/api/v2/facts`);
        const factData = await factRes.json();
        replyText = factData.data[0].attributes.body;
      } catch (err) {
        console.error("Failed to fetch dog fact:", err);
        replyText = `Oops! I lost my dog facts 🐾`;
      }
    }

   await fetch(`https://api.telegram.org/bot${process.env.API_KEY}/sendMessage`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: message.chat.id,
        text: replyText,
      })
    });

  } catch (err) {
    console.log("Error :", err);
  }
}

