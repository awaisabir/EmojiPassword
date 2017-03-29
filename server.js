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

  // let data = fs.readFileSync('./public/csv/file.csv', 'UTF-8');
  // console.log(data);

  // time : for event
  // site : facebook/email/Bank
  // user : 'user'+(count+1)
  // scheme : em0ji
  // mode : create/test
  // event  : X button clicked
  // data/message   : message sent

  let item = {
    time: req.body.time,
    message: req.body.message
  }
  arr.push(item);

  let csv = json2csv({data: arr});
  fs.writeFile('./public/csv/file.csv', csv, (err) => {
    if(err)
      throw err;

    console.log('file saved');
  })

  return res.json(req.body);
})
