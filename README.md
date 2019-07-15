# boootcamp-blessings

## The Big Big Picture

We want to build a Slack integration that will allow us to easily, permanently and publicly
record cool/nice/good things that happen in the Boootcamp.

## The Big Picture

We want to set up a (web) service to handle a few [slash
commands](https://api.slack.com/slash-commands) from Slack. There will be a
few slash commands to record things and to view the records, see who has had
the most things recorded about them, etc. These slash commands might look like...

- `/bless @capn_hoops nice boating` - "Bless" the user `@capn_hoops` for their nice boating
- `/count_blessing [optional_timeframe]` - See a record of all blessings or all blessings within some time frame

## Infrastructure

The plan today is to run the web server on [Google's Cloud
Functions](https://cloud.google.com/functions/), which is basically AWS
Lambda but Google, and track events in [Google's Cloud
Datastore](https://cloud.google.com/datastore/).

When you upload a function to Cloud Functions, you can have Google assign it
a publicly available HTTP endpoint. That's where Slack will send the requests
triggered by our slash commands in the boootcamp.

That code (that's hosted on Cloud Functions) will read and write to our
Datastore database, then send a response back to Slack with the results.

## The Little Picture

The code is written in [Typescript](http://www.typescriptlang.org/).

The entrypoint for our code is the `blessings` function in `src/index.ts`. It
receives a `req` and a `res`, just like a callback for
[Express](https://expressjs.com/en/4x/api.html#req). We even use Express's
types.

[The request Slack sends
us](https://api.slack.com/slash-commands#app_command_handling) will have a
bunch of junk in it. Roughly, that file will pull the relevant bits out of
the request and maybe send back a quick "yes we got your message" response,
then send the relevant bits of command info to `handleCommand`. That function
will do some easy error handling and call the code to handle whatever command
was sent, like `handleBlessCommand` or `handleCountBlessingsCommand`. Those
functions will handle talking to the DB and figuring out how to respond.

Please please please run, maintain and improve the end-to-end tests (which
send full fake HTTP requests to a server emulating Google Cloud Functions
with a fake db),
**especially the integration tests** (which test smaller parts of the code
like `handleBlessCommand` with a fake db), and the unit tests (which do not
exist yet). Both the end-to-end and integration tests will need a fake
Datastore emulator to be
running, which you can start beforehand with `docker-compose up`.

You can run the end-to-end tests with `yarn test:e2e` and the integration
tests with `yarn test:integration`. You can set up a watcher on the
integration tests by adding a `--watch` flag to the end of the command...I think.

## Get Started

Yell at Pete if you have trouble with any of these steps:

1. Clone this repo and check out the `dev` branch (which should be the default).
2. `yarn install` or `npm install` the dependencies.
3. Run `yarn build`.
4. Run `yarn start-dev-server`. You should see some happy chatter about a server starting. You can send a test request to `localhost:8000` if you want, although the response won't be very interesting.
5. Open a new shell and start the test database with `docker-compose up`. Keep it running.
6. With the database from step 5 running, run `yarn test:e2e`. You should see a green checkmark in the output when it's done.
7. With the database from step 5 still running, run `yarn test:integration`. You should see TWO green checkmarks in the output when it's done.
8. Start a branch, write some code and tests and add amazing new features.
9. Open a PR!
