
# Algolia AppStore Back

[![dependencies Status](https://david-dm.org/samouss/algolia-appstore-back/status.svg)](https://david-dm.org/samouss/algolia-appstore-back) [![devDependencies Status](https://david-dm.org/samouss/algolia-appstore-back/dev-status.svg)](https://david-dm.org/samouss/algolia-appstore-back?type=dev)

Micro back end to interact with Algolia indexes, built with Express, Babel, Jest.

## Installation

Clone the repository and then run the following command:

```
npm install
```

The next step is to create the `config.json` file:

```
cp config.json.dist config.json
```

Fill the missing property `ALGOLIA_APP_ID` and `ALGOLIA_API_KEY` (grab this informations from your account).

## Run the application

- For run the dev application and launch a server in watch mode on `localhost:8080`:

```
npm start
```

- For run the production application and launch a server on `localhost:8080`:

```
npm run build && npm run serve
```

## Run the test for the application

Your tests will be executed in single run mode:

```
npm test
```

For run in watch mode:

```
npm test:watch
```
