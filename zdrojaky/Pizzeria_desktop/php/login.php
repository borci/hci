<?php

session_start();

// ulozenie prijatych premennych
$target = $_REQUEST['target'];
$login = $_REQUEST['login'];
$password = $_REQUEST['password'];

$meno = $_REQUEST['meno'];
$kontakt = $_REQUEST['kontakt'];
$adresa = $_REQUEST['adresa'];


if ($target == 'login') { // login request
    if (!isset($_SESSION[$login])) { // ak pouzivatel neexistuje
        echo "status=Error\n";
        echo "message=Používateľ neexistuje";
        exit;
    }
    $user = $_SESSION[$login];
    if ($user['password'] != $password) {
        echo "status=Error\n";
        echo "message=Nesprávne heslo";
        exit;
    }
    // ok, pouzivatel overeny
    echo "status=OK\n";
    echo "meno={$user['meno']}\n";
    echo "kontakt={$user['kontakt']}\n";
    echo "adresa={$user['adresa']}";
    exit;
} elseif ($target == 'register') { // register request
    if (isset($_SESSION[$login])) { // ak je login uz obsadeny
        echo "status=Error\n";
        echo "message=Používateľ už existuje";
        exit;
    }
    if (!isset($password) or strlen($password) < 1) { // TODO: overit to isset - ked sa do premennej priraduje neexistujuca premenna ... ?
        echo "status=Error\n";
        echo "message=Nebolo zadané heslo";
        exit;
    }
    // ok, registracia uspesna
    $user['password'] = $password;
    $user['meno'] = $meno;
    $user['kontakt'] = $kontakt;
    $user['adresa'] = $adresa;
    $_SESSION[$login] = $user;

    echo "status=OK";
    exit;
} elseif ($target == 'update') { // aktualizacia udajov
//    $user = $_SESSION[$login];
    $user['password'] = $password;
    $user['meno'] = $meno;
    $user['kontakt'] = $kontakt;
    $user['adresa'] = $adresa;
    $_SESSION[$login] = $user;

    echo "status=OK";
    exit;
} else { // error
    echo "status=Error\n";
    echo "message=Unknown target";
}
?>