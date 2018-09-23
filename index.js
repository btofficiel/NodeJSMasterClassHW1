/**
 * Primary file for API
 * Author: Bhaskar Thakur
 * Date: 23rd September 2018
 */

//Import libraries
const {server} = require('./lib');

//App object
const app = {
    init: () => {
        const protocol = typeof(process.env.PROTOCOL) !== 'string' ? 'https' : process.env.PROTOCOL.toLowerCase()
        //Start the server
        server.init(protocol);
    }
}

//Initiate app
app.init();