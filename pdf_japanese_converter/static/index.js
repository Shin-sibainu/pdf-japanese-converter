$(function () {
  const hum = $("#hamburger, .close");
  const nav = $(".sp-nav");
  hum.on("click", function () {
    nav.toggleClass("toggle");
  });
});

//input:fileが変更されたときの処理
$(document).on("change", ":file", function () {
  //":fileはinputのname属性でした。合わせること。"
  /* loading-divを表示開始。 */
  $("#loading-div").css("display", "");
  /* ajax通信で一部の欲しい情報をサーバーにリクエストを送り、uploadfile関数を呼ぶ */
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
      $(".result-table").empty();
    },
  })
    .done(function (data, textStatus, jqXHR) {
      $(".result-table").append(data);
    })
    .fail(function (jqXHR, textStatus, errorThorown) {
      console.log(jqXHR + "\n" + textStatus + "\n" + errorThorown);
    })
    .always(function () {
      $("#loading-div").hide();
    });
});

//$(document)とすればDOMが呼ばれたらすぐに実行される。
/* $(document).on("change", ":file", function () {
  //input:fileのファイル名をinput:textに表示する
  var input = $(this); //inputプロパティ要素情報。
  numFiles = input.get(0).files ? input.get(0).files.length : 1; //FileList(更新日、ファイル名、拡張子名、サイズ)
  label = input.val().replace(/\\/g, "/").replace(/.*\//, "");
  input.parent().parent().prev(":text").val(label);
  $("#loading-div").css("display", ""); */

//Ajaxはここから
/*   $.ajax({
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
      console.log($("#form").get(0)); //<form></form>のHTML情報
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
}); */
