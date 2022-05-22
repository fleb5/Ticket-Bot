/*
  _____.__        ___.    .________
_/ ____\  |   ____\_ |__  |   ____/
\   __\|  | _/ __ \| __ \ |____  \ 
 |  |  |  |_\  ___/| \_\ \/       \
 |__|  |____/\___  >___  /______  /
                 \/    \/       \/ 
        Developed by fleb5
*/
// Discord Js
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ 
    partials: ["CHANNEL"], 
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    ],
    autoReconnect: true,
    disableEveryone: true,
    fetchAllMembers: true,
});
client.discord = require('discord.js');

// Chalk
client.chalk = require("chalk");

// Fs
client.fs = require("fs");

// Transcript
client.discordTranscripts = require('discord-html-transcripts');

// Config
client.config = require('./config.json');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on("error", console.error);
client.on("warn", console.warn);
client.login(client.config.bot.token);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

client.commands = new Collection();
const commands = [];
const commandFiles = client.fs.readdirSync(`./comandi`).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./comandi/${file}`);
  client.commands.set(command.data.name, command);
  commands.push(command.data.toJSON());
};

const rest = new REST({ version: '9' }).setToken(client.config.bot.token);
(async () => {
	try {
		await rest.put(
			Routes.applicationGuildCommands(client.config.bot.clientid, client.config.server.idguild),
			{ body: commands },
		);
	} catch (error) {
		console.error(error);
	}
})();

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
  
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
  
    try {
      await command.execute(interaction, client, client.config);
    } catch (error) {
      console.error(error);
      return interaction.reply({
        content: 'C\'è stato un errore nell\'eseguire questo comando!',
        ephemeral: true
      });
    };
  });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const eventFiles = client.fs.readdirSync(`./events`).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args, client));
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on('ready', () => {
  console.log(client.chalk.green("Log: ") + `Bot startato corretamente`)
  console.log(client.chalk.green("Log: ") + "BOT Connesso "+ client.chalk.blueBright("["+ client.user.tag + "]"));
  client.user.setActivity(`${client.config.bot.nomebot}`, { type: 'WATCHING' })
  console.log("Developed by: "+client.chalk.blue("fleb5"))
});