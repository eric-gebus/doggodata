
# doggoData

doggoData is your fun Telegram buddy who loves dog facts. Just “bark” at him in chat (send a message containing “bark”), and he’ll fetch you a random dog fact in reply. Built with Node.js, Express, and TypeScript, and deployed serverlessly on Vercel using Telegram webhooks for instant responsiveness.

## Tech Stack

**Backend:** Node.js, Express, TypeScript, Axios, Body-Parser 

**Deployment:** Vercel Serverless Functions  

**API:** Telegram Bot API, Dog Facts API

## Installation

### Set up your bot 
- Open telegram on your smartphone.
- Search for the “botfather” telegram bot.
- Type /help to see all possible commands.
- Click on or type /newbot to create a new bot.
- Follow instructions and make a new screen name (anything you want) and username (needs to be unique) for your bot.
- Retrieve the API token generated

### Clone the repository

```
git clone https://github.com/yourusername/doggodata.git
cd doggodata
```

### Install dependencies
```
npm install
```

### Configure environment variables
- Copy .env.example to .env and add your Telegram Bot API token:
```
BOT_TOKEN=your_telegram_bot_token_here
DOG_FACTS_API=https://dog-api.kinduff.com/api/facts
```



## Usage/Examples

### Run locally
- Start your server locally with:
```
npm run dev
```

- Your bot will be listening on:
```
http://localhost:3000/new-message
```

### Test locally with ngrok
- Expose your local server using ngrok:
```
npx ngrok http 3000
```

- Copy the forwarding URL printed by ngrok (e.g. https://abc123.ngrok.io) and set your Telegram webhook:
```
curl -F "url=https://abc123.ngrok.io/new-message" \
https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook
```


### Deploy to Vercel
- Push your code to GitHub.

- Import your project into Vercel.

- Add your environment variables BOT_TOKEN and DOG_FACTS_API in the Vercel dashboard.

- Vercel will deploy and give you a live URL, e.g.:
```
https://doggodata.vercel.app/api/new-message
```

- Set your Telegram webhook to this URL:
```
curl -F "url=https://doggodata.vercel.app/api/new-message" \
  https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook
```

Done! Your bot is live and ready to bark.



## How it works
- User sends a message in Telegram chat.

- If the message contains the word bark, doggoData fetches a random dog fact.

- The bot replies with the dog fact in the same chat.

Example:
```
User: bark
Bot: 🐶 Did you know? Dalmatians are born completely white and develop their spots as they age!
```



## Documentation

- [Telegram Bots API](https://core.telegram.org/bots/api)
- [Dog Fact API](https://dogapi.dog/)
- [Vercel Doc](https://vercel.com/docs)
- [Express](https://expressjs.com/)



## Authors

- [@eric-gebus](https://www.github.com/-eric-gebus)

