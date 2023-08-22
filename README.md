Special thanks to @DiogoFAS for helping me with the SQL schema.


### Setup
There are a few steps to setuo before running the bot, the first one being copying the .env.example to a .env file
and start filling up the values. Next is prisma.

## Prisma
To setup prisma read the official docs to create the tables and migration. Once created just run server.js
docs: https://www.prisma.io/docs/getting-started/quickstart?query=tscon&page=1

## Scripts
After creating the SQL tables we have to run trigger scripts in here, so some get changed automatically in our databse.

## TODO
- Check if "OwnGoal" event fires alongside with "Goal"
- Decide how to update timer of match
- Learn to verify body and types and such on each request