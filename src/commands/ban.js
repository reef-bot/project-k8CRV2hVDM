// ban.js

const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Ban a user from the server',
    execute: async (client, message, args) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) {
            return message.reply('You do not have permission to use this command');
        }

        const user = message.mentions.users.first();
        if (!user) {
            return message.reply('You need to mention a user to ban');
        }

        const member = message.guild.members.cache.get(user.id);
        if (!member) {
            return message.reply('That user is not in this server');
        }

        if (member.hasPermission('BAN_MEMBERS')) {
            return message.reply('You cannot ban this user');
        }

        try {
            await member.ban();
            const banEmbed = new MessageEmbed()
                .setColor('RED')
                .setTitle('User Banned')
                .setDescription(`${user.tag} has been banned from the server`);
            message.channel.send(banEmbed);
        } catch (error) {
            console.error(error);
            message.reply('There was an error trying to ban this user');
        }
    },
};