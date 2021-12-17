const { MessageEmbed, SnowflakeUtil } = require("discord.js");

module.exports = {
    name: "clean",
    description: "Cleans the chat",
    usage: "",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["cln"],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, message, args, { GuildDB }) => {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have permission to use this command!");
        await message.channel.messages.fetch({ limit: 100, after: SnowflakeUtil.generate(Date.now() - 13 * 1000 * 60 * 60 * 24) }).then((messages) => { message.channel.bulkDelete(messages.filter(m => m.content.startsWith("!") || m.author.id == client.user.id)); });
    },

    SlashCommand: {
        /**
         *
         * @param {import("../structures/DiscordMusicBot")} client
         * @param {import("discord.js").Message} message
         * @param {string[]} args
         * @param {*} param3
         */
        run: async (client, interaction, args, { GuildDB }) => {
            const guild = client.guilds.cache.get(interaction.guild_id);
            const member = guild.members.cache.get(interaction.member.user.id);
            if (!member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have permission to use this command!");
            await interaction.channel.messages.fetch({ limit: 100 }).then((messages) => { message.channel.bulkDelete(messages.filter(m => m.content.startsWith("!") || m.author.id == client.user.id)); });
        },
    },
};
