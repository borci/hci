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
}

function vloz_surovinu(zoznam, surovina, cena) { // zavolaj tuto funkciu, ked chces, aby sa pridala do nejakeho zoznamu nova surovina
    zoznam.append('<li><span class="surovina_nazov">' + surovina + '</span> <span class="surovina_cena">' + cena + '</span><span>€</span>' + '</li>');
    zoznam.children().last().click(function() {
//        alert('a');
        $(this).remove();
//         $(nadpis).fadeOut("medium", function(){
//            $(nadpis).remove();
//            update_platit_spolu();
//        });
    });
    
}

//function pridat_suroviny(zoznam) { // TOTO je iba testovacie demo, realna funkcia je inde
//    vloz_surovinu(zoznam, "surka", 2);
//}

function on_kosik_objednaj() {
    alert('Objednavka odoslana');
}