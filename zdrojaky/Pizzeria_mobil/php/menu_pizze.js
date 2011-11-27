function init_menu_pizze() {
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

