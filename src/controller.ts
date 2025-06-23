import { Request, Response } from "express";

const API_KEY = process.env.API_KEY

interface Chat {
  id: string;
}

interface Message {
  text: string;
  chat: Chat;
}

export async function bark (req: Request, res: Response) {
  try {
    const { message } = req.body as { message: Message };
    console.log("Received message:", message);

    if (!message || message.text?.trim().toLowerCase() !== 'bark') {
      return res.end();
    }

    const factRes = await fetch(`https://dogapi.dog/api/v2/facts`);
    const factData = await factRes.json();
    const factText = factData.data[0].attributes.body;

    const response = await fetch(`https://api.telegram.org/bot${API_KEY}/sendMessage`,
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
      throw new Error (`HTTP error status: ${response.status}`)
    };

    const data = await response.json();

    return data;

  } catch (err) {
    console.error("Bark handler error:", err);
    res.status(500).json({ message: `Error: ${err}` });
  }
}

