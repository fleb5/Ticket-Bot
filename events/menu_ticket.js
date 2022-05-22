/*
  _____.__        ___.    .________
_/ ____\  |   ____\_ |__  |   ____/
\   __\|  | _/ __ \| __ \ |____  \ 
 |  |  |  |_\  ___/| \_\ \/       \
 |__|  |____/\___  >___  /______  /
                 \/    \/       \/ 
        Developed by fleb5
*/
const { MessageButton, MessageActionRow } = require('discord.js');
module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isSelectMenu()){
            if (interaction.customId == "menu_ticket") {
                const embed = new client.discord.MessageEmbed()
                    .setTitle(`${client.config.server.nomeserver} - Ticket`)
                    .setDescription(`**<@${interaction.user.id}> Grazie per aver aperto un ticket!** \n\n Uno Staffer sarà presto disponibile per prestarti supporto!`)
                    .setColor("BLUE")
                    .setTimestamp()

                var row = new MessageActionRow().addComponents(
                    new MessageButton()
                        .setLabel("Chiudi Ticket")
                        .setStyle("DANGER")
                        .setCustomId("chiudi_ticket"),
                )

                if(interaction.values[0] == "op1"){
                    interaction.channel.setParent(client.config.stanze.ticket.generale);
                    interaction.message.delete();

                    interaction.channel.permissionOverwrites.set([
                        { id: interaction.user.id, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'] },
                        { id: client.config.ruoli.staffgen, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'] },
                        { id: interaction.guild.id, deny: ['VIEW_CHANNEL', 'SEND_MESSAGES'] }
                    ]);

                    interaction.channel.send({embeds: [embed], components: [row]});         
                }else if(interaction.values[0] == "op2"){
                    interaction.channel.setParent(client.config.stanze.ticket.fazioni);
                    interaction.message.delete();

                    interaction.channel.permissionOverwrites.set([
                        { id: interaction.user.id, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'] },
                        { id: client.config.ruoli.staffgen, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'] },
                        { id: interaction.guild.id, deny: ['VIEW_CHANNEL', 'SEND_MESSAGES'] }
                    ]);

                    interaction.channel.send({embeds: [embed], components: [row]});
                }else if(interaction.values[0] == "op3"){
                    interaction.channel.setParent(client.config.stanze.ticket.donazioni);
                    interaction.message.delete();

                    interaction.channel.permissionOverwrites.set([
                        { id: interaction.user.id, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'] },
                        { id: client.config.ruoli.staffgen, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'] },
                        { id: interaction.guild.id, deny: ['VIEW_CHANNEL', 'SEND_MESSAGES'] }
                    ]);

                    interaction.channel.send({embeds: [embed], components: [row]});
                }else if(interaction.values[0] == "op4"){
                    interaction.channel.setParent(client.config.stanze.ticket.rimborsi);
                    interaction.message.delete();

                    interaction.channel.permissionOverwrites.set([
                        { id: interaction.user.id, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'] },
                        { id: client.config.ruoli.staffgen, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'] },
                        { id: interaction.guild.id, deny: ['VIEW_CHANNEL', 'SEND_MESSAGES'] }
                    ]);

                    interaction.channel.send({embeds: [embed], components: [row]});
                }else if(interaction.values[0] == "op5"){
                    interaction.channel.setParent(client.config.stanze.ticket.ban);
                    interaction.message.delete();

                    interaction.channel.permissionOverwrites.set([
                        { id: interaction.user.id, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'] },
                        { id: client.config.ruoli.staffgen, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'] },
                        { id: interaction.guild.id, deny: ['VIEW_CHANNEL', 'SEND_MESSAGES'] }
                    ]);

                    interaction.channel.send({embeds: [embed], components: [row]});
                }
            };
        }
    }
}