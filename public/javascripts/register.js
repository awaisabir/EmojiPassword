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
        user = $('#username').val();

        if (user === "") {
            let currentdate = new Date();
            time = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate() + " " + currentdate.getHours() + ":" + currentdate.getMinutes();
            noty({
                text: 'Enter a username!'
            });
            $.post('/csv', {
                time: time,
                site: "N/A",
                user: user,
                scheme: "unknown",
                mode: 'register',
                event: 'failure',
                data: 'data'
            }, (result) => {
                console.log(result);
            });
        } else {

            let currentdate = new Date();
            time = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate() + " " + currentdate.getHours() + ":" + currentdate.getMinutes();
            $.post('/csv', {
                time: time,
                site: "N/A",
                user: user,
                scheme: "unknown",
                mode: 'register',
                event: 'success',
                data: 'data'
            }, (result) => {
                console.log(result);
            });
            username = user;

            $('.username-wrapper').hide();
            $('.scheme-container').append('<div class="row" style="margin-top: 60px;">' +
                '<div style="margin-bottom: 20px; font-size: 18px;">Click one of the schemes below to generate a password:</div>' +
                '<div class="col-md-4 col-sm-4"><button type="button" class="btn btn-primary" id="facebook">Facebook</button></div>' +
                '<div class="col-md-4 col-sm-4"><button type="button" class="btn btn-default" id="email">Email</button></div>' +
                '<div class="col-md-4 col-sm-4"><button type="button" class="btn btn-danger" id="bank">Bank</button></div></div>' +
                '<div id="password" class="well"></div>' +
                '<div id="written-password" class="well"></div>' +
                '<div id="tryRow" class="row" style="margin-top: 50px;">' +
                '<div style="margin-bottom: 20px; font-size: 18px;">Try your password below:</div>' +
                '<button type="button" class="btn btn-warning" id="clear" style="margin-right: 40px;">Reset</button><button type="button" class="btn btn-success" id="try">Try</button></div>' +
                '</div>' +
                '<div class="row" id="gridTestArea">' +
                '<div class="col-md-8 col-sm-8" id="grid" style="margin-bottom: 100px; padding-top: 80px;"></div>' +
                '<div class="col-md-4 col-sm-4" id="inputArea" style="margin-top: 80px;">' +
                '<div id="instruct"></div>' +
                '<div id="passwordTest" class="well"></div>' +
                '<input id="textArea" class="form-control noresize"></input>' +
                '<div id="testButtons" class="row"><button id="clearPasswordTest" type="button" class="btn btn-warning" style="margin-right: 20px;">Clear</button><button id="checkPassword" type="button" class="btn btn-success">Check</button>' +
                '</div></div></div></div>');

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
            let testButtons = $('#testButtons');
            let testInstruct = $('#testInstruct');
            let testPassword = $('#testPassword');
            let passwordTest = $('#passwordTest');
            let clearPasswordTest = $('#clearPasswordTest');
            let randomTest = $('#randomTest');

            writ_pass.hide();
            gridTestArea.hide();
            try_btn.addClass("disabled");
            clear.addClass("disabled");
            //randomTest.addClass("disabled");

            // iterator and important variables
            let counter = 1;
            let schemesTested = 0;
            let rando = 0;
            let facebookClicked = false;
            let emailClicked = false;
            let bankClicked = false;
            let randomTestBegun = false;

            // important arrays for the system
            let facebookGridArray = []; // Contains 28 emojis for the fb grid
            let emailGridArray = []; // Contains 28 emojis for the email grid
            let bankGridArray = []; // Contains 28 emojis for the bank grid

            let facebookRandoArray = []; // Contains random numbers between 0 to 27 for fb
            let emailRandoArray = []; // Contains random numbers between 0 to 27 for email
            let bankRandoArray = []; // Contains random numbers between 0 to 27 for bank
            let testPasswordRandoArray = []; //Contains random numbers between 0 to 27 for test password

            let facebookPassword = []; // Contains the 5 emojis for the fb password
            let emailPassword = []; // Contains the 5 emojis for the email password
            let bankPassword = []; // Contains the 5 emojis for the bank password
            let bankPin = 0;
            let passwordTestArray = []; // Contains the 5 test emojis for the password
            let pinTest = 0;


            facebook.click(() => {
                if (counter === 1) {
                    randomTest.addClass("disabled");
                    let currentdate = new Date();
                    time = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate() + " " + currentdate.getHours() + ":" + currentdate.getMinutes();
                    $.post('/csv', {
                        time: time,
                        site: "facebook",
                        user: user,
                        scheme: "emoji",
                        mode: "create",
                        event: "success",
                        data: "data"
                    }, (result) => {
                        console.log(result);
                    })
                    facebookClicked = true;
                    $.get('/28_emojis', (data) => {
                        facebookGridArray = data;

                        // generating an array of random numbers between 0 to 27
                        for (let j = 0; j < 5; j++) {

                            let rando = Math.floor(Math.random() * (27 - 0 + 1)) + 0;

                            // prevents having duplicate indices in the facebookRandoArray
                            while (jQuery.inArray(rando, facebookRandoArray) !== -1) {
                                rando = Math.floor(Math.random() * (27 - 0 + 1)) + 0;
                            }

                            facebookRandoArray[j] = rando;

                            // uses the j-th element in facebookRandoArray to print the corresponding indexed emoji
                            for (var emoji in facebookGridArray[facebookRandoArray[j]]) {
                                if (facebookGridArray[facebookRandoArray[j]].hasOwnProperty(emoji)) {
                                    well.append(facebookGridArray[facebookRandoArray[j]][emoji]);
                                    facebookPassword[j] = facebookGridArray[facebookRandoArray[j]][emoji];
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
                    randomTest.addClass("disabled");
                    let currentdate = new Date();
                    time = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate() + " " + currentdate.getHours() + ":" + currentdate.getMinutes();
                    $.post('/csv', {
                        time: time,
                        site: "email",
                        user: user,
                        scheme: "emoji",
                        mode: 'create',
                        event: 'success',
                        data: 'data'
                    }, (result) => {
                        console.log(result);
                    });
                    emailClicked = true;
                    $.get('/28_emojis', (data) => {
                        emailGridArray = data;

                        // generating an array of random numbers between 0 to 27
                        for (let j = 0; j < 5; j++) {

                            let rando = Math.floor(Math.random() * (27 - 0 + 1)) + 0;

                            // prevents having duplicate indices in the emailRandoArray
                            while (jQuery.inArray(rando, emailRandoArray) !== -1) {
                                rando = Math.floor(Math.random() * (27 - 0 + 1)) + 0;
                            }

                            emailRandoArray[j] = rando;

                            // uses the j-th element in emailRandoArray to print the corresponding indexed emoji
                            for (var emoji in emailGridArray[emailRandoArray[j]]) {
                                if (emailGridArray[emailRandoArray[j]].hasOwnProperty(emoji)) {
                                    well.append(emailGridArray[emailRandoArray[j]][emoji]);
                                    emailPassword[j] = emailGridArray[emailRandoArray[j]][emoji];
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
                    randomTest.addClass("disabled");
                    let currentdate = new Date();
                    time = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate() + " " + currentdate.getHours() + ":" + currentdate.getMinutes();
                    $.post('/csv', {
                        time: time,
                        site: "email",
                        user: user,
                        scheme: "emoji",
                        mode: 'create',
                        event: 'success',
                        data: 'data'
                    }, (result) => {
                        console.log(result);
                    });
                    $.get('/28_emojis', (data) => {
                        bankGridArray = data;
                        bankClicked = true;
                        // generating an array of random numbers between 0 to 27
                        for (let j = 0; j < 5; j++) {

                            let rando = Math.floor(Math.random() * (27 - 0 + 1)) + 0;

                            // prevents having duplicate indices in the bankRandoArray
                            while (jQuery.inArray(rando, bankRandoArray) !== -1) {
                                rando = Math.floor(Math.random() * (27 - 0 + 1)) + 0;
                            }

                            bankRandoArray[j] = rando;

                            // uses the j-th element in bankRandoArray to print the corresponding indexed emoji
                            for (var emoji in bankGridArray[bankRandoArray[j]]) {
                                if (bankGridArray[bankRandoArray[j]].hasOwnProperty(emoji)) {
                                    well.append(bankGridArray[bankRandoArray[j]][emoji]);
                                    bankPassword[j] = bankGridArray[bankRandoArray[j]][emoji];
                                }
                            }
                        }
                    });
                    let random = Math.floor(1000 + Math.random() * 9000);
                    writ_pass.empty();
                    writ_pass.append('<p>PIN : <strong>' + random + '</strong></p>');
                    writ_pass.show();
                    bankPin = random;
                    counter++;
                }
                facebook.addClass("disabled");
                email.addClass("disabled");
                bank.addClass("disabled");
                try_btn.removeClass("disabled");
                clear.removeClass("disabled");

                let currentdate = new Date();
                time = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate() + " " + currentdate.getHours() + ":" + currentdate.getMinutes();

            });


            // randomTest.click(() => {
            //     if (counter === 1) {
            //         if ((randomTestBegun === true) && (facebookClicked === false) && (emailClicked === false) && (bankClicked === false)) {
            //             console.log("3 schemes tested, now for random schemes");
            //             $('#randomRow').append('<div id="randomSchemeButtons"><div class="btn-group" data-toggle="buttons" style="margin-top: 10px;">' +
            //                 '<label id="fbRadio" class="btn btn-default">' +
            //                 '<input type="radio" name="options" autocomplete="off">Facebook' +
            //                 '</label>' +
            //                 '<label id="emailRadio" class="btn btn-default">' +
            //                 '<input type="radio" name="options" autocomplete="off">Email' +
            //                 '</label>' +
            //                 '<label id="bankRadio" class="btn btn-default">' +
            //                 '<input type="radio" name="options" autocomplete="off">Bank' +
            //                 '</label>' +
            //                 '</div></div>');
            //             randomTestBegun = false;
            //             counter = 4;
            //             clear.removeClass("disabled");
            //         }
            //
            //         if (counter === 4) {
            //                 $('#fbRadio').click(function() {
            //                     console.log("fb is selected");
            //                     facebookClicked = true;
            //                     counter = 2;
            //                     randomTestBegun === false;
            //                     try_btn.removeClass("disabled");
            //                     $('#randomSchemeButtons').addClass("disabled"); // need to disable the radio buttons so participants cant pick anything else. Only clicking Reset will allow them to pick a new one
            //                     facebook.addClass("disabled");
            //                     email.addClass("disabled");
            //                     bank.addClass("disabled");
            //                     try_btn.removeClass("disabled");
            //                     clear.removeClass("disabled");
            //                 })
            //                 $('#emailRadio').click(function() {
            //                     console.log("email is selected");
            //                     emailClicked = true;
            //                     counter = 2;
            //                     randomTestBegun === false;
            //                     try_btn.removeClass("disabled");
            //                     $('#randomSchemeButtons').addClass("disabled");
            //                     facebook.addClass("disabled");
            //                     email.addClass("disabled");
            //                     bank.addClass("disabled");
            //                     try_btn.removeClass("disabled");
            //                     clear.removeClass("disabled");
            //                 })
            //                 $('#bankRadio').click(function() {
            //                     console.log("bank is selected");
            //                     bankClicked = true;
            //                     counter = 2;
            //                     randomTestBegun === false;
            //                     try_btn.removeClass("disabled");
            //                     $('#randomSchemeButtons').addClass("disabled");
            //                     facebook.addClass("disabled");
            //                     email.addClass("disabled");
            //                     bank.addClass("disabled");
            //                     try_btn.removeClass("disabled");
            //                     clear.removeClass("disabled");
            //                 })
            //         }
            //     }
            // });


            clear.click(() => {
                well.html('');
                randomTest.removeClass("disabled");
                //randomTestBegun === false;
                if ((facebookPassword.length === 5) && (emailPassword.length === 5) && (bankPassword.length === 5)) {
                    randomTestBegun = true;
                }
                $('#randomSchemeButtons').remove();
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
                //facebookRandoArray = [];
                //emailRandoArray = [];
                //bankRandoArray = [];
                testPasswordRandoArray = [];
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
                    //checkPassword.show();
                    //clearPasswordTest.show();
                    //testButtons.show();
                    grid.append('<div id="gridInstruct" style="margin-bottom: 20px; font-size: 18px;">Click the tiles corresponding to your password:</div>');

                    // if facebook was clicked
                    if (facebookClicked === true) {
                        $('#instruct').prepend('<div id="fbInstruct" style="margin-bottom: 20px; font-size: 18px;">(Order of password does NOT matter.)</div>');
                        // ------------------------ fb grid ----------------------------
                        for (let i = 0; i < facebookGridArray.length; i++) {
                            for (var emoji in facebookGridArray[i]) {
                                if (facebookGridArray[i].hasOwnProperty(emoji)) {
                                    grid.append("<div class='btn btn-default grid' id='gridEmoji" + i + "'>" + facebookGridArray[i][emoji] + "</div>");
                                }
                            }
                            // adding newline after printing 4 emojis to create 4 X 7 grid
                            if ((i + 1) % 7 === 0) {
                                grid.append("<br/>");
                            }
                            // inserting clicked emoji into the password test array
                            $("#gridEmoji" + i).click(function() {
                                passwordTest.append("" + $(this).text());
                                passwordTestArray[passwordTestArray.length] = $(this).text();
                                testPasswordRandoArray[testPasswordRandoArray.length] = i;
                            })
                        }
                    }

                    // if email was clicked
                    if (emailClicked === true) {
                        $('#instruct').prepend('<div id="emailInstruct" style="margin-bottom: 20px; font-size: 18px;">(Order of password matters.)</div>');
                        // ------------------------ email grid ----------------------------
                        for (let i = 0; i < emailGridArray.length; i++) {
                            for (var emoji in emailGridArray[i]) {
                                if (emailGridArray[i].hasOwnProperty(emoji)) {
                                    grid.append("<div class='btn btn-default grid' id='gridEmoji" + i + "'>" + emailGridArray[i][emoji] + "</div>");
                                }
                            }
                            // adding newline after printing 4 emojis to create 4 X 7 grid
                            if ((i + 1) % 7 === 0) {
                                grid.append("<br/>");
                            }
                            // inserting clicked emoji into the password test array
                            $("#gridEmoji" + i).click(function() {
                                passwordTest.append("" + $(this).text());
                                passwordTestArray[passwordTestArray.length] = $(this).text();
                                testPasswordRandoArray[testPasswordRandoArray.length] = i;
                            })
                        }
                    }

                    // if bank was not clicked hide the text area element
                    if (bankClicked === false) {
                        textArea.hide();
                    } else {
                        $('#instruct').prepend('<div id="bankInstruct" style="margin-bottom: 20px; font-size: 18px;">(Order of password and PIN matters.)</div>');
                        textArea.show();
                        // ------------------------ bank grid ----------------------------
                        for (let i = 0; i < bankGridArray.length; i++) {
                            for (var emoji in bankGridArray[i]) {
                                if (bankGridArray[i].hasOwnProperty(emoji)) {
                                    grid.append("<div class='btn btn-default grid' id='gridEmoji" + i + "'>" + bankGridArray[i][emoji] + "</div>");
                                }
                            }
                            // adding newline after printing 4 emojis to create 4 X 7 grid
                            if ((i + 1) % 7 === 0) {
                                grid.append("<br/>");
                            }
                            // inserting clicked emoji into the password test array
                            $("#gridEmoji" + i).click(function() {
                                passwordTest.append("" + $(this).text());
                                passwordTestArray[passwordTestArray.length] = $(this).text();
                                testPasswordRandoArray[testPasswordRandoArray.length] = i;
                            })
                        }
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
                testPasswordRandoArray = [];
            });

            // click event for testing password
            checkPassword.click(() => {

                let matchingCtr = 0;
                let copies = 0;
                let duplicatesExists = false;
                let bankPinMatch = false;

                // check function for facebook
                if (facebookClicked === true) {
                    for (var i = 0; i < testPasswordRandoArray.length; i++) {
                        copies = 0;
                        // check for duplicates inside the test array
                        for (var j = 0; j < testPasswordRandoArray.length; j++) {
                            if (copies > 1) {
                                duplicatesExists = true;
                                break;
                            }
                            if (testPasswordRandoArray[i] === testPasswordRandoArray[j]) {
                                copies++;
                            }
                        }
                        // check how many matching emojis
                        if (jQuery.inArray(testPasswordRandoArray[i], facebookRandoArray) !== -1) {
                            matchingCtr++;
                        } else {
                            matchingCtr--;
                        }
                    }
                    console.log(testPasswordRandoArray);
                    console.log(facebookRandoArray);
                    if ((matchingCtr === 5) && (testPasswordRandoArray.length === 5) && (duplicatesExists === false)) {
                        noty({
                            text: 'Password is a match!'
                        });

                        gridTestArea.hide();
                        try_btn.removeClass('disabled');
                        well.html('');
                        email.removeClass('disabled');
                        bank.removeClass('disabled');
                        console.log('er0uhuierjigerbjiors[iobhjo]');
                    } else {
                        noty({
                            text: 'Password does not match!'
                        });
                    }
                }


                // check function for email
                if (emailClicked === true) {
                    for (var i = 0; i < testPasswordRandoArray.length; i++) {

                        // check how many matching emojis
                        if (testPasswordRandoArray[i] === emailRandoArray[i]) {
                            matchingCtr++;
                        } else {
                            matchingCtr--;
                        }
                    }
                    console.log(testPasswordRandoArray);
                    console.log(emailRandoArray);
                    if ((matchingCtr === 5) && (testPasswordRandoArray.length === 5)) {
                        noty({
                            text: 'Password is a match!'
                        });
                    } else {
                        noty({
                            text: 'Password does not match!'
                        });
                    }
                }


                // check function for bank
                if (bankClicked === true) {
                    for (var i = 0; i < testPasswordRandoArray.length; i++) {

                        // check how many matching emojis
                        if (testPasswordRandoArray[i] === bankRandoArray[i]) {
                            matchingCtr++;
                        } else {
                            matchingCtr--;
                        }
                    }

                    pinTest = Number($('#textArea').val());
                    if (pinTest === bankPin) {
                        bankPinMatch = true;
                    }
                    console.log(testPasswordRandoArray);
                    console.log(bankRandoArray);
                    console.log(pinTest);
                    console.log(bankPin);
                    if ((matchingCtr === 5) && (testPasswordRandoArray.length === 5) && (bankPinMatch === true)) {
                        noty({
                            text: 'Password is a match!'
                        });
                    } else {
                        noty({
                            text: 'Password does not match!'
                        });
                    }
                }


            });

        }
    });
});
