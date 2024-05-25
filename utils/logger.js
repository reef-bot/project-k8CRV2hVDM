// utils/logger.js

const fs = require('fs');

const logAction = (action, user, reason) => {
  const logMessage = `${new Date().toISOString()} - ${action} by ${user} - Reason: ${reason}\n`;

  fs.appendFile('moderation.log', logMessage, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });
};

module.exports = {
  logAction,
};