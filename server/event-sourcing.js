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
        emitter.emit("newMessage", req.body)
        res.status(200).end();
    })

    app.get('', (req, res) => {
        res.writeHead(200, {
            "Connection": "keep-alive",
            "Content-type": "text/event-stream",
            "Cache-Control": "no-cache"
        })
        emitter.on('newMessage', message => {
            res.write(`data: ${JSON.stringify(message)} \n\n`);
        })
    })

} catch (e) {
    console.log(e)
}