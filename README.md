# Zendesk Ticket Viewer

This is a solution to ZCC 2021 internship assignment.

## Implementation details

The solution consists of a small _Node.js_ server that proxies requests to Zendesk API and a minimal _React_ SPA that presents the data.

## Server setup

In the `server` directory:
1. Run `npm install` to install all dependencies
2. Add `.env` file in the root of `server`, that contains the following environment variables:
    * `END_USER_EMAIL=...` - email of _Zendesk_ end user account
    * `API_TOKEN=...` - _Zendesk_ API token (issued via Admin center)
3. Run `npm run dev` to run the application in the development mode (alternatively, you can run `npm start`)

Additional information:
* You can change _Zendesk_ API URI in `server/constants/app` (`BASE_URL`)
* Run `npm test` in the `server` directory to run server tests

## Client setup

In the `client` directory:
1. Run `npm install` to install all dependencies
2. Run `npm start` to run the application in the development mode

Additional information:
* Run `npm test` in the `client` directory to run client tests

## Running the application

1. Start the server by running `npm start` in the `server` directory
2. Start the client by running `npm start` in the `client` directory
3. Navigate to `https://localhost:3000` (should be opened automatically)
