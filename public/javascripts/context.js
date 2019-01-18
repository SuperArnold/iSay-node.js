
$(document).ready(function () {

    window.onload = function () {
        $("#divHome").load(location.href + "/home", "");
    };
    $("#home").click(function () {
        $.ajax({
            type: "get",
            async: true, //同步请求
            url: "/context/home",
            success: function (dates,date) {
                //alert(dates);
                alert(date.username);
                $("#divHome").html(dates);//要刷新的div
            },
            error: function () {
                // alert("失败，请稍后再试！");
            }
        });
    });
    $("#friends").click(function () {
        $.ajax({
            type: "get",
            async: false, //同步请求
            url: "/context/friends",
            success: function (dates) {
                //alert(dates);
                $("#divHome").html(dates);//要刷新的div
            },
            error: function () {
                // alert("失败，请稍后再试！");
            }
        });
    });
    $("#diary").click(function () {
        $.ajax({
            type: "get",
            async: false, //同步请求
            url: "/context/diary",
            success: function (dates) {
                //alert(dates);
                $("#divHome").html(dates);//要刷新的div
            },
            error: function () {
                // alert("失败，请稍后再试！");
            }
        });
    });
    $("#order").click(function () {
        $.ajax({
            type: "get",
            async: false, //同步请求
            url: "/context/order",
            success: function (dates) {
                //alert(dates);
                $("#divHome").html(dates);//要刷新的div
            },
            error: function () {
                // alert("失败，请稍后再试！");
            }
        });
    });

});
