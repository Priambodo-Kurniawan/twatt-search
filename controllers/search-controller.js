'use strict'
require('dotenv').config()
var OAuth = require('oauth');
var oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  process.env.CONSUMER_KEY,
  process.env.APPLICATION_SECRET,
  '1.0A',
  null,
  'HMAC-SHA1'
);

var findAll = (req, res) => {
  let keyword = req.headers.keyword

  let keySearch = encodeURIComponent(keyword).replace(/[!'()*]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16);
  })
  oauth.get(
    `https://api.twitter.com/1.1/search/tweets.json?q=${keySearch}`,
    process.env.TOKEN_KEY, //test user token
    process.env.SECRET_TOKEN, //test user secret
    function (e, data){
      if (e) console.error(e);
      else {
        let arr = []
        JSON.parse(data).statuses.forEach((data) => {
          let tweetData = {}
          tweetData.created_at = data.created_at
          tweetData.text = data.text
          tweetData.user_id = data.user.id
          tweetData.user_name = data.user.screen_name
          arr.push(tweetData)
        })
        res.send(arr);
      }
    });
}

module.exports = {
  findAll
}
