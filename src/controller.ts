import { Request, Response } from "express";


// interface Chat {
//   id: string;
// }

// interface Message {
//   text: string;
//   chat: Chat;
// }

export async function bark (req: Request, res: Response): Promise<void> {
  try {

    if (!process.env.API_KEY) {
      throw new Error('Missing Telegram API key');
    }
    // const { message } = req.body as { message: Message };
    const { message } = req.body;

    console.log("Received message:", message);

    if (!message) {
      res.end();
      return
    }

    // const factRes = await fetch(`https://dogapi.dog/api/v2/facts`);
    // const factData = await factRes.json();
    // const factText = factData.data[0].attributes.body;

    // const response = await fetch(`https://api.telegram.org/bot${API_KEY}/sendMessage`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       chat_id: message.chat.id,
    //       text: factText,
    //     })
    //   }
    // )

    const telegramUrl = `https://api.telegram.org/bot${process.env.API_KEY}/sendMessage`;
    console.log("Calling:", telegramUrl);  // Debug log

    const response = await fetch(telegramUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: message.chat.id,
          text: "It Works!",
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

