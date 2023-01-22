# GraphQL Server

## Steps to run the application

### Setup db

Install mongodb and mongodb compass

```
brew install mongodb-community@6.0
```

Mongodb compass can be downloaded [here](https://www.mongodb.com/try/download/compass)

Verify that mongodb server is running on your machine.

```
brew services start mongodb-community@6.0
```

Open compass and create a mongodb database called movsearch. Create 3 collections movies, users and reviews. In movies import `output.json`. Navigate to indexes and create a text index for the title.

If you want to change the default mongodb url or port the server is listening you can set development and production variables in `/backend/src/config/config.ts`

Then run following commands in the backend directory to start the API.

```
   npm install
   npm start

   Open a browser and go to http://localhost:8080/graphql
```

## Server setup

Copy entire backend directory to desired directory on server.

Then run

```bash
npm install
```

You may have to install nodemon globally for nohup to work

Then you can start the server in the build directory

```bash
pm2 start index.js -m "process-name"
```

You can stop the server with

```bash
pm2 stop "process-name"
```

The graphql api can now be reached at `http://server-ip:8080/graphql`

## Technology used in server application

- `ExpressJS`
- `GraphQL`
- `NodeJS`
- `MongoDB`
- `Apollo Server`
- `Typescript`
