var obj_pizza;
var menu_scroll;
var pridavanie_scroll;
var filter_scroll;

function init_menu_pizze() {
	
	$('#info').hide();
   $('#prazdny').hide();
   $('#pridavanie_div').hide();
   $('#filtrovanie').hide();
   $('#informacie_titulka').hide();
   
   $('.pridavanie input').each( function () {
      $(this).removeAttr('checked');
   });
          
	$('.ukonci_pridavanie').click (function() {
		  $('#pridavanie_div').hide();
	});
		 
	$('.ukonci_filtrovanie').click (function() {
       $('#filtrovanie').hide();	 
	});
	 	  	 
    $('#button_f').click( function() {
		$('#filtrovanie').show();
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
		 global_message_info("Pridaná pizza: " + meno,"normal");
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
		return true;
		});	 
}

//***************** Pridavanie surovin ************************

function pridat_suroviny(zoznam, nazov_pizze) {
	$('.pridavanie input').each( function () {
        $(this).removeAttr('checked');
    });
   $('#pridavanie_titulka h5').text("pre pizzu ");
   $('#pridavanie_titulka h5').append(nazov_pizze);
   $('#pridavanie_div').show();
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
