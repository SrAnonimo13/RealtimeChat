const mongoose = require('../index');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        maxlength: 30
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);