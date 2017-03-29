$(document).ready( () => {

  let test_btn = $('#test');

  test_btn.click( () => {
    let currentdate = new Date();
    let datetime = currentdate.getFullYear() + "-" +
                   (currentdate.getMonth()+1) + "-" +
                   currentdate.getDate() + " " +
                   currentdate.getHours() + ":" +
                   currentdate.getMinutes();

    $.post('/csv', {time: datetime}, (data) => {
      console.log(data);
    })
  })
})
