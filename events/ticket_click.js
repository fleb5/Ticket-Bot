/*
  _____.__        ___.    .________
_/ ____\  |   ____\_ |__  |   ____/
\   __\|  | _/ __ \| __ \ |____  \ 
 |  |  |  |_\  ___/| \_\ \/       \
 |__|  |____/\___  >___  /______  /
                 \/    \/       \/ 
        Developed by fleb5
*/
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isButton()){
            if (interaction.customId == "ticket_click") {
                if (client.guilds.cache.get(interaction.guildId).channels.cache.find(c => c.topic == interaction.user.id))
                    interaction.reply({content: "Non puoi aprire un altro ticket se ne hai già uno aperto!", ephemeral: true});
                else{
                    interaction.guild.channels.create(`${interaction.user.username}-ticket`, {
                        type: "text",
                        parent: client.config.stanze.ticket.scelta,
                        topic: interaction.member?.id,


                        permissionOverwrites: [
                            { id: interaction.user.id, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'] },
                            { id: interaction.guild.id, deny: ['VIEW_CHANNEL', 'SEND_MESSAGES'] }
                        ]
                    }).then(channel => {
                        var row = new MessageActionRow().addComponents(
                            new MessageSelectMenu()
                                .setCustomId('menu_ticket')
                                .setPlaceholder('Seleziona la tipologia di supporto!')
                                .addOptions([
                                    {
                                        label: 'Ticket Generale',
                                        description: 'Premi qui per supporto generale!',
                                        value: 'op1',
                                        emoji: '🛠️',
                                    },
                                    {
                                        label: 'Ticket Fazioni',
                                        description: 'Premi qui per supporto fazioni!',
                                        value: 'op2',
                                        emoji: '🏠',
                                    },
                                    {
                                        label: 'Ticket Donazioni',
                                        description: 'Premi qui per supporto donazioni!',
                                        value: 'op3',
                                        emoji: '💵',
                                    },
                                    {
                                        label: 'Ticket Rimborsi',
                                        description: 'Premi qui per supporto rimborsi!',
                                        value: 'op4',
                                        emoji: '💸',
                                    },
                                    {
                                        label: 'Ticket Ban/Unban',
                                        description: 'Premi qui per supporto ban/unban!',
                                        value: 'op5',
                                        emoji: '🛑',
                                    },
                                ]),
                        )
                        channel.send({content: `<@${interaction.user.id}> Seleziona il motivo dell'apertura del ticket!`, components: [row]});
                        interaction.reply({content: `<@${interaction.user.id}> Grazie per aver aperto un ticket! <#${channel.id}>`, ephemeral: true});
                    });
                }
            }
        }
    }
}