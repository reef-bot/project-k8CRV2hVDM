// Filename: mute.js

const Discord = require('discord.js');
const { permissions } = require('../utils/permissions');

module.exports = {
  name: 'mute',
  description: 'Mute a user in the server',
  execute(message, args) {
    if (!permissions.hasPermission(message.member, 'MUTE_MEMBERS')) {
      return message.reply('You do not have permission to mute users.');
    }

    const target = message.mentions.users.first();
    if (!target) {
      return message.reply('Please mention the user you want to mute.');
    }

    const member = message.guild.members.cache.get(target.id);
    if (!member) {
      return message.reply('That user is not in this server.');
    }

    const mutedRole = message.guild.roles.cache.find(role => role.name === 'Muted');
    if (!mutedRole) {
      return message.reply('Muted role not found. Please create a role named "Muted" for muting users.');
    }

    if (member.roles.cache.has(mutedRole.id)) {
      return message.reply('This user is already muted.');
    }

    member.roles.add(mutedRole)
      .then(() => {
        message.channel.send(`${target.tag} has been muted.`);
      })
      .catch(error => {
        console.error('Error muting user:', error);
        message.reply('There was an error muting the user. Please try again.');
      });
  },
};