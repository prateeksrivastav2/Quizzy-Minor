const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/minor-proj-db');

const db = mongoose.connection;

db.on('error',console.error.bind(console,'Error starting database'));

db.once('open',function(){
    console.log('Successfully started database');
});
//console.log('mongoose');
module.exports = db;