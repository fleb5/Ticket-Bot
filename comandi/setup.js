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
const { MessageButton, MessageActionRow } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Comando setup ticket| Accessibile solo agli staffer'),
        
    async execute(interaction, client) {
        if (interaction.member?.roles.cache.has(client.config.ruoli.staffgen)){
            var row = new MessageActionRow().addComponents(
                new MessageButton()
                    .setLabel("📩 | Ticket")
                    .setStyle("SECONDARY")
                    .setCustomId("ticket_click"),
            )

            const embed = new client.discord.MessageEmbed()
                .setTitle(`${client.config.server.nomeserver} - Ticket`)
                .setDescription("Seleziona uno dei pulsanti presenti qui sotto in base alle tue esigenze!")
                .addField("📩 | Ticket", "Qualsiasi tipo di supporto")
                .setColor("BLUE")
                .setTimestamp()
                
            interaction.channel.send({embeds: [embed], components: [row]});
            interaction.reply({content: "Setup eseguito correttamente!", ephemeral: true});
            
        }else
            interaction.reply({content: ":point_up:", ephemeral: true});
    }
}