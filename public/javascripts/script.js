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
