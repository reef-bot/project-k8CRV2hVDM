const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config/config.json');
const permissions = require('./utils/permissions');
const logger = require('./utils/logger');
const integration = require('./utils/integration');

client.on('ready', () => {
  logger.info('Bot is online and ready to moderate!');
});

client.on('message', message => {
  if (message.author.bot) return;

  // Check if user has permission to use commands
  if (!permissions.hasPermission(message.author.id)) {
    message.channel.send('You do not have permission to use this bot.');
    return;
  }

  // Implement keyword filtering
  if (message.content.includes(config.keyword)) {
    message.delete();
    message.channel.send('Message containing inappropriate content has been deleted.');
  }

  // Check for command usage
  if (message.content.startsWith(config.prefix)) {
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Execute commands based on user input
    switch (command) {
      case 'warn':
        client.commands.get('warn').execute(message, args);
        break;
      case 'mute':
        client.commands.get('mute').execute(message, args);
        break;
      case 'kick':
        client.commands.get('kick').execute(message, args);
        break;
      case 'ban':
        client.commands.get('ban').execute(message, args);
        break;
      default:
        message.channel.send('Invalid command. Please try again.');
        break;
    }
  }
});

client.login(config.token);