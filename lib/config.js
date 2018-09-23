//Declare environment variables
const environment = {
    staging: {
        httpPort: 3000,
        httpsPort: 3001,
        envName: 'staging'
    },
    production: {
        httpPort: 5000,
        httpsPort: 5001,
        envName: 'production'
    }
};

//Check if NODE_ENV is a valid string, if not return empty string
const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

//Check if current environment is a valid object, if not set default to staging
const environmentToExport = typeof(environment[currentEnvironment]) === 'object' ?  environment[currentEnvironment] : environment.staging;

//Export environment
module.exports = environmentToExport;