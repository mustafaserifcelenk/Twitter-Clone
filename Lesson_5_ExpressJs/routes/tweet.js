const router = require('express').Router

router.get("/yourPage", async (req, res) => {
    const tweets = await tweets.load();
    res.render("yourPage", { tweets: tweets });
  });
  
  // dinamik olarak parametre göndermek için ':' kullanılır
  // req.params url parametrelerini barındıran özel bir objedir
  router.get("/tweetDetail/:tweetId", async (req, res) => {
    let tweet;
    tweet = await tweets.find(req.params.tweetId);
    if (!tweet) return res.status(404).send("404");
    res.render("tweetDetail", { tweet: tweet });
  });
  
  router.post("/tweets", async (req, res) => {
    const tweet = Tweet.create(req.body);
    await tweetDatabase.insert(tweet);
    res.send(tweet);
  });