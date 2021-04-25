# chat-bot
## How to run:
1. run `yarn start-db` and wait until it is finished processing
2. run `yarn build`
3. run `yarn prod`


### [optional]:
There is a client tool included to test socket.io, open its `index.html` in chrome to start socket connection and run messages

To view contents of a postgres database run 

`docker run --rm -p 5050:5050 thajeztah/pgadmin4` 

than visit `localhost:5050` in any browser
pass your computer's ip when configuring (not localhost)
## Technologies
    * typescript
    * expressjs
    * typeorm
    * rxjs
    * socket.io
    * mongodb
## Architecture
1. This application is stateless and it relied on message content and `previousId` to make conversation
2. Webhook is implemented on top of socket.io and is immediately listening to connections on application start


## Flow of a message
1. Socket observer receives a message containing
   1. a body
   2. a uuid from client
   3. optional `previousId` in the flow
2. the Bot will process the message and to do that it will delegate the processing to `FlowSteps`
   1. Each `FlowStep` contains logic to check whether the incoming message is relevant to it. It can also interact with database.
   2. At least one `FlowStep` will always respond to a message which guarantees a response and that each message is persisted.
3. the bot will respond to message with a `BotResponse` object



