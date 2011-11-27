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
    
//    ************ zoznam pizz ********************
    $('.menu').kinetic();
    $('#left').click(function(){
        $('.menu').kinetic('start', {
            velocity: 0
        });
    });
    $('#right').click(function(){
        $('.menu').kinetic('start', {
            velocity: 0
        });
    });
    $('#end').click(function(){
        $('.menu').kinetic('end');
    });
    $('#stop').click(function(){
        $('.menu').kinetic('stop');


    });
    
    // **************************** filter scrollovanie *************************
    
    $('.filter').kinetic();
    $('#left').click(function(){
        $('.filter').kinetic('start', {
            velocity: 0
        });
    });
    $('#right').click(function(){
        $('.filter').kinetic('start', {
            velocity: 0
        });
    });
    $('#end').click(function(){
        $('.filter').kinetic('end');
    });
    $('#stop').click(function(){
        $('.filter').kinetic('stop');
    });

    // *********************************** filter *******************************
    
          
    $('.filter').hide();
   
	 $('.menu').css('z-index','-1');
    $('.menu').animate({scrollTop: '10000px'},0);
    var menu_scroll = $('.menu').scrollTop();
    $('.menu').animate({scrollTop: '0px'},0);
    $('.menu').css('z-index','1');
    
    $('.filter').css('z-index','-2');
    $('.filter').show();
    $('.filter').animate({scrollTop: '10000px'},0);
    var filter_scroll = $('.filter').scrollTop();
    $('.filter').animate({scrollTop: '0px'},0);
    $('.filter').hide();
    $('.filter').css('z-index','2');
      
    
    $('#sipka_h').hide();
	 $('#sipka_d').show();
	 
	 $('#sipka_h2').hide();
	 $('#sipka_d2').hide();
	 
    $('#button_f').click( function() {
				if ($('.filter').is(":visible")) {
								
									
					$('.menu').animate({scrollTop: '10000px'},0);
					menu_scroll = $('.menu').scrollTop();
					$('.menu').animate({scrollTop: '0px'},0);
					$('.filter').slideUp(350);
					
					$('#sipka_h2').hide();
					$('#sipka_d2').hide();
					
					if ( $('.menu').scrollTop() == 0) {
						$('.menu').animate({scrollTop: '1px'},0);
						var a = $('.menu').scrollTop();
						$('#sipka_h').hide();
						$('#sipka_d').show();
						if (menu_scroll == 0) $('#sipka_d').hide();
					}
					
					else if ($('.menu').scrollTop() == menu_scroll) {
						$('#sipka_h').hide();
						$('#sipka_d').show();
						
					}
					else {
						$('#sipka_d').show();
						$('#sipka_h').show();
					}
					}
				else {
					
					$('.filter').slideDown(350);
					
					 
					$('#sipka_h').hide();
					$('#sipka_d').hide();
					$('#sipka_h2').show();
					$('#sipka_d2').show();
					
					if ($('.filter').scrollTop() == filter_scroll) {
						$('#sipka_d2').hide();
						$('#sipka_h2').show();
					}
					else if ($('.filter').scrollTop() == 0) {
						$('#sipka_h2').hide();
						$('#sipka_d2').show();
					}
					else {
						$('#sipka_d2').show();
						$('#sipka_h2').show();
					}
				}
		  });
   
	$('.menu').scroll(function () { 
      
      if ($('.menu').scrollTop() == menu_scroll) {
			 $('#sipka_d').hide();
			 $('#sipka_h').show();
			 if ( $('.menu').scrollTop() == 0) {
				$('#sipka_h').hide();
				$('#sipka_d').hide();
			}
		}
		else if ( $('.menu').scrollTop() == 0) {
			 $('#sipka_h').hide();
			 $('#sipka_d').show();
		}
		else {
			$('#sipka_d').show();
			$('#sipka_h').show();}
    });
    
    $('.filter').scroll(function () { 
				
      if ($('.filter').scrollTop() == filter_scroll) {
			 $('#sipka_d2').hide();
			 $('#sipka_h2').show();	 
		}
		else if ($('.filter').scrollTop() == 0) {
			 $('#sipka_h2').hide();
			 $('#sipka_d2').show();			
		}
		else {
			$('#sipka_d2').show();
			$('#sipka_h2').show();
		}
    });


	var stringOfClassNames = '';                                    		// vytvorenie a vynulovanie premennej
	$('.menu > li').each( function (i) {
		var thisClassString = $(this).attr('class');    						// ulozenie classu do premennej
		stringOfClassNames = stringOfClassNames +','+ thisClassString   	// postupne pridava do stringu classy
	});

	stringOfClassNames = jQuery.trim(stringOfClassNames);   // zbavi sa zbytocnych prazdnych znakov
	var arrayClasses = stringOfClassNames.split(',');       // vytvori sa pole s prvkami classou
   var arrayClasses = arrayClasses.sort();
	arrayUniqueClasses = (unique(arrayClasses));            // ako v shelly :-)
	
	if (arrayUniqueClasses.length > 1) {
		//$('<ul class="filter"><\/ul>').insertBefore('.menu');
		//$('.body_div').append('<ul class="filter"></ul>');
		
			//$.each(arrayUniqueClasses, function() {
			//if(this.length > 1) $('<li><input class="dynamicFilterInput" type="checkbox" id="'+this+'" value="'+this+'" id="filterID'+this+'" /><label for="filterID'+this+'">'+this+'<\/label><\/li>').appendTo('ul.filter');
		//});

		          $('.filter input').each( function () {
                        $(this).removeAttr('checked');
                    });

                $('.filter input').click( function() {
                        
                    if ($(this).is(':checked')) { 
                        var meno = $(this).val();
                        if (meno == "filterAll") {
                            $('.menu li').each( function () {
                                $(this).slideDown();
                            });

                            $('.filter input').each( function () {
                                $(this).removeAttr('checked');
                            });
                            return;
                        }
                  
                        
                    }
                    else {$(this).removeAttr('checked');}
                    
                    var zapnuteFiltre = '';
                    $('.filter input').each( function () {
                        var surovina = $(this).val();
                        if ($(this).is(':checked')) { zapnuteFiltre = zapnuteFiltre +','+ surovina;}
                    });
                    var poleZapnutychFiltrov = zapnuteFiltre.split(',');
             

                    if (poleZapnutychFiltrov.length == 1) {
                         $('.menu li').each( function () {
                            $(this).slideDown();
                        });
                    }

                    else  {
                        if (poleZapnutychFiltrov[1].length > 1) {
                        $('.menu li').each( function () {
                            var klasa = $(this).attr('class');
                            
                            var pole = klasa.split(',');
                            if(obsahuje(pole, poleZapnutychFiltrov,zapnuteFiltre)){
                                $(this).slideDown();
                                
                        }
                        else { $(this).slideUp(); }

                        });
                    }
               }
        });
    }
    //**************** filter koniec **********************
    
    
    
    
});

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

    // opatovne vytvorenie accordionu
    $('#infolist').accordion({
        autoHeight: false,
        collapsible: true,
        active: false,
        header: 'h3'
    });

}

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

//***************** funkcie k filtrovaniu *********************

function unique(a) {
	tmp = new Array(0);
	for(i=0;i<a.length;i++){
		if(!contains(tmp, a[i])){
			tmp.length+=1;
			tmp[tmp.length-1]=a[i];
		}
	}
	return tmp;
}

function contains(a, e) {
	for(j=0;j<a.length;j++)if(a[j]==e)return true;
	return false;
}

function removeItems(array, item) {
	var i = 0;
	while (i < array.length) {
		if (array[i] == item) {
			array.splice(i, 1);
		} else {
			i++;
		}
	}
	return array;
}

function obsahuje(a, e) {
	for(var j=1;j<e.length;j++) { if(!obsahuje2(a,e[j])) return false; }
	return true;
}

function obsahuje2(a, e) {
 	for(var j=0;j<a.length;j++)    if(a[j]==e) {return true;}
        return false;
}

// *****************************************************************************

