const moongose = require('mongoose');

const ImageSchema = moongose.Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        data: Buffer,
        contentType: String
    }
});

const Image = moongose.model('Image', ImageSchema);

module.exports = Image;
