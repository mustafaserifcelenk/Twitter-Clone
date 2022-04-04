class Tweet {
    constructor(content) {
        this.content = content;
    }

    static create(content){
        const newTweet = new Tweet(content);
        return newTweet;
    }
}

module.exports = Tweet;
