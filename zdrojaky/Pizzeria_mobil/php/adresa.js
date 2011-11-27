function loadXMLDoc()
{
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET","ajax_info.txt",true);
    xmlhttp.send();
}

function loginUser()
{
    //    alert('idem');
    //    $('#lmeno').text("novy text");
    //    alert('stale');

    var xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            var response = new Array();
            riadky = xmlhttp.responseText.split('\n');
            for(var riadok in riadky) {
                slova = riadky[riadok].split('=');
                response[slova[0]] = slova[1];
            }
            if (response["status"] == 'OK') {
                alert('Login OK');
                $('#adresa_meno').attr("value", response["meno"]);
                $('#adresa_kontakt').attr("value", response["kontakt"]);
                $('#adresa_adresa').attr("value", response["adresa"]);
                
                $(obsah).fadeOut("medium", function(){
                    $(obsah).remove();
                });
                
                var nadpis = $(this).parent();
                var obsah = $(nadpis).next();
                $(obsah).fadeOut("medium", function(){
                    $(obsah).remove();
                });
                $(nadpis).fadeOut("medium", function(){
                    $(nadpis).remove();
                    update_platit_spolu();
                });


            } else {
                alert('zle je');
            }
            
        }
    }
    xmlhttp.open("GET","ajax_text.php",true);
    xmlhttp.send();
}

function registerUser()
{
    
    
}