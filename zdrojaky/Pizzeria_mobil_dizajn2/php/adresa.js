function init_adresa()
{
    $('#adresa_kontakt').focusout(function() {
        check_kontakt();
    });
//    
//    $('#adresa_prihlasit').click(test);
//    $('#adresa_prihlasit').click(loginUser);
//    $('#adresa_odhlasit');
//    $('#adresa_registrovat');
//    $('#adresa_save');
}

function check_kontakt() { // zkontroluje, ci kontakt (telefon) obsahuje cislo (prip. zacinajuce predvolbou: +)
    var kontakt = $('#adresa_kontakt').attr('value');
    kontakt = kontakt.split(' ').join(''); // ignoracia medzier
    if (kontakt[0] == '-' || isNaN(kontakt)) {
        global_message_error('Telefón obsahuje nepovolené znaky', 'normal');
        return false;
    }
    return true;
}

var g_just_registered = false; // sluzi na poznacenie si, ze user bol prave registrovany (a tym padom aj automaticky lognuty) a nema mu byt zobrazena hlaska Successful login
function onLoginResponse(response_text) // callback volany ajaxom pri prijati odpovedi (na poziadavku prihlasenia) zo serveru
{
    var response = new Array();
    riadky = response_text.split('\n');
    for(var riadok in riadky) {
        slova = riadky[riadok].split('=');
        response[slova[0]] = slova[1];
    }
    //    alert('status == ' + response['status'])
    
    if (response["status"] == 'OK') { // login OK
        if (g_just_registered) {
            g_just_registered = false;
        } else {
            global_message_info('Prihlásenie úspešné', 'short');
        }

        $('#adresa_meno').attr("value", response["meno"]);
        $('#adresa_kontakt').attr("value", response["kontakt"]);
        $('#adresa_adresa').attr("value", response["adresa"]);
                
        //        $('.show_on_logout').fadeOut();
        $('.show_on_logout').hide();
        $('.show_on_login').show("medium");
        //        $('.show_on_login').fadeIn("medium");

        $('.adresa_prihlaseny_hlavicka .prihlaseny_hlavicka_login').text($("#adresa_login").attr('value'));


    } else if (response['status'] == 'Error') { // Login failed, server hlasi chybu
        //        alert(response['message']);
        global_message_error(response['message'], 'normal');
    } else { // neznama chyba
        alert('Unknown Error (login)');        
    }
}

function onRegisterResponse(response_text)
{
    //    alert('onRegisterResponse');

    var response = new Array();
    riadky = response_text.split('\n');
    for(var riadok in riadky) {
        slova = riadky[riadok].split('=');
        response[slova[0]] = slova[1];
    }
    
    if (response["status"] == 'OK') { // registration OK
        global_message_info('Registrácia dokončená', 'normal');
        g_just_registered = true;
        loginUser(); // zaroven pouzivatela prihlasit
    } else if (response['status'] == 'Error') { // Registration failed, server hlasi chybu
        //        alert(response['message']);  
        global_message_error(response['message'], 'normal');
    } else { // neznama chyba
        alert('Unknown Error');        
    }
}

function onSaveResponse(response_text)
{
    var response = new Array();
    riadky = response_text.split('\n');
    for(var riadok in riadky) {
        slova = riadky[riadok].split('=');
        response[slova[0]] = slova[1];
    }
    
    if (response["status"] == 'OK') { // registration OK
        //        alert('Kontaktné údaje uložené');
        animacia_fajka('slow');
    } else if (response['status'] == 'Error') { // Registration failed, server hlasi chybu
        //        alert(response['message']);
        global_message_error(response['message'], 'normal');
    } else { // neznama chyba
        alert('Unknown Error');        
    }   
}

function loginUser()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            //            alert("Login Response:\n" + xmlhttp.responseText);
            onLoginResponse(xmlhttp.responseText);
        }
    };
    
    var login = $("#adresa_login").attr('value');
    var password = $("#adresa_password").attr('value');
    
    xmlhttp.open("GET","login.php?target=login&login=" + login + "&password=" + password,true);
    xmlhttp.send();
}

function registerUser() 
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            onRegisterResponse(xmlhttp.responseText);
        }
    };
    
    var login = $("#adresa_login").attr('value');
    var password = $("#adresa_password").attr('value');
    
    var meno = $("#adresa_meno").attr('value');
    var kontakt = $("#adresa_kontakt").attr('value');
    var adresa = $("#adresa_adresa").attr('value');
    
    xmlhttp.open("GET","login.php?target=register&login=" + login + "&password=" + password + "&meno=" + meno + "&kontakt=" + kontakt + "&adresa=" + adresa, true);
    xmlhttp.send();
    
}

function saveUserContact() {
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            onSaveResponse(xmlhttp.responseText);
        }
    };
    
    var login = $("#adresa_login").attr('value');
    var password = $("#adresa_password").attr('value');
    
    var meno = $("#adresa_meno").attr('value');
    var kontakt = $("#adresa_kontakt").attr('value');
    var adresa = $("#adresa_adresa").attr('value');
    
    if (check_kontakt()) {
        xmlhttp.open("GET","login.php?target=update&login=" + login + "&password=" + password + "&meno=" + meno + "&kontakt=" + kontakt + "&adresa=" + adresa, true);
        xmlhttp.send();
    }
}

function logoutUser()
{
    //    $('.show_on_login').fadeOut();
    //    $('.show_on_logout').fadeIn("medium");
    global_message_info('Boli ste odhlásení', 'short');
    $('.show_on_login').hide();
    $('.show_on_logout').show("medium");
    
    $('#adresa_meno').attr("value", '');
    $('#adresa_kontakt').attr("value", '');
    $('#adresa_adresa').attr("value", '');
    $('#adresa_password').attr("value", '');
    $('#adresa_login').attr("value", '');
}