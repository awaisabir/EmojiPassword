$(document).ready( () => {

  let test_btn = $('#test');

  test_btn.click( () => {
    let currentdate = new Date();
    let datetime = currentdate.getFullYear() + "-" +
                   (currentdate.getMonth()+1) + "-" +
                   currentdate.getDate() + " " +
                   currentdate.getHours() + ":" +
                   currentdate.getMinutes();
    let message = "Button Clicked\n";

    $.post('/csv', {time: datetime, message: message}, (data) => {
      console.log(data);
    })
  })
})
