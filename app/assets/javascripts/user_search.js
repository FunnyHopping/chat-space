$(document).on('turbolinks:load', function() {

  $('#user-search-field').on('keyup', function(e) {
  
    function buildListHtml(user) {
      var listHtml = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user.name}</p>
                    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                    </div>`
      return listHtml;
    }
    function appendList(item) {
      $('#user-search-result').append(item);
    }
  
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
        $.each(list, function(index, user){
          var listHtml = buildListHtml(user);
          appendList(listHtml);
        });
      if (users.length === 0) {
        appendList('<div class="chat-group-user clearfix"><p class="chat-group-user__name">一致するユーザーがいません。</p>')
      }
    })
  
    .fail(function() {
      alert('検索に失敗しました。')
    });
    prelist = list
  });

  $(document).on('click', '.user-search-add', function() {
    function buildMemberHtml(user_id, user_name) {
      var memberHtml = `<div class='chat-group-user clearfix js-chat-member' id="${user_id}">
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>${user_name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                  </div>`
      return memberHtml;
    }

    var userId = $(this).attr('data-user-id')
    var userName = $(this).attr('data-user-name')

    var memberHtml = buildMemberHtml(userId, userName)
    $('.js-add-user').append(memberHtml);
    $(this).parent().remove();
  });

  $(document).on('click', '.js-remove-btn', function() {
    $(this).parent().remove();
  })
});