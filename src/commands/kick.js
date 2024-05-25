Filename: src/commands/kick.js

const Discord = require('discord.js');
const { permissions } = require('../utils/permissions');

module.exports = {
  name: 'kick',
  description: 'Kick a user from the server',
  execute(message, args) {
    if (!permissions.hasPermission(message.member, 'KICK_MEMBERS')) {
      return message.reply('You do not have permission to kick members');
    }

    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member.kick('Kicked by moderator').then(() => {
          message.reply(`${user.tag} was kicked from the server`);
        }).catch(err => {
          message.reply('Unable to kick the user');
          console.error(err);
        });
      } else {
        message.reply('That user is not in the server');
      }
    } else {
      message.reply('You need to mention a user to kick');
    }
  },
};