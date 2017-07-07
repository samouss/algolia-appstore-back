## API

### GET: /api/{VERSION}

Will return the current version of the API.

- Request:

```
curl -X GET \
     -i \
     https://algolia-appstore-back.herokuapp.com/api/1
```

- Response:

```
HTTP/1.1 200 OK: {"version":1}
```

### POST: /api/{VERSION}/apps

Will add the given object to the `apps` index.
Return the `objectID` of the inserted record.

- Request:

```
curl -X POST \
     -i \
     -H "Content-Type: application/json" \
     -d '{ "category": "Games", "rating": 1.3, "name": "Sample App", "image": "http://api.com/images", "link": "http://api.com/link", "ratingCount": 12930, "price": "0 USD" }' \
     https://algolia-appstore-back.herokuapp.com/api/1/apps
```

- Response:

```
HTTP/1.1 201 Created: {"objectID":"2da65bd6-dbda-472d-adac-faf96f331349"}
```

### DELETE: /api/{VERSION}/apps/:id

Will delete the given objectID from the `apps` index.

- Request:

```
curl -X DELETE \
     -i \
     -H "Content-Type: application/json" \
     https://algolia-appstore-back.herokuapp.com/api/1/apps/2da65bd6-dbda-472d-adac-faf96f331349
```

- Response:

```
HTTP/1.1 204 No Content
```