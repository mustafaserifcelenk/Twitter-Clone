const BaseDatabase = require("./base-database");
const User = require("../Lesson_2_NodeJs/user");

class UserDatabase extends BaseDatabase {
  findByName(name) {
    return this.load().find((o) => o.username == name);
  }
}
 
module.exports = new UserDatabase(User);
