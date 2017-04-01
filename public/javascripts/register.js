$(document).ready(() => {

    let user = "";
    let site = "";
    let scheme = "";
    let mode = "";
    let event = "";
    let data = "";

    let username = "";

    let register_btn = $('#register');

    register_btn.click(() => {

        let currentdate = new Date();
        time = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate() + " " + currentdate.getHours() + ":" + currentdate.getMinutes();
        site = "main";
        user = $('#username').val();
        scheme = "unknown"
        mode = register_btn.html().toLowerCase();
        event = "";
        data = "";

        if (user === "") {
            noty({
                text: 'Enter a username!'
            });
            event = "failure"
            $.post('/csv', {
                time: time,
                site: site,
                user: user,
                scheme: scheme,
                mode: mode,
                event: event,
                data: data
            });
        } else {

            event = 'success';
            $.post('/csv', {
                time: time,
                site: site,
                user: user,
                scheme: scheme,
                mode: mode,
                event: event,
                data: data
            });
            username = user;

            $('.username-wrapper').hide();
            $('.scheme-container').append('<div class="row" style="margin-top: 100px;">' +
                '<div style="margin-bottom: 20px; font-size: 18px;">Click one of the schemes below to generate a password:</div>' +
                '<div class="col-md-4 col-sm-4"><button type="button" class="btn btn-primary" id="facebook">Facebook</button></div>' +
                '<div class="col-md-4 col-sm-4"><button type="button" class="btn btn-default" id="email">Email</button></div>' +
                '<div class="col-md-4 col-sm-4"><button type="button" class="btn btn-danger" id="bank">Bank</button></div></div>' +
                '<div id="password" class="well"></div>' +
                '<div id="written-password" class="well"></div>' +
                '<div class="row" style="margin-top: 50px;">' +
                '<div style="margin-bottom: 20px; font-size: 18px;">Test your password below:</div>' +
                '<button type="button" class="btn btn-warning" id="clear" style="margin-right: 40px;">Reset</button><button type="button" class="btn btn-success" id="try">Test</button></div>' +
                '<div class="row" id="gridTestArea">' +
                '<div class="col-md-8 col-sm-8" id="grid" style="margin-bottom: 100px; padding-top: 50px;"></div>' +
                '<div class="col-md-4 col-sm-4" id="inputArea" style="margin-top: 200px;">' +
                '<div id="instruct"></div>' +
                '<div id="passwordTest" class="well"></div>' +
                '<input id="textArea" class="form-control noresize"></input>' +
                '<div class="row"><button id="clearPasswordTest" type="button" class="btn btn-warning" style="margin-right: 20px;">Clear</button><button id="checkPassword" type="button" class="btn btn-success">Check</button></div>' +
                '</div></div></div>');

            $('.scheme-container').show();

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

            writ_pass.hide();
            gridTestArea.hide();
            checkPassword.hide();
            clearPasswordTest.hide();
            try_btn.addClass("disabled");
            clear.addClass("disabled");

            // iterator and important variables
            let counter = 1;
            let rando = 0;
            let facebookClicked = false;
            let emailClicked = false;
            let bankClicked = false;

            let gridArray = []; // Contains 28 emojis for the grid
            let randoArray = []; // Contains random numbers between 0 to 27
            let facebookPassword = []; // Contains the 5 emojis for the fb password
            let emailPassword = []; // Contains the 5 emojis for the email password
            let bankPassword = []; // Contains the 5 emojis for the bank password
            let passwordTestArray = []; // Contains the 5 test emojis for the password

            facebook.click(() => {
                if (counter === 1) {
                    facebookClicked = true;
                    $.get('/28_emojis', (data) => {
                        gridArray = data;

                        // generating an array of random numbers between 0 to 27
                        for (let j = 0; j < 5; j++) {

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
                                    facebookPassword[j] = gridArray[randoArray[j]][emoji];
                                }
                            }
                        }
                    });
                    counter++;
                    let currentdate = new Date();
                    time = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate() + " " + currentdate.getHours() + ":" + currentdate.getMinutes();


                }

                facebook.addClass("disabled");
                email.addClass("disabled");
                bank.addClass("disabled");
                try_btn.removeClass("disabled");
                clear.removeClass("disabled");
            });

            email.click(() => {
                if (counter === 1) {
                    emailClicked = true;
                    $.get('/28_emojis', (data) => {
                        gridArray = data;

                        // generating an array of random numbers between 0 to 27
                        for (let j = 0; j < 5; j++) {

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
                                    emailPassword[j] = gridArray[randoArray[j]][emoji];
                                }
                            }
                        }
                    });
                    let currentdate = new Date();
                    time = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate() + " " + currentdate.getHours() + ":" + currentdate.getMinutes();
                    $.post('/csv', {
                        time: time,
                        site: "email",
                        user: username,
                        scheme: "emoji-order",
                        mode: "create",
                        event: 'success',
                        data: data
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
                        for (let j = 0; j < 5; j++) {

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
                                    bankPassword[j] = gridArray[randoArray[j]][emoji];
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

                let currentdate = new Date();
                time = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate() + " " + currentdate.getHours() + ":" + currentdate.getMinutes();
                $.post('/csv', {
                    time: time,
                    site: "bank",
                    user: username,
                    scheme: "emoji-order-pin",
                    mode: "create",
                    event: 'success',
                    data: data
                });
            });

            clear.click(() => {
                well.html('');
                facebook.removeClass("disabled");
                email.removeClass("disabled");
                bank.removeClass("disabled");
                try_btn.addClass("disabled");
                clear.addClass("disabled");
                facebookClicked = false;
                emailClicked = false;
                bankClicked = false;
                $('#instruct').html('');
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
                // printing out the grid of emojis
                if (counter === 2) {
                    //testing the contents of all 3 password arrays
                    console.log(facebookPassword);
                    console.log(emailPassword);
                    console.log(bankPassword);

                    gridTestArea.show();
                    checkPassword.show();
                    clearPasswordTest.show();
                    grid.append('<div id="gridInstruct" style="margin-bottom: 20px; font-size: 18px;">Click the tiles corresponding to your password:</div>');

                    // if facebook was clicked
                    if (facebookClicked === true) {
                        $('#instruct').prepend('<div id="fbInstruct" style="margin-bottom: 20px; font-size: 18px;">(Order of password does NOT matter.)</div>');
                    }

                    // if email was clicked
                    if (emailClicked === true) {
                        $('#instruct').prepend('<div id="emailInstruct" style="margin-bottom: 20px; font-size: 18px;">(Order of password matters.)</div>');
                    }

                    // if bank was not clicked hide the text area element
                    if (bankClicked === false) {
                        textArea.hide();
                    } else {
                        $('#instruct').prepend('<div id="bankInstruct" style="margin-bottom: 20px; font-size: 18px;">(Order of password and PIN matters.)</div>');
                        textArea.show();
                    }

                    for (let i = 0; i < gridArray.length; i++) {
                        for (var emoji in gridArray[i]) {
                            if (gridArray[i].hasOwnProperty(emoji)) {
                                grid.append("<div class='btn btn-default grid' id='gridEmoji" + i + "'>" + gridArray[i][emoji] + "</div>");
                            }
                        }

                        // adding newline after printing 4 emojis to create 4 X 7 grid
                        if ((i + 1) % 7 === 0) {
                            grid.append("<br/>");
                        }

                        $("#gridEmoji" + i).click(function() {
                            passwordTest.append("" + $(this).text());
                            passwordTestArray[passwordTestArray.length] = $(this).text();
                        })
                    }
                    counter++;
                }

                try_btn.addClass("disabled");
            });

            // click event for clearing password testing area
            clearPasswordTest.click(() => {
                passwordTest.html('');
                textArea.val('');
                passwordTestArray = [];
            });

            // click event for testing password
            checkPassword.click(() => {
                // Do this tomorrow
            });
        }
    });
});
