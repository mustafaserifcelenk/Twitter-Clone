const userDatabase = require('./database/driver-database')

const mustafa = new User(undefined, "Mustafa");
mustafa.tweet("Hello World");
mustafa.tweet(`It's me`);
const serif = new User('Serif');
serif.tweet('Hello World');
serif.tweet(`It's me`);
// mustafa.tweets.foreach(tweet => {console.log(tweet.content)});

// Database Operations

// db.save('users', [mustafa]);
// db.insert('users', [serif]);
// db.remove('users', 0);
// const users = db.load('users');
// const foundOne = db.findByName('users', 'Serif');
// console.log(foundOne.tweets[0].content);
// console.log(users);

//Base Database operations

userDatabase.save([mustafa]);
const mustafaDb = userDatabase.findByName("Mustafa");
userDatabase.update([mustafaDb]);
for (const tweet of mustafaDb.tweets) {
    console.log(tweet.content);
}


for (const tweet of mustafa.tweets) {
  console.log(tweet.content);
}