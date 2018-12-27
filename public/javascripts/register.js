$(document).ready(function () {
  $("#submit").click(function () {
    if ($("#name").val() == "" || $("#account").val() == "" || $("#inputPassword").val() == "" || $("#inputPassword1").val() == "" || $("#numeric").val() == "" || $("#birthday").val() == "" || $("[name='gender']:checked").val() == "" || $("#info").val() == "")
      return alert("請輸入資料");
    var emailRegxp = /[\w-]+@([\w-]+\.)+[\w-]+/; 
    if (emailRegxp.test($("#account").val()) != true) 
      return alert("請輸入email正確格式");
      if (!checkID($("#numeric").val()))
        return alert("身分證字號格式錯誤");
      if ($("#inputPassword").val() != $("#inputPassword1").val()) {
        return alert("密碼與確認密碼不一致");
      } else {
        $.ajax({
          type: "POST",
          url: "registeradd",
          //   dataType : 'json',
          contentType: 'application/json',
          data: JSON.stringify({
            name: $("#name").val(),
            account: $("#account").val(),
            inputPassword: $("#inputPassword").val(),
            numeric: $("#numeric").val(),
            birthday: $("#birthday").val(),
            gender: $("[name='gender']:checked").val(),
            info: $("#info").val()

          }),
          timeout: 100000,
          //		contentType: "application/json; charset=utf-8",
          success: function (data) {
            alert(data.message);
            window.location.href = './login';
          },
          error: function (data) {
          }
        });
      }
    });


  function checkID(id) {
    tab = "ABCDEFGHJKLMNPQRSTUVXYWZIO"
    A1 = new Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3);
    A2 = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5);
    Mx = new Array(9, 8, 7, 6, 5, 4, 3, 2, 1, 1);

    if (id.length != 10) return false;
    i = tab.indexOf(id.charAt(0));
    if (i == -1) return false;
    sum = A1[i] + A2[i] * 9;

    for (i = 1; i < 10; i++) {
      v = parseInt(id.charAt(i));
      if (isNaN(v)) return false;
      sum = sum + v * Mx[i];
    }
    if (sum % 10 != 0) return false;
    return true;
  }
});