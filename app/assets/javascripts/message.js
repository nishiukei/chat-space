$(function() {

  function buildHTML(message){
    if (message.content && message.image) {
      var html =
        `<div class="main_chat__list__box" data-message-id=${message.id}>
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
    } else if (message.content) {
      var html = 
        `<div class="main_chat__list__box" data-message-id=${message.id}>
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
    } else if (message.image) {
      var html = 
        `<div class="main_chat__list__box" data-message-id=${message.id}>
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
            <img class="main_chat_image" src=${message.image}>
          </div>
        </div>`
    };
    return html;
  };

  $("#new_message").on('submit', function(e) {
    e.preventDefault();
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

  var reloadMessages = function() {
    var last_message_id = $(".main_chat__list__box:last").data("message-id");
    $.ajax({
      url: "api/messages",
      type: "get",
      dataType: "json",
      data: { id: last_message_id }
    })
    .done(function(messages){
      if (messages.length !== 0) {
        var insertHTML = "";
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $(".main_chat__list").append(insertHTML);
        $(".main_chat__list").animate({ scrollTop: $(".main_chat__list")[0].scrollHeight});
      }
    })
    .fail(function(){
      alert("error"); 
    })
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});