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
        collapsible: true,
        active: false,
        header: 'h3'
    });

    
    $('#infolist h3 .kosik_delitem').click(function(){ // TODO: delete this function
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

    $('#infolist h3 .kosik_plus').click(function(){ // TODO: delete this function
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

    $('#infolist h3 .kosik_minus').click(function(){ // TODO: delete this function
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
    
    $('.kosik_add_suroviny').click(on_clicked_pridat_suroviny);
    $('.kosik_button_objednat').click(function() {
        on_kosik_objednaj();
    });
   

    // inicializacia centralnej casti (menu pizze)    
    init_menu_pizze();
});
