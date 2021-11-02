const mongoose = require('../index');

const LobbySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    chat: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model('Lobby', LobbySchema);