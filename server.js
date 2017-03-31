const express = require('express');
const fs = require('fs');
const emojiData = require('emoji-data');
const bodyParser = require('body-parser');
const json2csv = require('json2csv');

let app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

let arr = [];

app.use(express.static(__dirname + '/public'));

app.listen(3000, () => {

    console.log("Server started.");
});

<<<<<<< HEAD
app.get('/', (req, res, next) => {

  res.sendFile(__dirname + '/public/html/index.html');
})

app.post('/csv', (req, res, next) => {

  // time : for event
  // site : facebook/email/Bank
  // user : username <- create a prompt
  // scheme : em0ji
  // mode : what the user is trying to do (Create a password, Enter, Login)
  // event  : X button clicked
  // data/message   : message sent

  let item = {
    time:   req.body.time,
    site:   req.body.site,
    user:   req.body.user,
    scheme: req.body.scheme,
    mode:   req.body.mode,
    event:  req.body.event,
    data:   req.body.data
};
  arr.push(item);

  let csv = json2csv({data: arr});
  fs.writeFile('./public/csv/file.csv', csv, (err) => {
    if(err)
      throw err;

    console.log('file saved');
  })

  return res.json(req.body);
})
=======
app.get('/', (req, res) => {

    res.sendFile(__dirname + '/public/html/index.html');
});

// Added an endpoint to return all emojis
app.get('/28_emojis', (req, res, next) => {

  // emoji array
  let emoji_array = [];

  // push each JSON with the attributes I want
  for (let i = 0; i < emojiData.all().length; i++) {
      let proxyJSON = {};
      proxyJSON[emojiData.all()[i].name] = emojiData.all()[i].render();
      emoji_array.push(proxyJSON);
  }

    // make a result array => 28
    let result_array = [];

    // get random number for array and push onto the result array
    for (let i = 0; i < 28; i++) {
        let random = Math.floor(Math.random() * (844 - 0 + 1)) + 0;
        result_array.push(emoji_array[random]);
    }

    return res.json(result_array);
});
>>>>>>> test
