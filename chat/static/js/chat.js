$(function() {
    // When we're using HTTPS, use WSS too.
    var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
    var chatsock = new WebSocket(ws_scheme + '://' + window.location.host + window.location.pathname);
    
    chatsock.onmessage = function(message) {
        var data = JSON.parse(message.data);
        $('#chat').append('<li class="media">'+
                '<div class="media-body">' +
                '<div class="media">' +
                '<a class="pull-left" href="#">' +
                '<img class="media-object img-circle " src="https://app.teamsupport.com/dc/1078/UserAvatar/1839999/48/1470773165634">' +
                '</a>' +
                '<div class="media-body">' +
                data.message  +
                '<br>' +
                '<small class="text-muted">' + data.handle + ' | ' + data.timestamp + '</small>' +
                '<hr>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>');
    };

    $("#chatform").on("submit", function(event) {
        var message = {
            handle: $('#handle').val(),
            message: $('#message').val(),
        }
        console.log(JSON.stringify(message));
        chatsock.send(JSON.stringify(message));
        $("#message").val('').focus();
        return false;
    });
});