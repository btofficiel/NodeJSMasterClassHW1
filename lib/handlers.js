//Object containing handler functions
const handlers = {
    hello: (data, callback) => {
        console.log('Request recieved with data: \n', data);
        callback(200, {'message': 'Hello Handler'})

    },
    notFound: (data, callback) => {
        console.log('Request recieved with data: \n', data);
        callback(404, {'message': 'Content not found'});
    }
};

module.exports = handlers;