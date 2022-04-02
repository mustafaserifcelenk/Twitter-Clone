const User = require('./user');
const Tweet = require('./tweet');


const mustafa = new User('Mustafa');
mustafa.tweet('Hello World');
mustafa.tweet(`It's me`);
for (const tweet of mustafa.tweets) {
    console.log(tweet.content);
}
// mustafa.tweets.foreach(tweet => {console.log(tweet.content)});