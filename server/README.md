# Zendesk Ticket Viewer server

This is a simple _Node.js_ proxy server for the _Zendesk Ticket Viewer_.

## Setup

1. Run `npm install` to install all dependencies
2. Add `.env` file in the root, that contains the following environment variables:
    * `USERNAME=...` - email of _Zendesk_ agent account
    * `PASSWORD=...` - password of _Zendesk_ agent account
3. Run `npm run dev` to run the application in the development mode

Additional information:
* You can change _Zendesk_ API URI in `./constants/app` (`BASE_URL`)
* Run `npm test` to run the tests

## Running the server

* You can run `npm run dev` or `npm start` to start the server in the development mode
