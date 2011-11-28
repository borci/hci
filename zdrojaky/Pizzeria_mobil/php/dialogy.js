function animacia_fajka(speed) {
    $('#obrazok_potvrdenie_fajka').fadeIn(speed, function() {
        $(this).fadeOut(speed);
    })
}

function global_message_info(text, speed) {
    $('#global_message_info').text(text);
    $('#global_message_info').fadeIn(speed, function() {
        $(this).fadeOut(speed);
    })
}

function global_message_error(text, speed) {
    $('#global_message_error .message_text').text(text);
    $('#global_message_error').fadeIn(speed, function() {
        $(this).fadeOut(speed);
    })
}