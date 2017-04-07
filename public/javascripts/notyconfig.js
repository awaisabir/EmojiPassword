$(document).ready(() => {

  $.noty.defaults = {
    layout: 'top',
    theme: 'relax', // or relax
    type: 'warning', // success, error, warning, information, notification
    text: '', // [string|html] can be HTML or STRING

    dismissQueue: true, // [boolean] If you want to use queue feature set this true
    force: false, // [boolean] adds notification to the beginning of queue when set to true
    maxVisible: 1, // [integer] you can set max visible notification count for dismissQueue true option,

    template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',

    timeout: 3200, // [integer|boolean] delay for closing event in milliseconds. Set false for sticky notifications
    progressBar: false, // [boolean] - displays a progress bar

    animation: {
      open: {height: 'toggle'}, // or Animate.css class names like: 'animated bounceInLeft'
      close: {height: 'toggle'}, // or Animate.css class names like: 'animated bounceOutLeft'
      easing: 'swing',
      speed: 500 // opening & closing animation speed
    },
    closeWith: ['click'], // ['click', 'button', 'hover', 'backdrop'] // backdrop click will close all notifications

    modal: false, // [boolean] if true adds an overlay
    killer: false, // [boolean] if true closes all notifications and shows itself

    callback: {
      onShow: function() {},
      afterShow: function() {},
      onClose: function() {},
      afterClose: function() {},
      onCloseClick: function() {},
    },

    buttons: false // [boolean|array] an array of buttons, for creating confirmation dialogs.
  };
})
