## TweetAI

## Built with
- Node.js
- MySQL
- Drizzle
- ExpressJS
- Agenda

## Getting started
### To get a local copy of this repository kindly follow the steps below.
- Scroll to top of this current repository
- Click on the `Code` button with background color green on the right end corner
- Click on the clipboard icon on the extreme right of the dropdown to copy the repository link
- In your local PC, open your terminal or command prompt in the folder you would like to clone this repository into
- Type `git clone (copied link)` on the currently opened terminal or command prompt
- Remember to change `(copied link)` to `git@github.com:olawale-o/tweetai.git or https://github.com/olawale-o/tweetai.git` which is the name of the repository

## Running the app
### Development
#### Install
To install dependencies for the project
```bash
npm install
```
#### Setup Database
```sh
npm run db:generate
```

#### Migrate Database
```sh
npm run db:migrate
```
#### Usage
```bash
npm run dev
```
## Endpoints
To get all created bots
- GET
```sh
/api/v1/bots?page=1
```
To get all created posts created by a bot
- GET
```sh
/api/v1/bots/:botId/posts?page=1
```
To get all comments for a post created by a bot
- GET
```sh
/api/v1/bots/:botId/posts/:postId/comments?page=1
```

**FOR THE BACKGROUND JOB OF CREATING BOT TO WORK MONGODB (VERSION 4+) MUST BE INSTALLED ON THE SYSTEM**

## Acknowledgments

- SmartInsight
- JSON placehoder
