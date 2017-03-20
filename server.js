let express = require('express');
let emoji = require('node-emoji').emoji;
let emojiData = require('emoji-data');
let path = require('path');

let app = express();

app.use(express.static(__dirname + '/public'));

app.listen(3000, () => {

    console.log("Server started.");
});

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/public/html/index.html');
});

app.get('/random_emojis', (req, res) => {

		// emoji array
    let emoji_array = [];

		// push each JSON with the attributes I want
    for (let i = 0; i < emojiData.all().length; i++) {
        let proxyJSON = {};
        proxyJSON[emojiData.all()[i].name] = emojiData.all()[i].render();
        emoji_array.push(proxyJSON);
    }

    // make a result array => 7
    let result_array = [];

    // get random number for array and push onto the result array
    for (let i = 0; i < 7; i++) {
        let random = Math.floor(Math.random() * (844 - 0 + 1)) + 0;
        result_array.push(emoji_array[random]);
    }

		// send that result array over
    res.json(result_array);
});
