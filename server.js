const express = require('express');
const fs = require('fs');
const emojiData = require('emoji-data');
const bodyParser = require('body-parser');
const json2csv = require('json2csv');

let app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// schema for csv record
let fields = ['time'];
let arr = [];

app.use(express.static(__dirname + '/public'));

app.listen(3000, () => {

    console.log("Server started.");
});

app.get('/', (req, res, next) => {

  res.sendFile(__dirname + '/public/html/index.html');
})

app.post('/csv', (req, res, next) => {
  let data = req.body;
  arr.push(data);

  let csv = json2csv({data: arr, fields: fields});
  fs.writeFile('./public/csv/file.csv', csv, (err) => {
    if(err)
      throw err;

    console.log('file saved');
  })

  return res.json({message: 'Reached the /csv endpoint!'});
})
