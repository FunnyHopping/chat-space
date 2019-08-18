$(function(){
  function buildHTML(message){
    var html = `<div class="message">
                  <div class="message__upper-info">
                    <p class="message__upper-info__talker">${message.user.name}</p>
                    <p class="message__upper-info__date">${message.created_at.strftime("%Y/%m/%d %H:%M")}</p>
                  </div>
                <% if message.content.present? %>
                  <p class="message__text">${message.content}</p>
                <% end %>
                <% if message.image.present? %>
                  <%= image_tag ${message.image}, class: 'message__image' %>
                <% end %>
                </div>`
    return html;
  }
  $("#new_message").on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    // debugger;
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.message_content').val('')
    })
    .fail(function(){
      alert('error') //kari
    })
  })
})