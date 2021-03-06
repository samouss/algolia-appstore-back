# Algolia AppStore Back

[![Build Status](https://travis-ci.org/samouss/algolia-appstore-back.svg?branch=master)](https://travis-ci.org/samouss/algolia-appstore-back) [![dependencies Status](https://david-dm.org/samouss/algolia-appstore-back/status.svg)](https://david-dm.org/samouss/algolia-appstore-back) [![devDependencies Status](https://david-dm.org/samouss/algolia-appstore-back/dev-status.svg)](https://david-dm.org/samouss/algolia-appstore-back?type=dev)

Micro back end to interact with Algolia indexes, built with Express, Babel, Jest.

Live API: [https://algolia-appstore-back.herokuapp.com](https://algolia-appstore-back.herokuapp.com) (it's a free dyno so be patient for the boot time 🙂)

## Installation

Clone the repository and then run the following command:

```
npm install
```

**Only for dev**, you should create the `.env` file in order to run the app and scripts:

```
cp .env.dist .env
```

Fill the missing property `ALGOLIA_APP_ID` and `ALGOLIA_API_KEY` ([from your Algolia dashboard](https://www.algolia.com)).

## Run the application

- For run the development application and launch a server in watch mode on `localhost:8080`:

```
npm start
```

- For run the production application and launch a server on `localhost:8080`:

```
npm run build && ALGOLIA_APP_ID=YOUR_APP_ID ALGOLIA_API_KEY=YOUR_API_KEY npm run serve
```

## Run the test for the application

Your tests will be executed in single run mode:

```
npm test
```

For run in watch mode:

```
npm run test:watch
```

## Documentation

Read the documentation [here](./docs/README.md).
