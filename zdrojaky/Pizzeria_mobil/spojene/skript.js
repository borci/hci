$(document).ready(function(){
    $(".left_trigger").click(function(){
        $(".left_panel").toggle("fast");
        $(this).toggleClass("active");
        return false;
    });
                
    $(".right_trigger").click(function(){
        $(".right_panel").toggle("fast");
        $(this).toggleClass("active");
        return false;
    });
                
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
        $(obsah).fadeOut("medium", function(){$(obsah).remove();});
        $(nadpis).fadeOut("medium", function(){$(nadpis).remove();});
        return false;
    });
});

function vypln_adresu() {
    document.getElementById('meno').value = "Jožko Mrkvička";
    document.getElementById('ulica').value = "Pod viaduktom 4";
    document.getElementById('mesto').value = "Horná Dolná";
}