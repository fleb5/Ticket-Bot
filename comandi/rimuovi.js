/*
  _____.__        ___.    .________
_/ ____\  |   ____\_ |__  |   ____/
\   __\|  | _/ __ \| __ \ |____  \ 
 |  |  |  |_\  ___/| \_\ \/       \
 |__|  |____/\___  >___  /______  /
                 \/    \/       \/ 
        Developed by fleb5
*/
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('rimuovi')
        .setDescription('Comando Rimuovi | Accessibile solo agli staffer')
        .addUserOption(option =>
            option.setName('utente')
                .setDescription('Utente: ')
                .setRequired(true)),
        
    async execute(interaction, client) {
        if (interaction.channel.name.includes('ticket')) {
            if (interaction.member?.roles.cache.has(client.config.ruoli.staffgen)){
                interaction.channel.permissionOverwrites.edit(interaction.options.getUser('utente'), {
                    VIEW_CHANNEL: false, SEND_MESSAGES: false
                });
                const embed = new client.discord.MessageEmbed()
                    .setDescription(`**${interaction.options.getUser('utente')} rimosso dal ticket da <@${interaction.user.id}>**`)
                    .setColor("RED")
                    .setTimestamp()
                interaction.reply({embeds: [embed]});
            }else
                interaction.reply({content: ":point_up:", ephemeral: true});
        }else
            interaction.reply({content: ":point_up:", ephemeral: true});
    }
}