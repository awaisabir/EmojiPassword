$(document).ready(() => {

    let well = $('#password');
    let facebook = $('#facebook');
    let email = $('#email');
    let bank = $('#bank');
    let clear = $('#clear');
    let writ_pass = $('#written-password');
    let try_btn = $('#try');
    let grid = $('#grid');
    let textArea = $( '#textArea');
    let gridTestArea = $( '#gridTestArea');

    // important functions at startup
    writ_pass.hide();
    gridTestArea.hide();
    try_btn.addClass("disabled");
    clear.addClass("disabled");

    // iterator variables
    let counter = 1;
    let rando = 0;
    let bankClicked = false;

    let gridArray = []; // Contains 28 emojis for the grid
    let randoArray = []; // Contains random numbers between 0 to 27
    let passwordArray = []; // Contains the 7 emojis for the password


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
        writ_pass.hide();
        gridTestArea.hide();
        randoArray = [];
        counter = 1;
    });


    try_btn.click(() => {
        well.html('');
        writ_pass.html('');
        //textArea.show();
        gridTestArea.show();

        // if bank was not clicked hide the text area element
        if (bankClicked === false) {
            textArea.hide();
        }
        else {
            textArea.show();
        }

        // printing out the grid of emojis
        if (counter === 2) {
            for (let i = 0; i < gridArray.length; i++) {
                for (var emoji in gridArray[i]) {
                    if (gridArray[i].hasOwnProperty(emoji)) {
                        grid.append(gridArray[i][emoji]);
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
});
