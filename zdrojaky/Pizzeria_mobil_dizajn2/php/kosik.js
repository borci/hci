function init_kosik() { // funckia zavolana z $('document').ready
    $("#infolist").accordion({
        autoHeight: false,
        collapsible: true,
        active: false,
        header: 'h3'
    });

    
    $('.kosik_button_objednat').click(function() {
        on_kosik_objednaj();
    });
    
    // demo: pridanie niektorych pizz
    //    pridat_do_kosika('Quatro', 4.2);
    //    pridat_do_kosika('Klobásová', 4.5);
    //    pridat_do_kosika('Hawai', 4.2);
    update_kosik_trigger_image();
    
}

function pridat_do_kosika(nazov_pizze, jednotkova_cena) {
    $('#infolist').accordion("destroy"); // docasne zrusenie accordionu, aby sa mohla pridat nova polozka
    var newstr = '<h3> <div class="kosik_item_header"> <span class="kosik_pocet">1</span> <span>x</span> <span class="kosik_nazov_pizze">' + nazov_pizze +
    '</span> <span class="kosik_pizza_cena"><span class="jednotkova_cena">' + jednotkova_cena +
    '</span> <span class="suma">' + jednotkova_cena +
    '</span><span class="euro_sign">€</span></span></div> <span class="kosik_plus"></span> <span class="kosik_minus"></span> <span class="kosik_delitem"></span> </h3>' +
    '<div><span class="kosik_add_suroviny">Pridať suroviny</span> <ul class="kosik_pizza_suroviny"> </ul></div>';
    $('#infolist').append(newstr);

    // handler pre tlacidlo odstranit z kosika
    $('#infolist h3:last .kosik_delitem').click(function(){
        var nadpis = $(this).parent();
        var obsah = $(nadpis).next();
        $(obsah).fadeOut("medium", function(){
            $(obsah).remove();
        });
        $(nadpis).fadeOut("medium", function(){
            $(nadpis).remove();
            update_kosik_trigger_image();
            update_platit_spolu();
        });
        return false;
    });

    // handler pre tlacidlo plus
    $('#infolist h3:last .kosik_plus').click(function(){
        var pocet = Number($(this).parent().children(".kosik_item_header").children(".kosik_pocet").html());
        pocet += 1;
        $(this).parent().children(".kosik_item_header").children(".kosik_pocet").text(pocet);

        update_platit_spolu();
        return false;
    });

    // handler pre tlacidlo minus
    $('#infolist h3:last .kosik_minus').click(function(){
        var pocet = Number($(this).parent().children(".kosik_item_header").children(".kosik_pocet").html());
        pocet -= 1;
        if (pocet < 1)
            return false;
        $(this).parent().children(".kosik_item_header").children(".kosik_pocet").text(pocet);

        update_platit_spolu();
        return false;
    });
    
    // handler pre tlacidlo pridat suroviny
    $('#infolist div:last .kosik_add_suroviny').click(on_clicked_pridat_suroviny);

    // opatovne vytvorenie accordionu
    $('#infolist').accordion({
        autoHeight: false,
        collapsible: true,
        active: false,
        header: 'h3'
    });
    
    update_kosik_trigger_image();
    update_platit_spolu();
}

function roundit(cislo) {
    return Math.round(cislo * 100) / 100;
}

function update_platit_spolu() { // funckia updatuje najskor sumy za jendotlive pizze, a potom aj celkovu sumu za objednavku
    $('#kosik_sumar .kosik_suma .suma').text(0);
    var objednavka_suma = 0;
    $('#infolist h3').each(function() {
        // 1.) update sumu kazdej pizze
        var jednotkova_cena = Number($(this).children(".kosik_item_header").children(".kosik_pizza_cena").children(".jednotkova_cena").text());
        var pocet_pizz = Number($(this).children(".kosik_item_header").children(".kosik_pocet").text());
        var pizza_suma = roundit(jednotkova_cena * pocet_pizz);
        $(this).children(".kosik_item_header").children(".kosik_pizza_cena").children(".suma").text(pizza_suma);
        
        // 2.) zapocitanie do sumy objednavky
        objednavka_suma += pizza_suma;
    });
    // 3.) aktualizovanie html sumy objednavky
    objednavka_suma = roundit(objednavka_suma); // ktovie preco to treba dat...ale kazdopadne zabera to :-) (priklad: 15 + 2 + 5 + 3 + 4.2 + 4.5 + 4.2)
    $('#kosik_sumar .kosik_suma .suma').text(objednavka_suma);
}

function on_clicked_pridat_suroviny() {
    var zoznam = $(this).next();
    var nazov_pizze = zoznam.parent().prev().children(".kosik_item_header").children(".kosik_nazov_pizze").text();
    pridat_suroviny(zoznam, nazov_pizze);
}

function vloz_surovinu(zoznam, surovina, cena) { // zavolaj tuto funkciu, ked chces, aby sa pridala do nejakeho zoznamu nova surovina
    odstran_surovinu(zoznam, surovina); // to je taky hack na duplicitne pridavanie surovin
    
    zoznam.append('<li><span class="surovina_delete"></span><span class="surovina_nazov">' + surovina + '</span> <span class="surovina_cena">' + cena + '</span><span>€</span>' + '</li>');
    
    // prepocitavanie ceny
    var jednotkova_cena = Number(zoznam.parent().prev().children(".kosik_item_header").children(".kosik_pizza_cena").children(".jednotkova_cena").text());
    jednotkova_cena += Number(cena);
    zoznam.parent().prev().children(".kosik_item_header").children(".kosik_pizza_cena").children(".jednotkova_cena").text(jednotkova_cena);
    

    var pridana_surovina = zoznam.children().last();
    update_platit_spolu();
    
    // zaregistrovanie handleru na odstranenie
    pridana_surovina.children('.surovina_delete').click(function() {
        odstran_surovinu(zoznam, surovina);
    //         $(this).parent().fadeOut("medium", function(){
    //            $(this).remove();
    //            update_platit_spolu();
    //        });
    });
}

function odstran_surovinu(zoznam, surovina) { // zavolaj tuto funkciu, ked chces odstranit nejaku surovinu zo zoznamu pridavnych surovin
    zoznam.children().each(function() { // zavola sa na kazdy <li>
        if ($(this).children('.surovina_nazov').text() == surovina) {
            // najdena surovina na zmazanie
                
            // prepocitanie ceny
            var cena_suroviny = Number($(this).children('.surovina_cena').text());
            var jednotkova_cena = Number(zoznam.parent().prev().children(".kosik_item_header").children(".kosik_pizza_cena").children(".jednotkova_cena").text());
            jednotkova_cena -= cena_suroviny;
            zoznam.parent().prev().children(".kosik_item_header").children(".kosik_pizza_cena").children(".jednotkova_cena").text(jednotkova_cena);
    
            update_platit_spolu();
                
            // odstranenie z efektom
            $(this).fadeOut("mediu", function() {
                $(this).remove();
            });
        }
    });
}

function get_suroviny(zoznam) {
    var nazvy = new Array();
    zoznam.children().each(function() {
        nazov = $(this).children('.surovina_nazov').text();
        nazvy.push(nazov);
    })
    return nazvy;
}

function pridat_suroviny_test(zoznam) { // TOTO je iba testovacie demo, realna funkcia je inde
    vloz_surovinu(zoznam, "surka", 2);
}

function is_kosik_empty() {
    return $('#infolist h3').size() == 0;
}

function empty_kosik() {
    $('#infolist').children().fadeOut('slow', function() {
        $(this).remove();
        update_platit_spolu();
        update_kosik_trigger_image();
    })
}

function on_kosik_objednaj() {
    if (is_kosik_empty()) {
        global_message_error('Nemáte nič objednané', 'normal');
        return;
    }
    
    var meno = $("#adresa_meno").attr('value'); 
    var kontakt = $("#adresa_kontakt").attr('value');
    var adresa = $("#adresa_adresa").attr('value');
    
    if (meno.length < 1) {
        global_message_error("Uveďte prosím Vaše meno", 'normal');
        return;
    }
    if (kontakt.length < 1) {
        global_message_error("Uveďte prosím Vaše telefónne číslo", 'normal');
        return;
    }
    if (!check_kontakt()) {
        return;
    }
    if (adresa.length < 1) {
        global_message_error("Uveďte prosím Vašu adresu doručenia", 'normal');
        return;
    }
    
    global_message_info('Objednávka odoslaná', 'normal');
    setTimeout(function() {
        $(".right_trigger").click();
    }, 500);
    empty_kosik();
//    $(".right_trigger").click();
}

function update_kosik_trigger_image() { // nastavi pozadie trigger-u na plny/prazdny kosik
    if (is_kosik_empty()) {
        $('.right_trigger').removeClass('kosik_full');
        $('#kosik_sumar').hide();
        $('#kosik_prazdny').show();
    } else {
        $('.right_trigger').addClass('kosik_full');
        $('#kosik_prazdny').hide();
        $('#kosik_sumar').show();
    }
}