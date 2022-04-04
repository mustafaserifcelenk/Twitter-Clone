const fs = require("fs");
const flatted = require("flatted");

const save = (filename, object) => {
  fs.writeFileSync(`./${filename}.json`, flatted.stringify(object, null, 2));
};

const load = (filename) => {
  const file = fs.readFileSync(`./${filename}.json`, "utf8");
  return flatted.parse(file);
};

const insert = (filename, object) => {
  const objects = load(filename, object);
  save(filename, objects.concat(object));
};

const remove = (filename, index) => {
  const objects = load(filename);

  objects.splice(index, 1);
  save(filename, objects);
};

const findByName = (filename, name) =>{
    const objects = load(filename);
    return objects.find(o => o.username == name);
}

module.exports = { save, load, insert, remove, findByName };
