const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: true
    },
    urls: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Url',
        },        
    ],
})
module.exports = mongoose.model('User',userSchema)