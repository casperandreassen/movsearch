# GraphQL Queries

## User

### Add a new user

Returns the newly created user if request was successfully resolved.

```
mutation {
  createUser(
      user:{
        username: "olanormann",
        password: "examplepassword",
        email: "example@mail.com",
        userId: UUID

  }) {
    username
    password
    email
  }
}
```

### Login a user

Query the api with the loginUser query like the example below. This will return the userid if login was successful. If no user is found or password is incorrect the api simply returns null.

```
query {
  loginUser(username:"olanormann", password: "examplepassword") {
    userId
  }
}
```

## Searching for movies

With all search queries you can specify skip and limit.

### Get all movies

Rating and direction is required. Specify headers that you want to recive. See `/src/db/schema/movieSchema.ts` for possible headers to recieve.

```
query {
  getMovies(sortBy: "rating", direction: -1, genres: [genre1, genre2 ...]) {
    *headers*
  }
}
```

You can also limit the results and skip if previous results already have been queried. Skip = Results to skip. Limit = the number of movies that is returned.

```
query {
  getMovies(sortBy: "rating", direction: -1, skip: 20, limit: 20) {
    *headers*
  }
}
```

### Search for a movie by title, actor or year

Searches titles, actors and year on a MongoDB text index with score based aggregation to deliver movies that match the search query the best. The queries does not need to exactly match titles, names etc.

```
query {
  searchMovies(title: "example", sortBy: "rating", direction: -1, skip: 0, limit: 20) {
    *headers*
  }
}
```
