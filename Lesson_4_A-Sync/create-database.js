const userDatabase = require("./database/driver-database");

const mustafa = new User(undefined, "Mustafa");
mustafa.tweet("Hello World");
mustafa.tweet(`It's me`);
const serif = new User("Serif");
serif.tweet("Hello World");
serif.tweet(`It's me`);

userDatabase.save([mustafa]);
userDatabase.save([serif]);

// Buradaki problemimiz basedatabase de asenkron çalışan save metodunun burada asenkron çalışıp çalışmadığını bilmememiz. Burada asenkron yapıya bir düzenleme getirmediğimizden save metotların nasıl bir düzende çalışacaklarını bilemiyoruz. O yüzden fonksiyon çağırlırken ondan bir callback fonksiyonu talep edeceğiz.

class BaseDatabase {
  save(
    object,
    callback = () => {
      console.log("internal write", this.filename);
    }
  ) {
    fs.writeFile(
      `./${this.filename}.json`,
      flatted.stringify(object, null, 2),
      callback
    );
  }
}

// Burada artık işlemi yapılacak objeyle birlikte işlem bitince yapılcak görevide gönderiyoruz. Böylece asenkron yapıya bir sıra tertip edebileceğiz.

console.log("start");
userDatabase.save([mustafa], () => {
  console.log("wrote user Mustafa");
  userDatabase.save([serif], () => {
    console.log("done");
  });
});

// Şimdi de load fonksiyonunu asenkron yapalım

class BaseDatabase {
  load(callback = () => {}) {
    fs.readFileSync(`./${this.filename}.json`, "utf8", (err, file) => {
      if (err) return callback(err);
      const objects = flatted.parse(file);
      callback(err, objects.map(this.model.create));
    });
  }
}

// callback fonksiyonlarda ilk parametre her zaman errordur. Save ederken bu if kontrolünü burada yapmaya gerek yok, save fonksiyonun çağrıldığı yerde bu kontrolü yapmak gerekiyor.

userDatabase.save([mustafa], (err) => {
  if (err) return console.error(err);
});

// Şimdi load yaptığımız yerdeki kodlamamıza bakalım

userDatabase.insert(betul, () => {
  userDatabase.load((err, users) => {
    users.foreach(printTweets);
  });
});

//! Promise

// Bİr callback fonksiyonunu çağıracağına söz vermek.

class BaseDatabase {
  save(object) {
    return new Promise((resolve, reject) => {
      fs.writeFile(
        `./${this.filename}.json`,
        flatted.stringify(object, null, 2),
        (err) => {
          if (err) return reject(err);
          resolve();
        }
      );
    });
  }
}

// Burada save fonksiyonu çağrıldığında dönüş tipi promise olduğundan, bu bize "işlem tamamlandığında ya sana reject ile hata ya da resolve ile sonuç döneceğim söz veriyorum" anlamında asenkron bir işleyiş veriyor. Promiseler kodun kütüphane kısmını sadeleştirmez ancak kullanımda sadelik sağlarlar.

userDatabase.save([mustafa, serif]).then(() => {
  console.log("wrote user");
  userDatabase.insert([mustafa], () => {
    userDatabase.load((err, users) => {
      users.foreach(printTweets);
    });
  });
});

// Şu haliyle pek basit durmuyor kod ama promiselerin faydası birbirine chain olabiliyor olmaları

const mustafaSavePromise = userDatabase.save([mustafa]);
const serifSavePromise = userDatabase.save([serif]);

mustafaSavePromise.then(serifSavePromise).catch((e) => console.log(e));

// Sona veya her promisin sonuna catch yazabilirsin

//! Await

// Promiselerin tamamlanmasını bekleme kabiliyeti

await userDatabase.save([mustafa]);
console.log('wrote user')
await userDatabase.save([serif])
console.log('done')
const betul = User.Create('Betul',['Hello World', 'It\'s me'])
await userDatabase.insert([betul])
const users = await userDatabase.load()
passengers.foreach(printTweets)

// await keywordü ile çok daha temiz bir kod elde ettik. Şimdi normal bir fonksiyonu async/await hale dönüştürmeye çalışalım

class BaseDatabase { 
  async insert(object){         // bir fonksiyonun içinde await kullanıyorsanız o fonksiyonun başında async olmalıdır.
    const objects = this.load() // load artık promise dönüyor bize, onu await etmemiz gerek
    this.save(objects.concat(object))
  }
}


class BaseDatabase {
  insert(object){
    const objects = await this.load() 
    return this.save(objects.concat(object)) // dışarıdan bu fonksiyon await ile çağrıldığından await yerine returnde kullanabiliriz
  }
}

// en nihayetinde await ile çağrılan fonksiyonun sonucunu döndürmek istiyorsak onu bir async fonksiyon içinde çağırmamız gerekiyor.

async function main(){
  await userDatabase.save([mustafa]);
  console.log('wrote user')
  await userDatabase.save([serif])
  console.log('done')
  const betul = User.Create('Betul',['Hello World', 'It\'s me'])
  await userDatabase.insert([betul])
  const users = await userDatabase.load()
  passengers.foreach(printTweets)
}

main()

// ya da

(async () => {
  await userDatabase.save([mustafa]);
  console.log('wrote user')
  await userDatabase.save([serif])
  console.log('done')
  const betul = User.Create('Betul',['Hello World', 'It\'s me'])
  await userDatabase.insert([betul])
  const users = await userDatabase.load()
  passengers.foreach(printTweets)
})


// Dış dünyayla ilgili olan herşey dosya okuma, başka sunucuya istek, veritabanı isteği gibi asenkron okuma

// Burada error handlingi try catch ile yapıyoruz.