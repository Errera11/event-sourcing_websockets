require('dotenv').config();

const express = require('express');
const cors = require('cors');
const events = require('events');
const emitter = new events.EventEmitter();

const app = express()
app.use(cors())
app.use(express.json())
PORT=process.env.PORT

try {
    app.listen(PORT, () => console.log('Started with ' + PORT));
    app.post('', (req, res) => {

    })

    app.get('', (req, res) => {

    })

} catch (e) {
    console.log(e)
}