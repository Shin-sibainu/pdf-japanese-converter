$(function () {
  const hum = $("#hamburger, .close");
  const nav = $(".sp-nav");
  hum.on("click", function () {
    nav.toggleClass("toggle");
  });

  /* 保留 */
  $("#pdf-drop-formBox").on("submit", (e) => {
    e.preventDefault();
    console.log("submit!");
    $.ajax({
      url: '{% url "pdfJapaneseConverter:convert"%}',
      type: "POST",
      data: {},
    });
  });
});

/* 保留 */
function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = jQuery.trim(cookies[i]);
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

var csrftoken = getCookie("csrftoken");

function csrfSafeMethod(method) {
  // these HTTP methods do not require CSRF protection
  return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method);
}

$.ajaxSetup({
  beforeSend: function (xhr, settings) {
    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
      xhr.setRequestHeader("X-CSRFToken", csrftoken);
    }
  },
});

//submitが押されたら呼ばれる。

/* テストコード */
//input:fileが変更されたときの処理
//$(document)とすればDOＭが呼ばれたらすぐに実行される。
$(document).on("change", ":file", function () {
  //input:fileのファイル名をinput:textに表示する
  var input = $(this); //inputプロパティ要素情報。
  console.log(input);
  numFiles = input.get(0).files ? input.get(0).files.length : 1; //FileList(更新日、ファイル名、拡張子名、サイズ)
  console.log(numFiles); //ファイルの数。
  label = input.val().replace(/\\/g, "/").replace(/.*\//, "");
  input.parent().parent().prev(":text").val(label);
  $("#loading-div").css("display", "");

  //Ajaxはここから
  $.ajax({
    url: $("#form").attr("action"),
    type: "POST",
    data: new FormData($("#form").get(0)),
    processData: false,
    contentType: false,
    beforeSend: function (xhr, settings) {
      //リクエストする前の処理
      xhr.setRequestHeader(
        "X-CSRFToken",
        $("input[name='csrfmiddlewaretoken']").val()
      );
      $("#result-table").empty();
    },
  })
    .done(function (data, textStatus, jqXHR) {
      //成功したら、結果を追加。
      console.log($("#form").get(0));
      console.log($(data)); //example.htmlのhtml情報
      console.log(textStatus); //success
      console.log(jqXHR);
      $("#result-table").append(data);
    })
    .fail(function (jqXHR, textStatus, errorThorown) {
      console.log(jqXHR + "\n" + textStatus + "\n" + errorThorown);
    })
    .always(function (data, textStatus, jqXHR) {
      $("#loading-div").hide();
    });
});
