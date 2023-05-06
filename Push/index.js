const http = require("http");
const WebSocketServer = require("websocket").server;
let connections = [];

// Create a raw http server (this will help us create the TCP which will then pass the http server object)
const httpserver = http.createServer()

// pass the httpserver object to the WebSocket library to do all the job
const websocket = new WebSocketServer({"httpServer": httpserver});

// listeb of TCP socket
httpserver.listen(8080, () => console.log("Listening on port 8080"));

// when a legit websocker request comes listen to it and get the connection .. once you get a connection thats it!
websocket.on("request", request => {

    const connection = request.accept(null, request.origin);
    connection.on("message", message => {
        // someone just sent a message tell eveybody
        connections.forEach(c => c.send(`User${connection.socket.remotePort} says: ${message.utf8Data}`));
    })

    connections.push(connection);
    // someone just connected, tell everbody
    connections.forEach(c => c.send(`User${connection.socket.remotePort} just connected.`));

})


// client code
// let ws = new WebSocket("ws://localhost:8080");
// ws.onmessage = message => console.log(`Received: ${message.data}`);
// ws.send("Hello! I'm client")