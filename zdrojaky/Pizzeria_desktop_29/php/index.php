<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Pizzerka-desktop</title>

        <link rel="stylesheet" href="style.css" type="text/css" media="screen" />
        <link rel="stylesheet" href="bocne_panely.css" type="text/css" media="screen" />
        <link rel="stylesheet" href="filtre.css" type="text/css" media="screen" />
        <link rel="stylesheet" href="adresa.css" type="text/css" media="screen" />
        <link rel="stylesheet" href="menu_pizze.css" type="text/css" media="screen" />
        <link rel="stylesheet" href="kosik.css" type="text/css" media="screen" />
        <link rel="stylesheet" href="dialogy.css" type="text/css" media="screen" />
        <link rel="stylesheet" href="css/jquery-ui-1.8.16.custom.css" type="text/css" />
        <link rel="stylesheet" href="css/jquery.jscrollpane.css"  type="text/css"  media="all" />

        <script type="text/javascript" src="js/jquery_1.4.3.min.js"></script>
        <script type="text/javascript" src="js/jquery-1.6.3.js"></script>
        <script type="text/javascript" src="js/jquery-ui-1.8.16.custom.js"></script>
        <script type="text/javascript" src="js/jquery.kinetic.js"></script>
<!--        <script type="text/javascript" src="js/jquery.kineticscrollbar.js"></script>-->
        <script type="text/javascript" src="js/transify.js"></script>
<!--        <script type="text/javascript" src="js/jquery.mousewheel.js"></script>-->





        
        <script type="text/javascript" src="js/jquery.mousewheel.js"></script>
        <script type="text/javascript" src="js/jquery.jscrollpane.min.js"></script>

        <script type="text/javascript" src="skript.js"></script>
        <script type="text/javascript" src="adresa.js"></script>
        <script type="text/javascript" src="kosik.js"></script>
        <script type="text/javascript" src="menu_pizze.js"></script>
        <script type="text/javascript" src="dialogy.js"></script>

    </head>
    <body>
        <div class="body_div">
            <!--            tu bude zoznam pizz-->
            <?php
            include 'menu-pizze.html';
            ?>

            <!--   *****************      Lavy vysuvaci panel **********************-->
            <?php
            include 'adresa.html';
            ?>
            <a class="left_trigger trigger" href="#">adresa</a>

            <!--  *********************** Pravy vysuvaci panel **************-->
            <?php
            include 'kosik.html';
            ?>            
            <a class="right_trigger trigger" href="#">košík</a>


            <div style="clear:both;"></div>

            <?php
            include 'dialogy.html';
            ?>

        </div>
    </body>
</html>
