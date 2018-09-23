//Dependencies
const http = require('http');
const https = require('https');
const fs = require('fs');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const path = require('path');
const config = require('./config');
const routes = require('./routes');
const handlers = require('./handlers');


//Unified server which could work with http and https
const unifiedServer = (req, res) => {

    //Get URL and parse it
    const parsedURL = url.parse(req.url, true);

    //Get pathname from parse URL
    const path = parsedURL.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    //Get Request Method
    const method = req.method;

    //Get the headers
    const headers = req.headers;

    //Get Query String Parameters
    const queryParameters = parsedURL.query;

    //Get the payload
    const decoder = new StringDecoder('utf-8');
    let buffer = '';

    req.on('data', (chunk) => {
        buffer += decoder.write(chunk);
    }).on('end', () => {
        buffer += decoder.end();
        const dataRecieved = {
            trimmedPath,
            queryParameters,
            headers,
            method,
            payload: buffer
        };
        const choosenHandler = typeof(routes[trimmedPath])  !== 'undefined' ? routes[trimmedPath] : handlers.notFound;

        choosenHandler(dataRecieved, (statusCode, payload) => {
            //Convert Payload to string
            var payloadString = JSON.stringify(payload);

            // Use the status code returned from the handler, or set the default status code to 200
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

            // Use the payload returned from the handler, or set the default payload to {}
            payload = typeof(payload) == 'object' ? payload : {};

            //Set Content-Type
            res.setHeader('Content-Type', 'application/json');
            
            //Set statusCode
            res.writeHead(statusCode);

            //Send response string
            res.end(payloadString);

            //Log out the payload
            console.log('Response sent - ', statusCode, payloadString);
        })
        
    });
};

//Object containing intitiation function and option for http and https server
const serverFunctions = {
    httpServer: http.createServer(unifiedServer),
    httpsOptions: {
        key: fs.readFileSync(path.join(__dirname, '/../https/key.pem')),
        cert: fs.readFileSync(path.join(__dirname, '/../https/cert.pem'))
    },
    httpsServer: https.createServer(this.httpsOptions, unifiedServer)
};

//Start listening on the configured HTTP port
const httpListen = () => {
    return serverFunctions.httpServer.listen(config.httpPort, () => {
        console.log(`The server is listening on port ${config.httpPort}`);
    });
};
//Start listening on the configured HTTPS port
const httpsListen = () => { 
    return serverFunctions.httpsServer.listen(config.httpsPort, () => {
        console.log(`The server is listening on port ${config.httpsPort}`);
    });
};

//Server object listening and inittiation functions for both protocols
const server = {
    /**
     * @description Listen to the server with the supplied protocol
     * @param {string} protocol Application Protocol
     */
    init: (protocol) => {
        protocol === 'http' ? httpListen() : httpsListen()
    }
}  

module.exports = server;