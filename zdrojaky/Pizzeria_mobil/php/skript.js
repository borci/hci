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
            
    // inicializacia kosika
    init_kosik();
   

    // inicializacia centralnej casti (menu pizze)    
    init_menu_pizze();
});
