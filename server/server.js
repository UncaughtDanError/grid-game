const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userController = require('./userController');



const MONGO_URI = 'mongodb+srv://UncaughtDanError:codesmithgrads@cluster0.pkxvf.mongodb.net/Grid-Game?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('Connected to Database');
});

const PORT = 3001;
const app = express();

app.use(cors());

let count = 0;

app.get('/users', userController.getUsers, (req, res) => {
    count++;
    const response = {greeting: `hello world ${count}`}
    res.status(200);
    res.send(JSON.stringify(response));

})


app.listen(PORT, () => console.log(`listening on Port ${PORT}`));