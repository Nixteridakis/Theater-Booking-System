const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
    Name: String,
    Poster: String,
    Year: Number,
    Rating: Number,
    Genre: Array,
    Director: String,
    Price: Number,
    attendees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person'
    }]
})

module.exports = mongoose.model('Movie', MovieSchema);
