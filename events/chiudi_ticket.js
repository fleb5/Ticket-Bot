/*
  _____.__        ___.    .________
_/ ____\  |   ____\_ |__  |   ____/
\   __\|  | _/ __ \| __ \ |____  \ 
 |  |  |  |_\  ___/| \_\ \/       \
 |__|  |____/\___  >___  /______  /
                 \/    \/       \/ 
        Developed by fleb5
*/
module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isButton()){
            if (interaction.customId == "chiudi_ticket") {
                if (interaction.member?.roles.cache.has(client.config.ruoli.staffgen)){
                    interaction.deferUpdate();
                    const embed = new client.discord.MessageEmbed()
                        .setTitle("**__Transcript__**")
                        .setColor("BLUE")
                        .addFields(
                            { name: `Ticket Name:`, value: `${interaction.channel.name}`, inline: true },
                            { name: `Chiuso da:`, value: `<@${interaction.user.id}>`, inline: true }
                        )

                    const attachment = await client.discordTranscripts.createTranscript(interaction.channel);
                            
                    interaction.guild.channels.cache.get(client.config.stanze.log.transcript).send({ 
                        embeds: [embed],
                        files: [attachment] 
                    }).catch(console.error);

                    interaction.channel.send("Il ticket verrà eliminato in 5 secondi!");
                    setTimeout(() => {
                        interaction.channel.delete();
                    }, 5000);

                }else
                    interaction.reply({content: ":point_up:", ephemeral: true});
            }
        }
    }
}