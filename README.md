# Ticket-Bot
A simple ticket bot developed with discord.js v13

![1](https://user-images.githubusercontent.com/79475133/169692136-a0794d9e-f98c-4b93-b328-7b8b8d2bc102.png)

# How to install?
```
npm install discord.js
npm install fs
npm install chalk
npm install discord-html-transcripts
```
# How to config?
```
{
    "bot": {
        "token": "token of the bot",
        "clientid": "client id of the bot",
        "nomebot": "name of the bot"
    },

    "server": {
        "idguild": "id of the guild",
        "nomeserver": "name of the server"
    },

    "ruoli": {
        "staffgen": "staff role id"
    },

    "stanze": {
        "ticket": {
            "scelta": "category id",
            "generale": "category id",
            "fazioni": "category id",
            "donazioni": "category id",
            "rimborsi": "category id",
            "ban": "category id"
        },

        "log": {
            "transcript": "transcript channel id"
        }
    }

}
```
# How to start?
```
node index.js
or
node .
```

# Many thanks to the people who will put a ⭐!
