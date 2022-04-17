const express = require("express");
const bodyParser = require("body-parser");
const TweetRouter = require('./routes/tweet');

// express'i require ettik şimdi bundan bir web uygulaması yapıyoruz
const app = express();
app.use(bodyParser.json());

app.use('/tweet', TweetRouter);

// pug htmllerini açmak için view engine'in pug olarak değiştirilmesi gerekiyor
app.set("view engine", "pug");

// '/' : Hangi adresten çalışacağı
// req: Kullanıcıdan gelen veriler
// res: Sunucuya döndüreceğimiz veriler
app.get("/", async (req, res) => {
  res.render("index");
});

// 'listen' ile 3000. porttan sunucu başlattık
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
