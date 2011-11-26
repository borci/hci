$(document).ready(function(){
//    ******************** triggery pre vysuvanie panelov *****************
    $(".left_trigger").click(function(){
        $(".right_trigger").toggle();
        $(".left_panel").toggle("fast");
        $(this).toggleClass("active");
        return false;
    });
                
    $(".right_trigger").click(function(){
        $(".left_trigger").toggle();
        $(".right_panel").toggle("fast");
        $(this).toggleClass("active");
        return false;
    });
            
//    ******************* kosik ****************************
    $("#infolist").accordion({
        autoHeight: false,
        //        fillSpace: true,
        collapsible: true,
        active: false,
        header: 'h3'
    //        event: "mouseover"
    });
    
    $('#infolist h3 .kosik_delitem').click(function(){
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

    $('#infolist h3 .kosik_plus').click(function(){
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

    $('#infolist h3 .kosik_minus').click(function(){
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
    
//    ************ zoznam pizz ********************
    $('#menu').kinetic();
    $('#left').click(function(){
        $('#menu').kinetic('start', {
            velocity: 0
        });
    });
    $('#right').click(function(){
        $('#menu').kinetic('start', {
            velocity: 0
        });
    });
    $('#end').click(function(){
        $('#menu').kinetic('end');
    });
    $('#stop').click(function(){
        $('#menu').kinetic('stop');
        

    });
});

function update_platit_spolu() {
    $('#kosik_sumar .kosik_suma .suma').text(0);
    $('#infolist h3').each(function() {
        var cena_pizze = $(this).children(".kosik_item_header").children(".kosik_pizza_cena").children(".suma").text();
        var suma = Number($('#kosik_sumar .kosik_suma .suma').text()) + Number(cena_pizze);
        $('#kosik_sumar .kosik_suma .suma').text(suma);
    });
}

function vypln_adresu() {
    document.getElementById('meno').value = "Ján Novotný";
    document.getElementById('ulica').value = "0949123456";
    document.getElementById('mesto').value = "Agátová 12, Bratislava";
}