$(document).ready( () => {
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
    time = currentdate.getFullYear() + "-" +
                      (currentdate.getMonth()+1) + "-" +
                      currentdate.getDate() + " " +
                      currentdate.getHours() + ":" +
                      currentdate.getMinutes();
    site = "main";
    user = $('#username').val();
    scheme = "unknown"
    mode = register_btn.html().toLowerCase();
    event = "";
    data = "";

    if (user === "") {
      noty({text: 'Enter a username!'});
      event = "failure"
      $.post('/csv', {time: time, site: site, user: user, scheme: scheme, mode: mode, event:event, data:data});
    } else {

      event = 'success';
      $.post('/csv', {time: time, site: site, user: user, scheme: scheme, mode: mode, event:event, data:data});
      username = user;
      $('#username').val('');
      register_btn.hide();
      $('.username-wrapper').append('<button type="button" class="btn btn-default" id="login">Login</button>');
    }

    let login_btn = $('#login');

    login_btn.click(() => {
      let currentdate = new Date();
      time = currentdate.getFullYear() + "-" +
                        (currentdate.getMonth()+1) + "-" +
                        currentdate.getDate() + " " +
                        currentdate.getHours() + ":" +
                        currentdate.getMinutes();

      mode = login_btn.html().toLowerCase();
      data = "";


      let login_username = $('#username').val();
      if(login_username === username) {
        // display all the login stuff
        $.post('/csv', {time: time, site: site, user: username, scheme: scheme, mode: mode, event:'success', data:data});
      }
      else {
        noty({text: 'Username Incorrect', type: 'error'});
        $.post('/csv', {time: time, site: site, user: username, scheme: scheme, mode: mode, event:'failure', data:data});
      }
    });

  });

});
