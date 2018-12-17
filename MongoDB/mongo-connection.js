const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true })
        .then(() => {console.log('connected')} )