# Building a RESTful API [Homework 1]
## Instructions
* Clone the git repo
* Go to the https directory and open the terminal
* Enter following command to create SSL certficate:-
* ```bash
    sh keygen.sh
    ```
* switch batck to project directory and open the terminal and enter following command
* ```bash
    NODE_ENV=yourenvironment PROTOCOL=yourprotocol node index.js
    ```
* NODE_ENV could be either staging or production. Default is staging.
* PROTOCOL could be either HTTP or HTTPS. Default is https.
* Entering only **node index.js** command would run the app with default configuration.

## Results
* The API on route /hello returns with status code 200 and the following JSON object :-
    ```bash
    {
        "message": "Hello World!"
    }
    ```
* The API on any other route returns with status code 404 and the following JSON object:-
    ```bash
    {
        "message": "Content not found"
    }
    ```
