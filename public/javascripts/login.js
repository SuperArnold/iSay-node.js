$(document).ready(function () {
  $("#submit").click(function () {
    if ($("#account").val() == "" || $("#passwd").val() == "")
      return alert("請輸入資料");

    else {
      var emailRegxp = /[\w-]+@([\w-]+\.)+[\w-]+/; //2009-2-12更正為比較簡單的驗證
      if (emailRegxp.test($("#account").val()) != true) {
        return alert("請輸入正確格式");
      }
      $.ajax({
        type: "POST",
        url: "../user/authentication",
        //   dataType : 'json',
        contentType: 'application/json',
        data: JSON.stringify({
          account: $("#account").val(),
          passwd: $("#passwd").val(),
        }),
        timeout: 100000,
        //		contentType: "application/json; charset=utf-8",
        success: function (data) {
          if (data.success == 1){
            window.location.href = '../context';
            // CommonAPI.Submit({
            //   url:"../context",
            //   data: data.username
            // });
          }
          else
            alert("帳號或密碼錯誤");
        },
        error: function (data) {
        }
      });
    }
  });


});