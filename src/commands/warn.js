const { Client, Message } = require('discord.js');
const client = new Client();

client.on('message', (message) => {
    if (message.content.startsWith('!warn')) {
        const user = message.mentions.users.first();
        if (user) {
            message.channel.send(`Warning ${user.tag} for violating server rules.`);
        } else {
            message.channel.send('Please mention a user to warn.');
        }
    }
});

client.login('your-bot-token');