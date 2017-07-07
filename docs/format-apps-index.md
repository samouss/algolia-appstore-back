## Format Apps Index

> all script should be run with babel-node (npm run babel-node)

This script is used for prepare the data for Algolia's Index, you can run it with:

```
npm run babel-node scripts/formatAppsIndex.js -- --input=INPUT_PATH --output=OUTPUT_PATH
```

You can run the script with `data.json`, it will add:

  - an unique identifier `objectID`
