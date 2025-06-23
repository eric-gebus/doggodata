import { Request, Response } from "express";


interface Chat {
  id: string;
}

interface Message {
  text: string;
  chat: Chat;
}

const allowedMessages: string[]= ['woof', 'waff', 'ruff', 'arf', 'wouf', 'waf', 'yap', 'growl', 'waf']

export async function bark (req: Request, res: Response): Promise<void> {
  try {

    if (!process.env.API_KEY) {
      throw new Error('Missing Telegram API key');
    }
    const { message } = req.body as { message: Message };

    console.log("Received message:", message);

    if (!message) {
      res.end();
      return
    }

    if (!allowedMessages.includes(message.text.toLowerCase())) {
        await fetch(`https://api.telegram.org/bot${process.env.API_KEY}/sendMessage`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            chat_id: message.chat.id,
            text: `I don't speak hooman, rrruff!`,
          })
        }
      )
      return
    }

    const factRes = await fetch(`https://dogapi.dog/api/v2/facts`);
    const factData = await factRes.json();
    const factText = factData.data[0].attributes.body;

    const response = await fetch(`https://api.telegram.org/bot${process.env.API_KEY}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: message.chat.id,
          text: factText,
        })
      }
    )

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Telegram API error: ${response.status} - ${errorDetails}`);
    };

    res.status(200).send('Message sent successfully');

  } catch (err) {
    console.log("Error :", err);
    res.end("Error :" + err);
  }
}

