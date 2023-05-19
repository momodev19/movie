const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const port = 6969;
const server = http.createServer(express);
const wss = new WebSocket.Server({ server })

wss.on('connection', (ws) => {
    ws.on('message', (data) => {
        if ('ping' !== data.toString()) {
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(data.toString());
                }
            })
        }
    })
})

server.listen(port, function () {
    console.log(`Server is listening on ${port}!`)
})