const Tweet = require('./tweet');

class User {
    constructor(username) {
        this.username = username;
        this.tweets = new Array();
    }

    tweet(content){
        this.tweets.push(new Tweet(content));
    }
}

module.exports = User;