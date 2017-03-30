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
