var obj_pizza;
var menu_scroll;
var pridavanie_scroll;
var filter_scroll;

function init_menu_pizze() {
	
	// **************************************************************************
	// *************************** zoznam pizz **********************************
	// **************************************************************************
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
    // *************************************************
    // ********************* kosik *********************
    // *************************************************
    $('.right_panel').kinetic();
    $('#left').click(function(){
        $('.right_panel').kinetic('start', {
            velocity: 0
        });
    });
    $('#right').click(function(){
        $('.right_panel').kinetic('start', {
            velocity: 0
        });
    });
    $('#end').click(function(){
        $('.right_panel').kinetic('end');
    });
    $('#stop').click(function(){
        $('.right_panel').kinetic('stop');
    });
    
    
    // **************************************************************************
    // ************************ pridavanie scrollovanie *************************
    // **************************************************************************
    $('.pridavanie').kinetic();
    $('#left').click(function(){
        $('.pridavanie').kinetic('start', {
            velocity: 0
        });
    });
    $('#right').click(function(){
        $('.pridavanie').kinetic('start', {
            velocity: 0
        });
    });
    $('#end').click(function(){
        $('.pridavanie').kinetic('end');
    });
    $('#stop').click(function(){
        $('.pridavanie').kinetic('stop');
    });
    
    // **************************************************************************
    // **************************** filter scrollovanie *************************
    // **************************************************************************
    
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

	 // **************************************************************************
    // *********************************** filter *******************************
    // **************************************************************************
    
    $('.pridavanie input').each( function () {
        $(this).removeAttr('checked');
    });
         
    $('.filter').hide();
    $('.pridavanie').hide();
    $('#prazdny').hide();
    $('#pridavanie_titulka').hide();
   
	 scrollovanie();
        
    $('#filtrovanie_titulka').hide();
        
    $('#sipka_h').hide();
	 $('#sipka_d').show();
	 
	 $('#sipka_h2').hide();
	 $('#sipka_d2').hide();
	 
	 $('#sipka_h3').hide();
	 $('#sipka_d3').hide();
	 
	 $('.ukonci_pridavanie').click (function() {
		 $('#prazdny').hide();
		 $('.pridavanie').hide();
		 $('#pridavanie_titulka').hide();

	 
		 $('#sipka_h3').hide();
		 $('#sipka_d3').hide();
		 });
		 
	 $('.ukonci_filtrovanie').click (function() {
		
		 $('#sipka_h2').hide();
		 $('#sipka_d2').hide();
		 
		 $('.filter').slideUp(300);
		 $('#filtrovanie_titulka').slideUp(300);
		  $('#prazdny').hide();
		 
		 $('.menu').animate({scrollTop: '10000px'},0);
		 menu_scroll = $('.menu').scrollTop();
		 $('.menu').animate({scrollTop: '0px'},0);
		 
		 if ( $('.menu').scrollTop() == 0) {
						$('.menu').animate({scrollTop: '1px'},0);
						var a = $('.menu').scrollTop();
						$('.menu').animate({scrollTop: '0px'},0);
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
		});
	  	 
    $('#button_f').click( function() {
		  $('#prazdny').show();
					$('#filtrovanie_titulka').slideDown(350);
					$('.filter').slideDown(350);
					
					$('#sipka_h').hide();
					$('#sipka_d').hide();
					
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
    
    $('.pridavanie').scroll(function () { 
				
      if ($('.pridavanie').scrollTop() == pridavanie_scroll) {
			 $('#sipka_d3').hide();
			 $('#sipka_h3').show();	 
		}
		else if ($('.pridavanie').scrollTop() == 0) {
			 $('#sipka_h3').hide();
			 $('#sipka_d3').show();			
		}
		else {
			$('#sipka_d3').show();
			$('#sipka_h3').show();
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
    
    // **************************************************************************
    //************************ pridavanie do kosika *****************************
    // **************************************************************************
    $('.menu button').click( function() { 
		 var meno_cena = $(this).val();
		 var meno_cena_pole = meno_cena.split('@');
		 var meno = meno_cena_pole[0];
		 var cena = meno_cena_pole[1];
		 pridat_do_kosika(meno,cena);
		 });
		
	// **************************************************************************	 
	// ************************** pridavanie surovin ****************************
	// **************************************************************************
	
	$('.pridavanie input').click( function() {
		var surovina_cena = $(this).val();
		var surovina_cena_pole = surovina_cena.split('@');
		var surovina = surovina_cena_pole[0];
		var cena = surovina_cena_pole[1];
				
		if ($(this).is(':checked')) vloz_surovinu(obj_pizza, surovina, cena); 
		else 	odstran_surovinu(obj_pizza, surovina);
		});	 
}

//***************** Pridavanie surovin ************************

function pridat_suroviny(zoznam) {
	$('.pridavanie input').each( function () {
        $(this).removeAttr('checked');
    });
   $('#prazdny').show(); 
	$('.pridavanie').show();
	$('#pridavanie_titulka').show();
	$('.pridavanie').animate({scrollTop: '0px'},0);
	$('#sipka_h3').hide();
	$('#sipka_d3').show();
	obj_pizza = zoznam;
	var pole = new Array();
	pole = get_suroviny(zoznam);
	for(var j=0;j<pole.length;j++) { checkni(pole[j]); }
	
	}
// **************************************************************************
// *********************** funkcie k filtrovaniu ****************************
// **************************************************************************

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

function checkni(a) {
	$('.pridavanie input').each(function() {
		var v = $(this).val();
		var p = v.split('@');
		if (p[0] == a) {$(this).attr('checked','checked');}
	});
}


// *****************************************************************************
// *****************************************************************************

function scrollovanie() {
	 $('.menu').css('z-index','-1');
    $('.menu').animate({scrollTop: '10000px'},0);
    menu_scroll = $('.menu').scrollTop();
    $('.menu').animate({scrollTop: '0px'},0);
    $('.menu').css('z-index','1');
    
    $('.pridavanie').css('z-index','-1');
    $('.pridavanie').show();
    $('.pridavanie').animate({scrollTop: '10000px'},0);
    pridavanie_scroll = $('.pridavanie').scrollTop();
    $('.pridavanie').animate({scrollTop: '0px'},0);
    $('.pridavanie').hide();
    $('.pridavanie').css('z-index','112');
    
    $('.filter').css('z-index','-2');
    $('.filter').show();
    $('.filter').animate({scrollTop: '10000px'},0);
    filter_scroll = $('.filter').scrollTop();
    $('.filter').animate({scrollTop: '0px'},0);
    $('.filter').hide();
    $('.filter').css('z-index','112');
}
