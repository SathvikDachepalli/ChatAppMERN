const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    conversationId: {
        type:String,
    },
    senderId: {
        type:String,
    },
    message: {
        type:String,
    },
    createdAt: {
        type:Date,
        default:Date.now,
    },
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;