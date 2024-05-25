filename: keywordFilter.js

const keywordFilter = (message) => {
    const keywords = ['inappropriate', 'offensive', 'spam'];
    
    if (keywords.some(keyword => message.includes(keyword))) {
        // Delete message or flag it for review
        // Add any other actions needed for keyword filtering
    }
};

module.exports = keywordFilter;