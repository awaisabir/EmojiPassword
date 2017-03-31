$(document).ready(() => {

    let well = $('#password');
    let facebook = $('#facebook');
    let email = $('#email');
    let bank = $('#bank');
    let clear = $('#clear');
    let writ_pass = $('#written-password');
    let try_btn = $('#try');
    let grid = $('#grid');
    let textArea = $('#textArea');
    let gridTestArea = $('#gridTestArea');
    let checkPassword = $('#checkPassword');
    let passwordTest = $('#passwordTest');
    let clearPasswordTest = $('#clearPasswordTest');
    //let gridEmoji = $('grid_emoji');

    // important functions at startup
    writ_pass.hide();
    gridTestArea.hide();
    checkPassword.hide();
    clearPasswordTest.hide();
    try_btn.addClass("disabled");
    clear.addClass("disabled");

    // iterator variables
    let counter = 1;
    let rando = 0;
    let bankClicked = false;

    let gridArray = []; // Contains 28 emojis for the grid
    let randoArray = []; // Contains random numbers between 0 to 27
    let passwordArray = []; // Contains the 7 emojis for the password
    let passwordTestArray = []; // Contains the 7 test emojis for the password

    facebook.click(() => {
        if (counter === 1) {
            $.get('/28_emojis', (data) => {
                gridArray = data;

                // generating an array of random numbers between 0 to 27
                for (let j = 0; j < 7; j++) {

                    let rando = Math.floor(Math.random() * (27 - 0 + 1)) + 0;

                    // prevents having duplicate indices in the randoArray
                    while (jQuery.inArray(rando, randoArray) !== -1) {
                        rando = Math.floor(Math.random() * (27 - 0 + 1)) + 0;
                    }

                    randoArray[j] = rando;

                    // uses the j-th element in randoArray to print the corresponding indexed emoji
                    for (var emoji in gridArray[randoArray[j]]) {
                        if (gridArray[randoArray[j]].hasOwnProperty(emoji)) {
                            well.append(gridArray[randoArray[j]][emoji]);
                            passwordArray[j] = gridArray[randoArray[j]][emoji];
                        }
                    }
                }
            });
            counter++;
        }

        facebook.addClass("disabled");
        email.addClass("disabled");
        bank.addClass("disabled");
        try_btn.removeClass("disabled");
        clear.removeClass("disabled");
    });


    email.click(() => {
        if (counter === 1) {
            $.get('/28_emojis', (data) => {
                gridArray = data;

                // generating an array of random numbers between 0 to 27
                for (let j = 0; j < 7; j++) {

                    let rando = Math.floor(Math.random() * (27 - 0 + 1)) + 0;

                    // prevents having duplicate indices in the randoArray
                    while (jQuery.inArray(rando, randoArray) !== -1) {
                        rando = Math.floor(Math.random() * (27 - 0 + 1)) + 0;
                    }

                    randoArray[j] = rando;

                    // uses the j-th element in randoArray to print the corresponding indexed emoji
                    for (var emoji in gridArray[randoArray[j]]) {
                        if (gridArray[randoArray[j]].hasOwnProperty(emoji)) {
                            well.append(gridArray[randoArray[j]][emoji]);
                            passwordArray[j] = gridArray[randoArray[j]][emoji];
                        }
                    }
                }
            });
            counter++;
        }
        facebook.addClass("disabled");
        email.addClass("disabled");
        bank.addClass("disabled");
        try_btn.removeClass("disabled");
        clear.removeClass("disabled");
    });


    bank.click(() => {
        if (counter === 1) {
            $.get('/28_emojis', (data) => {
                gridArray = data;
                bankClicked = true;
                // generating an array of random numbers between 0 to 27
                for (let j = 0; j < 7; j++) {

                    let rando = Math.floor(Math.random() * (27 - 0 + 1)) + 0;

                    // prevents having duplicate indices in the randoArray
                    while (jQuery.inArray(rando, randoArray) !== -1) {
                        rando = Math.floor(Math.random() * (27 - 0 + 1)) + 0;
                    }

                    randoArray[j] = rando;

                    // uses the j-th element in randoArray to print the corresponding indexed emoji
                    for (var emoji in gridArray[randoArray[j]]) {
                        if (gridArray[randoArray[j]].hasOwnProperty(emoji)) {
                            well.append(gridArray[randoArray[j]][emoji]);
                            passwordArray[j] = gridArray[randoArray[j]][emoji];
                        }
                    }
                }
            });
            let random = Math.floor(1000 + Math.random() * 9000);
            writ_pass.empty();
            writ_pass.append('<p>PIN : <strong>' + random + '</strong></p>');
            writ_pass.show();
            counter++;
        }
        facebook.addClass("disabled");
        email.addClass("disabled");
        bank.addClass("disabled");
        try_btn.removeClass("disabled");
        clear.removeClass("disabled");
    });


    clear.click(() => {
        well.html('');
        facebook.removeClass("disabled");
        email.removeClass("disabled");
        bank.removeClass("disabled");
        try_btn.addClass("disabled");
        clear.addClass("disabled");
        bankClicked = false;
        grid.html('');
        textArea.val('');
        passwordTest.html('');
        writ_pass.hide();
        gridTestArea.hide();
        checkPassword.hide();
        clearPasswordTest.hide();
        randoArray = [];
        passwordTestArray = [];
        counter = 1;
    });


    try_btn.click(() => {
        well.html('');
        writ_pass.html('');
        //textArea.show();
        gridTestArea.show();
        checkPassword.show();
        clearPasswordTest.show();

        // if bank was not clicked hide the text area element
        if (bankClicked === false) {
            textArea.hide();
        } else {
            textArea.show();
        }

        // printing out the grid of emojis
        if (counter === 2) {
            let gridEmojiCtr = 0;
            for (let i = 0; i < gridArray.length; i++) {
                for (var emoji in gridArray[i]) {
                    if (gridArray[i].hasOwnProperty(emoji)) {
                        grid.append("<div class='btn btn-default grid' id='gridEmoji" + gridEmojiCtr + "'>" + gridArray[i][emoji] + "</div>");
                        //grid.append(gridArray[i][emoji]);
                        //grid.append("</div>")
                        gridEmojiCtr++;
                    }
                }

                // adding newline after printing 4 emojis to create 4 X 7 grid
                if ((i + 1) % 4 === 0) {
                    grid.append("<br/>");
                }
            }
            counter++;
        }

        try_btn.addClass("disabled");
    });


    // Click event for emoji grid
    grid.click(() => {
        let gridEmoji = $(event.target);
        passwordTest.append("" + gridEmoji.text());
        passwordTestArray[passwordTestArray.length] = gridEmoji.text();
        // ----------- if we click outside the grid, the whole grid gets printed. A solution to this is to only print if the length of emoji equals to at most 1
        console.log(passwordTestArray); // For testing if the password test array is correctly stored
    });


    // click event for clearing password testing area
    clearPasswordTest.click(() => {
        passwordTest.html('');
        passwordTestArray = [];
    });


    // click event for testing password
    checkPassword.click(() => {
        // Do this tomorrow
    });
});
