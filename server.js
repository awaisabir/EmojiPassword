/*
    Emoji Password backend
    Written by: @awaisabir and @TheoJA
*/

// Imports
const express = require('express');
const fs = require('fs');
const emojiData = require('emoji-data');
const bodyParser = require('body-parser');
const json2csv = require('json2csv');
let newLine = "\r\n";

// set default port to 3001 if not specified
const port = process.env.PORT || 3001;

let app = express();

// bodyParser middleware
app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());

// csv variables & headers
let arr = [];
let fields = [
    'time',
    'site',
    'user',
    'scheme',
    'mode',
    'event',
    'data'
];

// public folder for views
app.use(express.static(__dirname + '/public'));

// Start server
app.listen(port, () => {

    console.log("Server started.");
});

// default route
app.get('/', (req, res, next) => {

    res.sendFile(__dirname + '/public/html/index.html');
})

// post endpoint for generating a csv
app.post('/csv', (req, res, next) => {

    // create JSON of body
    let item = {
        time: req.body.time,
        site: req.body.site,
        user: req.body.user,
        scheme: req.body.scheme,
        mode: req.body.mode,
        event: req.body.event,
        data: req.body.data
    };
    // check if the file already exists
    fs.stat('./public/csv/file.csv', function(err, stat) {
        if (err === null) {

            let toCsv = {
                data: item,
                fields: fields,
                hasCSVColumnTitle: false
            };

            //write the actual data and end with newline
            let csv = json2csv(toCsv) + newLine;

            fs.appendFile('./public/csv/file.csv', csv, function(err) {
                if (err)
                    throw err;
            });
        } else {
            //write the headers, data & newline
            let toCsv = {
                data: item,
                fields: fields,
                hasCSVColumnTitle: true
            };
            // fields= (fields + newLine);
            let csv = json2csv(toCsv) + newLine;

            fs.writeFile('./public/csv/file.csv', csv, function(err, stat) {
                if (err)
                    throw err;
                }
            );
        }
    });

    return res.json({success: true, message: 'csv changed'});
})

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
    let result_index = [];

    // get random number for array and push onto the result array
    for (let i = 0; i < 28; i++) {
        let random = Math.floor(Math.random() * (844 - 0 + 1)) + 0;

        // prevents duplicates in the 28 emojis
        while (result_index.includes(random) !== false) {
            random = Math.floor(Math.random() * (844 - 0 + 1)) + 0;
        }
        result_index[i] = random;
        result_array.push(emoji_array[random]);
    }

    return res.json(result_array);
});
