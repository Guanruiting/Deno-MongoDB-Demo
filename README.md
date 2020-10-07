# A demo created by Deno and mongoDB


```
deno-mongo-demo
├─ .deno_plugins
│  └─ deno_mongo_b46c3052210113f9e1610280c5cde542.dylib
├─ api.rest
├─ mongodb.ts
├─ readMe.md
├─ routes.ts
├─ server.ts
└─ type.ts

```

## server.ts
Entrance file
Start the server
```
$ deno run -A --unstable server.ts
```

## api.rest
Send API by VSCode plugin "REST Client"

## mongodb.ts
Contact to a local mongoDB database

## routes.ts
Handle router methods
export {
    getNotes,
    createNote,
    getSingleNote,
    updateNote,
    deleteNote
}