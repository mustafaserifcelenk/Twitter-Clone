const fs = require("fs");
const flatted = require("flatted");

class BaseDatabase {
  constructor(model) {
    this.model = model;
    this.filename = model.name.toLowerCase();
  }
  save(object) {
    fs.writeFileSync(
      `./${this.filename}.json`,
      flatted.stringify(object, null, 2)
    );
  }

  load() {
    const file = fs.readFileSync(`./${this.filename}.json`, "utf8");
    const objects = flatted.parse(file);

    // modeller içindeki statik create metodunu
    // return objects.map(o => new User(o.id, o.name)); 
    // olarak modeli burada yaratıp göndermek zorunda kalmamak için yaptık
    return objects.map(this.model.create);
  }

  insert(object) {
    const objects = load(this.filename, object);
    this.save(this.filename, objects.concat(object));
  }

  update(object) {
    const objects = this.load();
    const index = objects.findIndex((o) => o.id == object.id);

    if (index == -1) throw new Error(`Cannot find ${this.model.name} instance with id ${object.id}.`);

    objects.splice(index, 1, object);
    this.save(objects);
  }

  remove(index) {
    const objects = load(this.filename);

    objects.splice(index, 1);
    this.save(this.filename, objects);
  }

  findBy(property, value){
    return this.load().find(o=> o[property] == value)
  }
}

module.exports = BaseDatabase;
