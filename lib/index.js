//Import all libraries
const server =  require('./server');
const routes = require('./routes');
const handlers = require('./handlers');
const config = require('./config');

module.exports = {
    server,
    config,
    handlers,
    routes
};