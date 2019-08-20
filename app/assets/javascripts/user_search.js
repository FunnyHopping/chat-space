$(function() {
  function buildHtml(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    return html;
  }
  function appendList(item) {
    $('#user-search-result').append(item);
  }

  $('#user-search-field').on('keyup', function(e) {
    e.preventDefault();
    var list
    var input = $(this).val();
    $.ajax({
      url: '/users',
      type: 'GET',
      data: ('keywords=' + input),
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(users) {
      list = users
      if (prelist !== list)
        $('#user-search-result').html('');
        $.each(users, function(index, user){
          var html = buildHtml(user);
          appendList(html);
        });
      if (users.length === 0) {
        appendList('<div class="chat-group-user clearfix"><p class="chat-group-user__name">一致するユーザーがいません。</p>')
      }
    });
    prelist = list
  });
});