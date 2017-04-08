$(document).ready(() => {

    let global_state_cheker = -1;

    let username = "";

    let register_btn = $('#register');
    let reset = $('#reset');

    reset.click(() => {
      location.reload();
    });

    // Click event for registration
    register_btn.click(() => {
        user = $('#username').val();

        if (user === "") {
            var cdate = new Date();
            time = cdate.getFullYear() + "-" + (cdate.getMonth() + 1) + "-" + cdate.getDate() + " " + cdate.getHours() + ":" + cdate.getMinutes() + ":" + cdate.getSeconds();
            noty({text: 'Enter a username!'});
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

            var cdate = new Date();
            time = cdate.getFullYear() + "-" + (cdate.getMonth() + 1) + "-" + cdate.getDate() + " " + cdate.getHours() + ":" + cdate.getMinutes()+ ":" + cdate.getSeconds();
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
            $('.scheme-container').append(`
              <div class="row" style="margin-top: 60px;">
                <h2><strong>Emoji Tester!</strong></h2>
                <div style="margin-bottom: 20px; font-size: 18px;" id="wee">Click one of the schemes below</div>
                <div class="col-md-4 col-sm-4"><button type="button" class="btn btn-primary" id="facebook">Facebook</button></div>
                <div class="col-md-4 col-sm-4"><button type="button" class="btn btn-default" id="email">Email</button></div>
                <div class="col-md-4 col-sm-4"><button type="button" class="btn btn-danger" id="bank">Bank</button></div></div>
                <div id="password" class="well"></div>
                <div id="written-password" class="well"></div>
                <div id="tryRow" class="row" style="margin-top: 50px;">
                <div style="margin-bottom: 20px; font-size: 18px;" id="too">Validate your password below:</div>
                <button type="button" class="btn btn-success" id="try">Validate</button></div></div>
                <div class="row" id="gridTestArea"><div class="col-md-8 col-sm-8" id="grid" style="margin-bottom: 100px; padding-top: 80px;"></div>
                <div class="col-md-4 col-sm-4" id="inputArea" style="margin-top: 80px;">
                <div id="instruct"></div>
                <div id="passwordTest" class="well"></div>
                <input id="textArea" class="form-control noresize"></input>
                <div id="testButtons" class="row"><button id="clearPasswordTest" type="button" class="btn btn-warning" style="margin-right: 20px;">Clear</button><button id="checkPassword" type="button" class="btn btn-success">Check</button>
              </div></div></div></div>`);

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
            let wee = $('#wee');

            writ_pass.hide();
            gridTestArea.hide();
            try_btn.addClass("disabled");
            clear.addClass("disabled");

            // iterator and important letiables
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
            let bankPin = 0; // pin for bank scheme
            let passwordTestArray = []; // Contains the 5 test emojis for the password
            let pinTest = 0; // test pin for bank scheme

            // ----------------- boolean for entering testPhase ------------------------
            let testPhaseEntered = false

            // ----------------- counter for wrong tries ------------------------------
            let facebookTestCounter = 2;
            let emailTestCounter = 2;
            let bankTestCounter = 2;

            // post request for logging purposes
            var cdate = new Date();
            time = cdate.getFullYear() + "-" + (cdate.getMonth() + 1) + "-" + cdate.getDate() + " " + cdate.getHours() + ":" + cdate.getMinutes()+ ":" +  cdate.getSeconds();
            $.post('/csv', {
                time: time,
                site: 'email',
                user: user,
                scheme: "emoji",
                mode: 'create',
                event: 'start',
                data: 'good'
            }, (result) => {
                console.log(result);
            });

            // click event for facebook button
            facebook.click(() => {
                if ((counter === 1) && (testPhaseEntered === false)) {
                    randomTest.addClass("disabled");
                    var cdate = new Date();
                    time = cdate.getFullYear() + "-" + (cdate.getMonth() + 1) + "-" + cdate.getDate() + " " + cdate.getHours() + ":" + cdate.getMinutes() + ":" + cdate.getSeconds();
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
                        for (let j = 0; j < 3; j++) {

                            let rando = Math.floor(Math.random() * (27 - 0 + 1)) + 0;

                            // prevents having duplicate indices in the facebookRandoArray
                            while (jQuery.inArray(rando, facebookRandoArray) !== -1) {
                                rando = Math.floor(Math.random() * (27 - 0 + 1)) + 0;
                            }

                            facebookRandoArray[j] = rando;

                            // uses the j-th element in facebookRandoArray to print the corresponding indexed emoji
                            for (let emoji in facebookGridArray[facebookRandoArray[j]]) {
                                if (facebookGridArray[facebookRandoArray[j]].hasOwnProperty(emoji)) {
                                    well.append(facebookGridArray[facebookRandoArray[j]][emoji]);
                                    facebookPassword[j] = facebookGridArray[facebookRandoArray[j]][emoji];
                                }
                            }
                        }
                    });
                    counter++;
                }

                // --------------Entering the test phase-------------
                if (testPhaseEntered === true) {
                    var cdate = new Date();
                    time = cdate.getFullYear() + "-" + (cdate.getMonth() + 1) + "-" + cdate.getDate() + " " + cdate.getHours() + ":" + cdate.getMinutes() + ":" + cdate.getSeconds();
                    $.post('/csv', {
                        time: time,
                        site: "facebook",
                        user: user,
                        scheme: "emoji",
                        mode: "enter",
                        event: "start",
                        data: "this is where the user entered the page load for login"
                    }, (result) => {
                        console.log(result);
                    })
                    if (counter === 1) {
                        facebookClicked = true;
                        gridTestArea.show();
                        grid.append('<div id="gridInstruct" style="margin-bottom: 20px; font-size: 18px;">Click the tiles corresponding to your password:</div>');

                        // if facebook was clicked
                        if (facebookClicked === true) {
                            $('#instruct').prepend('<div id="fbInstruct" style="margin-bottom: 20px; font-size: 18px;">(Order of password does NOT matter.)</div>');
                            // ------------------------ fb grid ----------------------------
                            for (let i = 0; i < facebookGridArray.length; i++) {
                                for (let emoji in facebookGridArray[i]) {
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
                        counter++;
                    }
                }

                facebook.addClass("disabled");
                email.addClass("disabled");
                bank.addClass("disabled");
                try_btn.removeClass("disabled");
                clear.removeClass("disabled");
            });

            // click event for email button
            email.click(() => {
                if ((counter === 1) && (testPhaseEntered === false)) {
                    randomTest.addClass("disabled");
                    var cdate = new Date();
                    time = cdate.getFullYear() + "-" + (cdate.getMonth() + 1) + "-" + cdate.getDate() + " " + cdate.getHours() + ":" + cdate.getMinutes()+ ":" + cdate.getSeconds();
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
                        for (let j = 0; j < 3; j++) {

                            let rando = Math.floor(Math.random() * (27 - 0 + 1)) + 0;

                            // prevents having duplicate indices in the emailRandoArray
                            while (jQuery.inArray(rando, emailRandoArray) !== -1) {
                                rando = Math.floor(Math.random() * (27 - 0 + 1)) + 0;
                            }

                            emailRandoArray[j] = rando;

                            // uses the j-th element in emailRandoArray to print the corresponding indexed emoji
                            for (let emoji in emailGridArray[emailRandoArray[j]]) {
                                if (emailGridArray[emailRandoArray[j]].hasOwnProperty(emoji)) {
                                    well.append(emailGridArray[emailRandoArray[j]][emoji]);
                                    emailPassword[j] = emailGridArray[emailRandoArray[j]][emoji];
                                }
                            }
                        }
                    });
                    counter++;
                }

                // --------------Entering the test phase-------------
                if (testPhaseEntered === true) {
                    var cdate = new Date();
                    time = cdate.getFullYear() + "-" + (cdate.getMonth() + 1) + "-" + cdate.getDate() + " " + cdate.getHours() + ":" + cdate.getMinutes()+ ":" + cdate.getSeconds();
                    $.post('/csv', {
                        time: time,
                        site: "email",
                        user: user,
                        scheme: "emoji",
                        mode: "enter",
                        event: "start",
                        data: "this is where the user entered the page load for login"
                    }, (result) => {
                        console.log(result);
                    })
                    if (counter === 1) {
                        console.log('This is the new Email handler');
                        emailClicked = true;
                        gridTestArea.show();
                        grid.append('<div id="gridInstruct" style="margin-bottom: 20px; font-size: 18px;">Click the tiles corresponding to your password:</div>');
                        // if email was clicked
                        if (emailClicked === true) {
                            $('#instruct').prepend('<div id="emailInstruct" style="margin-bottom: 20px; font-size: 18px;">(Order of password matters.)</div>');
                            // ------------------------ email grid ----------------------------
                            for (let i = 0; i < emailGridArray.length; i++) {
                                for (let emoji in emailGridArray[i]) {
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
                        counter++;
                    }
                }

                facebook.addClass("disabled");
                email.addClass("disabled");
                bank.addClass("disabled");
                try_btn.removeClass("disabled");
                clear.removeClass("disabled");
            });

            // click event for bank button
            bank.click(() => {

                if ((counter === 1) && (testPhaseEntered === false)) {
                    randomTest.addClass("disabled");
                    var cdate = new Date();
                    time = cdate.getFullYear() + "-" + (cdate.getMonth() + 1) + "-" + cdate.getDate() + " " + cdate.getHours() + ":" + cdate.getMinutes()+ ":" + cdate.getSeconds();
                    $.post('/csv', {
                        time: time,
                        site: "bank",
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
                        for (let j = 0; j < 3; j++) {

                            let rando = Math.floor(Math.random() * (27 - 0 + 1)) + 0;

                            // prevents having duplicate indices in the bankRandoArray
                            while (jQuery.inArray(rando, bankRandoArray) !== -1) {
                                rando = Math.floor(Math.random() * (27 - 0 + 1)) + 0;
                            }

                            bankRandoArray[j] = rando;

                            // uses the j-th element in bankRandoArray to print the corresponding indexed emoji
                            for (let emoji in bankGridArray[bankRandoArray[j]]) {
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

                // --------------Entering the test phase-------------
                if (testPhaseEntered === true) {
                    var cdate = new Date();
                    time = cdate.getFullYear() + "-" + (cdate.getMonth() + 1) + "-" + cdate.getDate() + " " + cdate.getHours() + ":" + cdate.getMinutes()+ ":" + cdate.getSeconds();
                    $.post('/csv', {
                        time: time,
                        site: "bank",
                        user: user,
                        scheme: "emoji",
                        mode: "enter",
                        event: "start",
                        data: "this is where the user entered the page load for login"
                    }, (result) => {
                        console.log(result);
                    })
                    if (counter === 1) {
                        console.log('This is the new Bank handler');
                        bankClicked = true;
                        gridTestArea.show();
                        grid.append('<div id="gridInstruct" style="margin-bottom: 20px; font-size: 18px;">Click the tiles corresponding to your password:</div>');

                        if (bankClicked === false) {
                            textArea.hide();
                        } else {
                            $('#instruct').prepend('<div id="bankInstruct" style="margin-bottom: 20px; font-size: 18px;">(Order of password and PIN matters.)</div>');
                            textArea.show();
                            // ------------------------ bank grid ----------------------------
                            for (let i = 0; i < bankGridArray.length; i++) {
                                for (let emoji in bankGridArray[i]) {
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
                }

                facebook.addClass("disabled");
                email.addClass("disabled");
                bank.addClass("disabled");
                try_btn.removeClass("disabled");
                clear.removeClass("disabled");

                var cdate = new Date();
                time = cdate.getFullYear() + "-" + (cdate.getMonth() + 1) + "-" + cdate.getDate() + " " + cdate.getHours() + ":" + cdate.getMinutes()+ ":" + cdate.getSeconds();

            });

            // click event for validate button
            try_btn.click(() => {
                // printing out the grid of emojis
                if (counter === 2) {
                    //testing the contents of all 3 password arrays
                    console.log(facebookPassword);
                    console.log(emailPassword);
                    console.log(bankPassword);

                    gridTestArea.show();
                    grid.append('<div id="gridInstruct" style="margin-bottom: 20px; font-size: 18px;">Click the tiles corresponding to your password:</div>');

                    // if facebook was clicked
                    if (facebookClicked === true) {
                        $('#instruct').prepend('<div id="fbInstruct" style="margin-bottom: 20px; font-size: 18px;">(Order of password does NOT matter.)</div>');
                        // ------------------------ fb grid ----------------------------
                        for (let i = 0; i < facebookGridArray.length; i++) {
                            for (let emoji in facebookGridArray[i]) {
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
                            for (let emoji in emailGridArray[i]) {
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
                            for (let emoji in bankGridArray[i]) {
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

            // click event for checking password
            checkPassword.click(() => {

                let matchingCtr = 0;
                let copies = 0;
                let duplicatesExists = false;
                let bankPinMatch = false;

                // check function for facebook
                if (facebookClicked === true) {
                    for (let i = 0; i < testPasswordRandoArray.length; i++) {
                        copies = 0;
                        // check for duplicates inside the test array
                        for (let j = 0; j < testPasswordRandoArray.length; j++) {
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
                    if ((matchingCtr === 3) && (testPasswordRandoArray.length === 3) && (duplicatesExists === false)) {

                        if (testPhaseEntered === false) {

                            noty({text: 'Password is a match!'});
                            var cdate = new Date();
                            time = cdate.getFullYear() + "-" + (cdate.getMonth() + 1) + "-" + cdate.getDate() + " " + cdate.getHours() + ":" + cdate.getMinutes()+ ":" + cdate.getSeconds();
                            $.post('/csv', {
                                time: time,
                                site: 'facebook',
                                user: user,
                                scheme: 'emoji',
                                mode: 'create',
                                event: 'pwtest',
                                data: 'This is a good password for the validation phase'
                            }, (result) => {
                                console.log(result);
                            });
                            well.html('');

                            email.removeClass("disabled");
                            bank.removeClass("disabled");
                            try_btn.addClass("disabled");
                            facebook.hide();
                            facebookClicked = false;
                            emailClicked = false;
                            bankClicked = false;
                            $('#instruct').html('');
                            grid.html('');
                            textArea.val('');
                            passwordTest.html('');
                            writ_pass.hide();
                            gridTestArea.hide();
                            testPasswordRandoArray = [];
                            passwordTestArray = [];
                            //facebookGridArray = [];
                            counter = 1;
                            global_state_cheker++;
                            if (global_state_cheker === 2) {
                                $('#wee').html('Welcome to your <b>Password Testing Phase!</b><br /> Pick a scheme');
                                well.hide();
                                $('#too').hide();
                                $('#try').hide();
                                $('.container').append(`
                          <div class="row" style="margin-top: 60px;">
                            <div style="margin-bottom: 20px; font-size: 18px;" id="wee">Click on any scheme to test the passwords</div>
                            <div class="col-md-4 col-sm-4"><button type="button" class="btn btn-primary" id="facebook-2">Facebook</button></div>
                            <div class="col-md-4 col-sm-4"><button type="button" class="btn btn-default" id="email-2">Email</button></div>
                            <div class="col-md-4 col-sm-4"><button type="button" class="btn btn-default" id="bank-2">Bank</button></div>
                          </div>
                        `);
                            }

                        } else {
                          $.post('/csv', {
                              time: time,
                              site: 'facebook',
                              user: user,
                              scheme: 'emoji',
                              mode: 'enter',
                              event: 'passwordSubmitted',
                              data: 'Password has been submitted'
                          }, (result) => {
                              console.log(result);
                          });

                            noty({text: 'Password is a match!'});
                            var cdate = new Date();
                            time = cdate.getFullYear() + "-" + (cdate.getMonth() + 1) + "-" + cdate.getDate() + " " + cdate.getHours() + ":" + cdate.getMinutes()+ ":" + cdate.getSeconds();


                            var cdate = new Date();
                            time = cdate.getFullYear() + "-" + (cdate.getMonth() + 1) + "-" + cdate.getDate() + " " + cdate.getHours() + ":" + cdate.getMinutes()+ ":" + cdate.getSeconds();
                            $.post('/csv', {
                                time: time,
                                site: 'facebook',
                                user: user,
                                scheme: 'emoji',
                                mode: 'login',
                                event: 'success',
                                data: 'successfull password entered for the testing phase'
                            }, (result) => {
                                console.log(result);
                            });
                            well.html('');

                            email.removeClass("disabled");
                            bank.removeClass("disabled");
                            try_btn.addClass("disabled");
                            facebook.hide();
                            facebookClicked = false;
                            emailClicked = false;
                            bankClicked = false;
                            $('#instruct').html('');
                            grid.html('');
                            textArea.val('');
                            passwordTest.html('');
                            writ_pass.hide();
                            gridTestArea.hide();
                            testPasswordRandoArray = [];
                            passwordTestArray = [];
                            //facebookGridArray = [];
                            counter = 1;
                            global_state_cheker++;
                            if (global_state_cheker === 2) {
                                $('#wee').html('Welcome to your <b>Password Testing Phase!</b><br /> Pick a scheme');
                                well.hide();
                                $('#too').hide();
                                $('#try').hide();
                                $('.container').append(`
                          <div class="row" style="margin-top: 60px;">
                            <div style="margin-bottom: 20px; font-size: 18px;" id="wee">Click on any scheme to test the passwords</div>
                            <div class="col-md-4 col-sm-4"><button type="button" class="btn btn-primary" id="facebook-2">Facebook</button></div>
                            <div class="col-md-4 col-sm-4"><button type="button" class="btn btn-default" id="email-2">Email</button></div>
                            <div class="col-md-4 col-sm-4"><button type="button" class="btn btn-default" id="bank-2">Bank</button></div>
                          </div>
                        `);
                            }

                        }

                    } else {

                        // password check for test phase
                        if (testPhaseEntered === true) {
                            if (facebookTestCounter > 0) {
                                console.log(facebookTestCounter);
                                noty({
                                    text: ('Password does not match! ' + facebookTestCounter + ' tries(try) left.')
                                });
                                facebookTestCounter--;
                                var cdate = new Date();
                                time = cdate.getFullYear() + "-" + (cdate.getMonth() + 1) + "-" + cdate.getDate() + " " + cdate.getHours() + ":" + cdate.getMinutes() + ":" + cdate.getSeconds();
                                $.post('/csv', {
                                    time: time,
                                    site: 'facebook',
                                    user: user,
                                    scheme: "emoji",
                                    mode: 'enter',
                                    event: 'passwordSubmitted',
                                    data: 'failure'
                                }, (result) => {
                                    console.log(result);
                                });
                                var cdate = new Date();
                                time = cdate.getFullYear() + "-" + (cdate.getMonth() + 1) + "-" + cdate.getDate() + " " + cdate.getHours() + ":" + cdate.getMinutes() + ":" + cdate.getSeconds();
                                $.post('/csv', {
                                    time: time,
                                    site: 'facebook',
                                    user: user,
                                    scheme: "emoji",
                                    mode: 'create',
                                    event: 'login',
                                    data: 'failure'
                                }, (result) => {
                                    console.log(result);
                                });

                                // if user got password wrong three times
                            } else if (facebookTestCounter === 0) {
                                noty({text: ('Password does not match! No more tries. Select another scheme.')});
                                var cdate = new Date();
                                time = cdate.getFullYear() + "-" + (cdate.getMonth() + 1) + "-" + cdate.getDate() + " " + cdate.getHours() + ":" + cdate.getMinutes() + ":" + cdate.getSeconds();
                                $.post('/csv', {
                                    time: time,
                                    site: 'facebook',
                                    user: user,
                                    scheme: "emoji",
                                    mode: 'enter',
                                    event: 'passwordSubmitted',
                                    data: 'failure'
                                }, (result) => {
                                    console.log(result);
                                });
                                var cdate = new Date();
                                time = cdate.getFullYear() + "-" + (cdate.getMonth() + 1) + "-" + cdate.getDate() + " " + cdate.getHours() + ":" + cdate.getMinutes()+ ":" + cdate.getSeconds();
                                $.post('/csv', {
                                    time: time,
                                    site: 'facebook',
                                    user: user,
                                    scheme: "emoji",
                                    mode: 'login',
                                    event: 'failure',
                                    data: 'Failed Login'
                                }, (result) => {
                                    console.log(result);
                                });

                                well.html('');
                                email.removeClass("disabled");
                                bank.removeClass("disabled");
                                try_btn.addClass("disabled");
                                facebook.hide();
                                facebookClicked = false;
                                emailClicked = false;
                                bankClicked = false;
                                $('#instruct').html('');
                                grid.html('');
                                textArea.val('');
                                passwordTest.html('');
                                writ_pass.hide();
                                gridTestArea.hide();
                                testPasswordRandoArray = [];
                                passwordTestArray = [];
                                //facebookGridArray = [];
                                counter = 1;
                            }

                        } else {
                            // Password not matching before test phase
                            noty({text: 'Password does not match!'});
                            var cdate = new Date();
                            time = cdate.getFullYear() + "-" + (cdate.getMonth() + 1) + "-" + cdate.getDate() + " " + cdate.getHours() + ":" + cdate.getMinutes() + ":" + cdate.getSeconds();
                            $.post('/csv', {
                                time: time,
                                site: 'facebook',
                                user: user,
                                scheme: "emoji",
                                mode: 'create',
                                event: 'pwtest',
                                data: 'bad'
                            }, (result) => {
                                console.log(result);
                            });
                        }
                    }
                }

                // check function for email
                if (emailClicked === true) {
                    for (let i = 0; i < testPasswordRandoArray.length; i++) {

                        // check how many matching emojis
                        if (testPasswordRandoArray[i] === emailRandoArray[i]) {
                            matchingCtr++;
                        } else {
                            matchingCtr--;
                        }
                    }
                    console.log(testPasswordRandoArray);
                    console.log(emailRandoArray);
                    if ((matchingCtr === 3) && (testPasswordRandoArray.length === 3)) {

                        if (testPhaseEntered === false) {
                            noty({text: 'Password is a match!'});
                            var cdate = new Date();
                            time = cdate.getFullYear() + "-" + (cdate.getMonth() + 1) + "-" + cdate.getDate() + " " + cdate.getHours() + ":" + cdate.getMinutes()+ ":" + cdate.getSeconds();
                            $.post('/csv', {
                                time: time,
                                site: 'email',
                                user: user,
                                scheme: "emoji",
                                mode: 'create',
                                event: 'pwtest',
                                data: 'THis is a a good email password for the validation phase'
                            }, (result) => {
                                console.log(result);
                            });
                            // What Awais added
                            facebook.removeClass("disabled");
                            bank.removeClass("disabled");
                            try_btn.addClass("disabled");
                            email.hide();
                            facebookClicked = false;
                            emailClicked = false;
                            bankClicked = false;
                            $('#instruct').html('');
                            well.html('');
                            grid.html('');
                            textArea.val('');
                            passwordTest.html('');
                            writ_pass.hide();
                            gridTestArea.hide();
                            testPasswordRandoArray = [];
                            passwordTestArray = [];
                            counter = 1;
                            global_state_cheker++;
                            if (global_state_cheker === 2) {
                                $('#wee').html('Welcome to your <b>Password Testing Phase!</b><br /> Pick a scheme');
                                well.hide();
                                $('#too').hide();
                                $('#try').hide();
                                $('.container').append(`
                              <div class="row" style="margin-top: 60px;">
                                <div style="margin-bottom: 20px; font-size: 18px;" id="wee">Click on any scheme to test the passwords</div>
                                <div class="col-md-4 col-sm-4"><button type="button" class="btn btn-primary" id="facebook-2">Facebook</button></div>
                                <div class="col-md-4 col-sm-4"><button type="button" class="btn btn-default" id="email-2">Email</button></div>
                                <div class="col-md-4 col-sm-4"><button type="button" class="btn btn-default" id="bank-2">Bank</button></div>
                              </div>
                            `);
                            }
                        } else {
                            noty({text: 'Password is a match!'});
                            var cdate = new Date();
                            time = cdate.getFullYear() + "-" + (cdate.getMonth() + 1) + "-" + cdate.getDate() + " " + cdate.getHours() + ":" + cdate.getMinutes() + ":" + cdate.getSeconds();
                            $.post('/csv', {
                                time: time,
                                site: 'email',
                                user: user,
                                scheme: "emoji",
                                mode: 'enter',
                                event: 'passwordSubmitted',
                                data: 'Password submitted for testing'
                            }, (result) => {
                                console.log(result);
                            });

                            var cdate = new Date();
                            time = cdate.getFullYear() + "-" + (cdate.getMonth() + 1) + "-" + cdate.getDate() + " " + cdate.getHours() + ":" + cdate.getMinutes()+ ":" + cdate.getSeconds();
                            $.post('/csv', {
                                time: time,
                                site: 'email',
                                user: user,
                                scheme: "emoji",
                                mode: 'login',
                                event: 'success',
                                data: 'the testing phase password for email is correct'
                            }, (result) => {
                                console.log(result);
                            });
                            // What Awais added
                            facebook.removeClass("disabled");
                            bank.removeClass("disabled");
                            try_btn.addClass("disabled");
                            email.hide();
                            facebookClicked = false;
                            emailClicked = false;
                            bankClicked = false;
                            $('#instruct').html('');
                            well.html('');
                            grid.html('');
                            textArea.val('');
                            passwordTest.html('');
                            writ_pass.hide();
                            gridTestArea.hide();
                            testPasswordRandoArray = [];
                            passwordTestArray = [];
                            counter = 1;
                            global_state_cheker++;
                            if (global_state_cheker === 2) {
                                $('#wee').html('Welcome to your <b>Password Testing Phase!</b><br /> Pick a scheme');
                                well.hide();
                                $('#too').hide();
                                $('#try').hide();
                                $('.container').append(`
                          <div class="row" style="margin-top: 60px;">
                            <div style="margin-bottom: 20px; font-size: 18px;" id="wee">Click on any scheme to test the passwords</div>
                            <div class="col-md-4 col-sm-4"><button type="button" class="btn btn-primary" id="facebook-2">Facebook</button></div>
                            <div class="col-md-4 col-sm-4"><button type="button" class="btn btn-default" id="email-2">Email</button></div>
                            <div class="col-md-4 col-sm-4"><button type="button" class="btn btn-default" id="bank-2">Bank</button></div>
                          </div>
                        `);
                            }

                        }

                    } else {
                        if (testPhaseEntered === true) {
                            var cdate = new Date();
                            time = cdate.getFullYear() + "-" + (cdate.getMonth() + 1) + "-" + cdate.getDate() + " " + cdate.getHours() + ":" + cdate.getMinutes() + ":" + cdate.getSeconds();
                            $.post('/csv', {
                                time: time,
                                site: "email",
                                user: user,
                                scheme: "emoji",
                                mode: "enter",
                                event: "passwordSubmitted",
                                data: "Email password submitted for testing"
                            }, (result) => {
                                console.log(result);
                            })
                            var cdate = new Date();
                            time = cdate.getFullYear() + "-" + (cdate.getMonth() + 1) + "-" + cdate.getDate() + " " + cdate.getHours() + ":" + cdate.getMinutes()+ ":" + cdate.getSeconds();
                            $.post('/csv', {
                                time: time,
                                site: "email",
                                user: user,
                                scheme: "emoji",
                                mode: "login",
                                event: "failure",
                                data: "WRONG PASWORD FOR EMAI TESTING PHASE"
                            }, (result) => {
                                console.log(result);
                            })
                            if (emailTestCounter > 0) {
                                console.log(emailTestCounter);
                                noty({
                                    text: ('Password does not match! ' + emailTestCounter + ' tries(try) left.')
                                });
                                emailTestCounter--;

                            } else if (emailTestCounter === 0) {
                                noty({text: ('Password does not match! No more tries. Select another scheme.')});
                                var cdate = new Date();
                                time = cdate.getFullYear() + "-" + (cdate.getMonth() + 1) + "-" + cdate.getDate() + " " + cdate.getHours() + ":" + cdate.getMinutes() + ":" + cdate.getSeconds();
                                $.post('/csv', {
                                    time: time,
                                    site: 'email',
                                    user: user,
                                    scheme: "emoji",
                                    mode: 'enter',
                                    event: 'passwordSubmitted',
                                    data: 'failure'
                                }, (result) => {
                                    console.log(result);
                                });
                                var cdate = new Date();
                                time = cdate.getFullYear() + "-" + (cdate.getMonth() + 1) + "-" + cdate.getDate() + " " + cdate.getHours() + ":" + cdate.getMinutes()+ ":" + cdate.getSeconds();
                                $.post('/csv', {
                                    time: time,
                                    site: 'email',
                                    user: user,
                                    scheme: "emoji",
                                    mode: 'login',
                                    event: 'failure',
                                    data: 'wrong login for email'
                                }, (result) => {
                                    console.log(result);
                                });

                                well.html('');
                                facebook.removeClass("disabled");
                                bank.removeClass("disabled");
                                try_btn.addClass("disabled");
                                email.hide();
                                facebookClicked = false;
                                emailClicked = false;
                                bankClicked = false;
                                $('#instruct').html('');
                                grid.html('');
                                textArea.val('');
                                passwordTest.html('');
                                writ_pass.hide();
                                gridTestArea.hide();
                                testPasswordRandoArray = [];
                                passwordTestArray = [];
                                //facebookGridArray = [];
                                counter = 1;
                            }

                        } else {
                            noty({text: 'Password does not match!'});
                            var cdate = new Date();
                            time = cdate.getFullYear() + "-" + (cdate.getMonth() + 1) + "-" + cdate.getDate() + " " + cdate.getHours() + ":" + cdate.getMinutes() + ":" + cdate.getSeconds();
                            $.post('/csv', {
                                time: time,
                                site: 'email',
                                user: user,
                                scheme: "emoji",
                                mode: 'create',
                                event: 'pwtest',
                                data: 'bad'
                            }, (result) => {
                                console.log(result);
                            });
                        }
                    }
                }

                // check function for bank
                if (bankClicked === true) {
                    for (let i = 0; i < testPasswordRandoArray.length; i++) {

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
                    if ((matchingCtr === 3) && (testPasswordRandoArray.length === 3) && (bankPinMatch === true)) {

                        if (testPhaseEntered === false) {
                            noty({text: 'Password is a match!'});
                            var cdate = new Date();
                            time = cdate.getFullYear() + "-" + (cdate.getMonth() + 1) + "-" + cdate.getDate() + " " + cdate.getHours() + ":" + cdate.getMinutes() + ":" + cdate.getSeconds();
                            $.post('/csv', {
                                time: time,
                                site: 'bank',
                                user: user,
                                scheme: 'emoji',
                                mode: 'create',
                                event: 'pwtest',
                                data: 'good'
                            }, (result) => {
                                console.log(result);
                            });

                            email.removeClass("disabled");
                            facebook.removeClass("disabled");
                            try_btn.addClass("disabled");
                            bank.hide();
                            facebookClicked = false;
                            emailClicked = false;
                            bankClicked = false;
                            $('#instruct').html('');
                            well.html('');
                            grid.html('');
                            textArea.val('');
                            textArea.hide();
                            passwordTest.html('');
                            writ_pass.hide();
                            gridTestArea.hide();
                            testPasswordRandoArray = [];
                            passwordTestArray = [];
                            //emailGridArray = [];
                            counter = 1;
                            global_state_cheker++;
                            if (global_state_cheker === 2) {

                                facebook.show();
                                email.show();
                                bank.show();
                                bank.removeClass('disabled');
                                well.hide();
                                grid.html('');
                                $('#instruct').html('');
                                $('#tryRow').html('');
                                $('#textArea').hide();
                                testPhaseEntered = true;

                            }

                        } else {
                            noty({text: 'Password is a match!'});
                            var cdate = new Date();
                            time = cdate.getFullYear() + "-" + (cdate.getMonth() + 1) + "-" + cdate.getDate() + " " + cdate.getHours() + ":" + cdate.getMinutes() + ":" + cdate.getSeconds();
                            $.post('/csv', {
                                time: time,
                                site: 'bank',
                                user: user,
                                scheme: 'emoji',
                                mode: 'enter',
                                event: 'passwordSubmitted',
                                data: 'bank password submitted for testing'
                            }, (result) => {
                                console.log(result);
                            });

                            var cdate = new Date();
                            time = cdate.getFullYear() + "-" + (cdate.getMonth() + 1) + "-" + cdate.getDate() + " " + cdate.getHours() + ":" + cdate.getMinutes() + ":" + cdate.getSeconds();
                            $.post('/csv', {
                                time: time,
                                site: 'bank',
                                user: user,
                                scheme: 'emoji',
                                mode: 'login',
                                event: 'success',
                                data: 'Bank password is right'
                            }, (result) => {
                                console.log(result);
                            });

                            email.removeClass("disabled");
                            facebook.removeClass("disabled");
                            try_btn.addClass("disabled");
                            bank.hide();
                            facebookClicked = false;
                            emailClicked = false;
                            bankClicked = false;
                            $('#instruct').html('');
                            well.html('');
                            grid.html('');
                            textArea.val('');
                            textArea.hide();
                            passwordTest.html('');
                            writ_pass.hide();
                            gridTestArea.hide();
                            testPasswordRandoArray = [];
                            passwordTestArray = [];
                            //emailGridArray = [];
                            counter = 1;
                            global_state_cheker++;
                            if (global_state_cheker === 2) {

                                facebook.show();
                                email.show();
                                bank.show();
                                bank.removeClass('disabled');
                                well.hide();
                                grid.html('');
                                $('#instruct').html('');
                                $('#tryRow').html('');
                                $('#textArea').hide();
                                testPhaseEntered = true;

                            }

                        }
                    } else {
                        if (testPhaseEntered === true) {
                            if (bankTestCounter > 0) {
                                console.log(bankTestCounter);
                                noty({
                                    text: ('Password does not match! ' + bankTestCounter + ' tries(try) left.')
                                });
                                bankTestCounter--;
                                var cdate = new Date();
                                time = cdate.getFullYear() + "-" + (cdate.getMonth() + 1) + "-" + cdate.getDate() + " " + cdate.getHours() + ":" + cdate.getMinutes() + ":" + cdate.getSeconds();
                                $.post('/csv', {
                                    time: time,
                                    site: 'bank',
                                    user: user,
                                    scheme: "emoji",
                                    mode: 'enter',
                                    event: 'passwordSubmitted',
                                    data: 'failure'
                                }, (result) => {
                                    console.log(result);
                                });
                                var cdate = new Date();
                                time = cdate.getFullYear() + "-" + (cdate.getMonth() + 1) + "-" + cdate.getDate() + " " + cdate.getHours() + ":" + cdate.getMinutes() + ":" + cdate.getSeconds();
                                $.post('/csv', {
                                    time: time,
                                    site: 'bank',
                                    user: user,
                                    scheme: "emoji",
                                    mode: 'login',
                                    event: 'failure',
                                    data: 'bank password entered s wrong'
                                }, (result) => {
                                    console.log(result);
                                });

                            } else if (bankTestCounter === 0) {
                                noty({text: ('Password does not match! No more tries. Select another scheme.')});
                                var cdate = new Date();
                                time = cdate.getFullYear() + "-" + (cdate.getMonth() + 1) + "-" + cdate.getDate() + " " + cdate.getHours() + ":" + cdate.getMinutes() + ":" + cdate.getSeconds();
                                $.post('/csv', {
                                    time: time,
                                    site: 'bank',
                                    user: user,
                                    scheme: "emoji",
                                    mode: 'enter',
                                    event: 'passwordSubmitted',
                                    data: 'failure'
                                }, (result) => {
                                    console.log(result);
                                });
                                var cdate = new Date();
                                time = cdate.getFullYear() + "-" + (cdate.getMonth() + 1) + "-" + cdate.getDate() + " " + cdate.getHours() + ":" + cdate.getMinutes() + ":" + cdate.getSeconds();
                                $.post('/csv', {
                                    time: time,
                                    site: 'bank',
                                    user: user,
                                    scheme: "emoji",
                                    mode: 'login',
                                    event: 'failure',
                                    data: 'bank passwored entered here is wrong'
                                }, (result) => {
                                    console.log(result);
                                });

                                well.html('');
                                email.removeClass("disabled");
                                facebook.removeClass("disabled");
                                try_btn.addClass("disabled");
                                bank.hide();
                                facebookClicked = false;
                                emailClicked = false;
                                bankClicked = false;
                                $('#instruct').html('');
                                grid.html('');
                                textArea.hide();
                                textArea.val('');
                                passwordTest.html('');
                                writ_pass.hide();
                                gridTestArea.hide();
                                testPasswordRandoArray = [];
                                passwordTestArray = [];
                                //facebookGridArray = [];
                                counter = 1;
                            }

                        } else {
                            noty({text: 'Password does not match!'});
                            var cdate = new Date();
                            time = cdate.getFullYear() + "-" + (cdate.getMonth() + 1) + "-" + cdate.getDate() + " " + cdate.getHours() + ":" + cdate.getMinutes() + ":" + cdate.getSeconds();
                            $.post('/csv', {
                                time: time,
                                site: 'bank',
                                user: user,
                                scheme: "emoji",
                                mode: 'create',
                                event: 'pwtest',
                                data: 'bad'
                            }, (result) => {
                                console.log(result);
                            });
                        }
                    }
                }

            });

        }
    });
});
