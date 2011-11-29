<?php
session_start();
header('Content-type: text/plain');
//header('Content-encoding: utf-8');
print_r($_SESSION);
?>