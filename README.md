# Polls API

This API allows clients to create polls, vote on them and read their votes. Additionally, clients can also call a websocket route to receive new votes in a poll in real time.

This application was built during [NLW Expert](https://rocketseat.com.br/eventos/nlw) promoted by [Rocketseat](https://rocketseat.com.br).

## Routes

In more details, the API routes are:

```ts
interface CreatePollBody {
  title: string
  options: string[]
}

POST('/polls', (...) => {
  // Creates a new poll with the title and
  // options received from the request body
})

interface CreateVoteBody {
  pollOptionId: string
}

POST('/polls/:pollId/votes', (...) => {
  // Creates a new vote in the poll with the 
  // id received from the route parameters
  // in the option with the id received from 
  // the request body.
})

interface GetPollReturnData {
  id: string
  title: string
  options: {
    id: string
    title: string
    votes: number
  }[]
}

GET('/polls/:id', (...) => {
  // Returns the poll with the id received
  // from the route parameters.
})

WS('/polls/:pollId/results', (...) => {
  // Creates a connection with the client
  // and notifies it whenever there is a 
  // new vote in the poll with the id 
  // received from the route parameters.
})
```

## Running

Run the following commands to run this application on your machine:

```bash
# Clone this repository
git clone https://github.com/davi-costa-de-melo/polls-api

# Go to the application directory
cd polls-api

# Install dependencies
pnpm i

# Initialize PostgreSQL and Redis services
docker-compose up -d

# Set the environment variables
cp .env.example .env

# Run migrations
pnpm prisma migrate dev

# Start server
pnpm dev
```

## Technologies Used

- [Fastify](https://fastify.io) - NodeJS framework
- [Prisma](https://prisma.io) - Migrations generator and database client
- [Redis](https://redis.io) - Storage of poll vote rankings
- [Docker](https://docker.com) - Redis and PostgreSQL containers
- [TypeScript](https://typescriptlang.org) - Programming language
- [Zod](https://zod.dev) - Validation