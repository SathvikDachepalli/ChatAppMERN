const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    participants: 
        {
            type: Array,
            ref: 'Users',
            required: true
        }

});

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;