function show_sipka_hore(show) // zobrazi alebo schova scrollovaciu sipku hore
{
    if (show) {
        $('#global_sipka_hore').show();
    } else {
        $('#global_sipka_hore').hide();
    }
}
function show_sipka_dole(show) // zobrazi alebo schova scrollovaciu sipku dole
{
    if (show) {
        $('#global_sipka_dole').show();
    } else {
        $('#global_sipka_dole').hide();
    }
}

function animacia_fajka(speed) {
    $('#obrazok_potvrdenie_fajka').fadeIn(speed, function() {
        $(this).fadeOut(speed);
    })
}

function global_message_info(text, duration) {
    if (duration == 'short') {
        duration = 500;
    }
    if (duration == 'normal') {
        duration = 1000;
    }
    if (duration == 'long') {
        duration = 1500;
    }
    
    $('#global_message_info').text(text);
    $('#global_message_info').fadeIn('medium', function() {
        $(this).delay(duration).fadeOut('slow');
    })
}

function global_message_error(text, duration) {
    if (duration == 'short') {
        duration = 1000;
    }
    if (duration == 'normal') {
        duration = 1000;
    }
    if (duration == 'long') {
        duration = 1500;
    }
    
    $('#global_message_error').text(text);
    $('#global_message_error').fadeIn('medium', function() {
        $(this).delay(duration).fadeOut('slow');
    })
}

