$(function() {

  function buildHTML(message){
    if (message.image) {
      var html =
        `<div class="main_chat__list__box">
            <div class="main_chat__list__box__user">
              <div class="user">
                <b>
                  ${message.user_name}
                </b>
              </div>
              <div class="time">
                ${message.created_at}
              </div>
            </div>
          <div class="main_chat__list__message">
            ${message.content}
            <img class="main_chat_image" src=${message.image}>
          </div>
        </div>`
      return html;
    } else {
      var html = 
        `<div class="main_chat__list__box">
            <div class="main_chat__list__box__user">
              <div class="user">
                <b>
                  ${message.user_name}
                </b>
              </div>
              <div class="time">
                ${message.created_at}
              </div>
            </div>
          <div class="main_chat__list__message">
            ${message.content}
          </div>
        </div>`
      return html;
    };
  }

  $("#new_message").on('submit', function(e) {
    e.preventDefault();
    console.log(1)
    var formData = new FormData(this);
    var url = $(this).attr("action");
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $(".main_chat__list").append(html);
      $("#new_message")[0].reset();
      $(".main_chat__list").animate({scrollTop: $(".main_chat__list")[0].scrollHeight});
      $(".form__submit").prop("disabled", false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    });
  });
});