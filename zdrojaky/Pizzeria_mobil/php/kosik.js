function pridat_do_kosika(nazov_pizze, jednotkova_cena) {
    $('#infolist').accordion("destroy"); // docasne zrusenie accordionu, aby sa mohla pridat nova polozka
    var newstr = '<h3> <span class="kosik_item_header"> <span class="kosik_pocet">1</span> <span>x</span> <span>' +
    nazov_pizze +
    '</span> <span class="kosik_pizza_cena"><span class="suma">' +
    jednotkova_cena +
    '</span><span>€</span></span></span> <span class="kosik_plus"></span> <span class="kosik_minus"></span> <span class="kosik_delitem"></span> </h3>' +
    '<div><span class="kosik_add_suroviny">Pridať suroviny</span> <ul class="kosik_pizza_suroviny"> <li>olivy</li> <li>šunka</li> </ul></div>';
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
            update_platit_spolu();
        });
        return false;
    });

    // handler pre tlacidlo plus
    $('#infolist h3:last .kosik_plus').click(function(){
        var pocet = $(this).parent().children(".kosik_item_header").children(".kosik_pocet").html();
        var suma = $(this).parent().children(".kosik_item_header").children(".kosik_pizza_cena").children(".suma").text();
        suma /= pocet;
        pocet = Number(pocet) + 1;
        suma *= pocet;
        $(this).parent().children(".kosik_item_header").children(".kosik_pocet").text(pocet);
        $(this).parent().children(".kosik_item_header").children(".kosik_pizza_cena").children(".suma").text(suma);
        update_platit_spolu();
        return false;
    });

    // handler pre tlacidlo minus
    $('#infolist h3:last .kosik_minus').click(function(){
        var pocet = $(this).parent().children(".kosik_item_header").children(".kosik_pocet").html();
        var suma = $(this).parent().children(".kosik_item_header").children(".kosik_pizza_cena").children(".suma").text();
        suma /= pocet;
        pocet = Number(pocet) - 1;
        if (pocet < 1)
            return false;
        suma *= pocet;
        $(this).parent().children(".kosik_item_header").children(".kosik_pocet").text(pocet);
        $(this).parent().children(".kosik_item_header").children(".kosik_pizza_cena").children(".suma").text(suma);
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
    
    update_platit_spolu();
}

function update_platit_spolu() {
    $('#kosik_sumar .kosik_suma .suma').text(0);
    $('#infolist h3').each(function() {
        var cena_pizze = $(this).children(".kosik_item_header").children(".kosik_pizza_cena").children(".suma").text();
        var suma = Number($('#kosik_sumar .kosik_suma .suma').text()) + Number(cena_pizze);
        $('#kosik_sumar .kosik_suma .suma').text(suma);
    });
}

function on_clicked_pridat_suroviny() {
    var zoznam = $(this).next();
    pridat_suroviny(zoznam);
//    pridat_suroviny_test(zoznam);
}

function vloz_surovinu(zoznam, surovina, cena) { // zavolaj tuto funkciu, ked chces, aby sa pridala do nejakeho zoznamu nova surovina
    zoznam.append('<li><span class="surovina_delete"></span><span class="surovina_nazov">' + surovina + '</span> <span class="surovina_cena">' + cena + '</span><span>€</span>' + '</li>');
    
    // prepocitavanie ceny
    var pridana_surovina = zoznam.children().last();
    var kosik_item_header = pridana_surovina.parent().parent().prev().children(".kosik_item_header");
    var celkova_suma = Number(kosik_item_header.children(".kosik_pizza_cena").children(".suma").text());
    var pocet_pizz = Number(kosik_item_header.children(".kosik_pocet").text());
    var nova_celkova_suma = celkova_suma + pocet_pizz * Number(cena);
    kosik_item_header.children(".kosik_pizza_cena").children(".suma").text(nova_celkova_suma);
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
            var kosik_item_header = $(this).parent().parent().prev().children(".kosik_item_header");
            var celkova_suma = Number(kosik_item_header.children(".kosik_pizza_cena").children(".suma").text());
            var pocet_pizz = Number(kosik_item_header.children(".kosik_pocet").text());
            var nova_celkova_suma = celkova_suma - pocet_pizz * cena_suroviny;
            kosik_item_header.children(".kosik_pizza_cena").children(".suma").text(nova_celkova_suma);
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

function on_kosik_objednaj() {
    alert('Objednavka odoslana');
    
}