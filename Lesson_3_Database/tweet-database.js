const BaseDatabase = require('./base-database')
const Tweet = require('../Lesson_2_NodeJs/tweet')

class TweetDatabase extends BaseDatabase {}

module.exports = new TweetDatabase(Tweet);