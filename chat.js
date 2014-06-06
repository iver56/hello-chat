$(function() {
  $chatArea = $('#chatArea');
  // Initialize the socket & handlers
  var connectToServer = function() {
    var chatSocket = new SockJS('http://localhost:5555/helloChat');

    chatSocket.onopen = function() {
      clearInterval(connectRetry);
      console.log('connected');
    };

    chatSocket.onmessage = function(message) {
      $chatArea.val(message.data + "\n" + $chatArea.val());
    };

    chatSocket.onclose = function() {
      clearInterval(connectRetry);
      connectRetry = setInterval(connectToServer, 1000);
      console.log('disconnected');
    };

    $(document).on('submit', '#chatForm', function(e) {
      e.preventDefault();
      var message = $('#username').val() + ': ' + $('#message').val();
      $('#message').val('');
      chatSocket.send(message);
    });
  };


  var connectRetry = setInterval(connectToServer, 1000);

});
