let express = require('express');
let emojiData = require('emoji-data');
let path = require('path');

let app = express();

app.use(express.static(__dirname + '/public'));

app.listen(3000, () => {

    console.log("Server started.");
});
