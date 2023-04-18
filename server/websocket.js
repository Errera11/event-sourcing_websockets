require('dotenv').config();

const express = require('express');
const cors = require('cors');
const WebSocket = require('ws')

const app = express()
app.use(cors())
app.use(express.json())
PORT=process.env.PORT

const wsServer = new WebSocket.Server({
    port: PORT
}, () => console.log('Started with ' + PORT))

wsServer.on('connection', (ws) => {
    ws.on('message', event => {
        broadcastMessage(JSON.parse(event));
    })
})

const broadcastMessage = (event) => {
    // We can send messages to specified ws with some id
    // ws - single connected user
    wsServer.clients.forEach(ws => {
        ws.send(JSON.stringify(event));
    })
}