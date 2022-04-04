const Tweet = require("./tweet");
const uuid = require('uuid');

class User {
  // Veritabanından gelen tweetleri karşılamanın ilk yolu onları constructor'da karşılama
  // constructor(username, tweets = []) {
  //     this.username = username;
  //     this.tweets = tweets
  // }

  constructor(id = uuid.v4(), username) {
    this.id = id;
    this.username = username;
    this.tweets = new Array();
  }

  tweet(content) {
    this.tweets.push(new Tweet(content));
  }

  // ikinci yolu onları static classımızın içinde doldurma (Bu static class her halükarda olacaktı sadece tweet doldurma yapmayacaktık)
  static create({ id, username, tweets }) {
    const newUser = new User(id, username);
    newUser.tweets = tweets;
    return newUser;
  }
}

module.exports = User;
