## Format Apps index

> all script should be run with babel-node (npm run babel-node)

This script is used for prepare the data for Algolia's index, you can run it with:

```
npm run babel-node scripts/formatAppsIndex.js -- --input=INPUT_PATH --output=OUTPUT_PATH
```

- **input**

Path to the source file to prepare.

- **output**

Path to the output file.

---

You can run the script with `data.json`, it will add:

  - an unique identifier `objectID` to each record
