$(document).ready(() => {
    /*  time   => get Date and string
    site   => the button value
    user   => grab from the username button
    scheme => emoji always
    mode   => what the user wants to do
    event  => was it a success
    data   => nobody cares
  */

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
            noty({text: 'Enter a username!'});
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
            $('#username').val('');
            register_btn.hide();
            $('.username-wrapper').append('<button type="button" class="btn btn-default" id="login">Login</button>');
        }

        let login_btn = $('#login');

        login_btn.click(() => {
            let currentdate = new Date();
            time = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate() + " " + currentdate.getHours() + ":" + currentdate.getMinutes();

            mode = login_btn.html().toLowerCase();
            data = "";

            let login_username = $('#username').val();
            if (login_username === username) {
                // display all the login stuff
                $.post('/csv', {
                    time: time,
                    site: site,
                    user: username,
                    scheme: scheme,
                    mode: mode,
                    event: 'success',
                    data: data
                });
                $('.username-wrapper').hide();

                $('.scheme-container').append('<div class="row" style="margin-top: 100px;">' +
                    '<div class="col-md-4 col-sm-4"><button type="button" class="btn btn-primary" id="facebook">Facebook</button></div>' +
                    '<div class="col-md-4 col-sm-4"><button type="button" class="btn btn-default" id="email">Email</button></div>' +
                    '<div class="col-md-4 col-sm-4"><button type="button" class="btn btn-danger" id="bank">Bank</button></div></div>' +
                    '<div id="password" class="well"></div>' +
                    '<div id="written-password" class="well"></div>' +
                    '<div class="row" style="margin-top: 50px;"><button type="button" class="btn btn-warning" id="clear">Clear</button><button type="button" class="btn btn-success" id="try">Try the Password!</button></div>' +
                    '<div class="row" id="gridTestArea"><div class="col-md-8 col-sm-8" id="grid" style="margin-bottom: 100px;"></div>' +
                    '<div class="col-md-4 col-sm-4" id="inputArea" style="margin-top: 200px;">' +
                    '<div id="passwordTest" class="well"></div>' +
                    '<textarea id="textArea" class="form-control noresize col-md-4"></textarea>' +
                    '<div class="row"><button id="clearPasswordTest" type="button" class="btn btn-warning">Clear</button><button id="checkPassword" type="button" class="btn btn-success">Check</button></div>' +
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
                //let gridEmoji = $('grid_emoji');

                // important functions at startup
                // $('.scheme-container').hide();
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
                        for (let i = 0; i < gridArray.length; i++) {
                            for (var emoji in gridArray[i]) {
                                if (gridArray[i].hasOwnProperty(emoji)) {
                                    grid.append("<div class='btn btn-default grid' id='gridEmoji" + i + "'>" + gridArray[i][emoji] + "</div>");
                                }
                            }

                            // adding newline after printing 4 emojis to create 4 X 7 grid
                            if ((i + 1) % 4 === 0) {
                                grid.append("<br/>");
                            }

                            $("#gridEmoji"+i).click(function() {
                              passwordTest.append("" + $(this).text());
                              passwordTestArray[passwordTestArray.length] = $(this).text();
                            })
                        }
                        counter++;
                    }

                    try_btn.addClass("disabled");
                });


                // Click event for emoji grid
                // grid.click(() => {
                //     let gridEmoji = $(event.target);
                //     passwordTest.append("" + gridEmoji.text());
                //     passwordTestArray[passwordTestArray.length] = gridEmoji.text();
                //     // ----------- if we click outside the grid, the whole grid gets printed. A solution to this is to only print if the length of emoji equals to at most 1
                //     console.log(passwordTestArray); // For testing if the password test array is correctly stored
                // });

                // click event for clearing password testing area
                clearPasswordTest.click(() => {
                    passwordTest.html('');
                    passwordTestArray = [];
                });


                // click event for testing password
                checkPassword.click(() => {
                    // Do this tomorrow
                });



            } else {
                noty({text: 'Username Incorrect', type: 'error'});
                $.post('/csv', {
                    time: time,
                    site: site,
                    user: username,
                    scheme: scheme,
                    mode: mode,
                    event: 'failure',
                    data: data
                });
            }
        });

    });

});
