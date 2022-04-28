const express = require('express');
const cors = require('cors');

const PORT = 3001;
const app = express();

app.use(cors());

let count = 0;

app.get('/', (req, res) => {
    count++;
    const response = {greeting: `hello world ${count}`}

    res.send(JSON.stringify(response));
})


app.listen(PORT, () => console.log(`listening on Port ${PORT}`));