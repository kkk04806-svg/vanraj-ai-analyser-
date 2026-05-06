<?php
header("Access-Control-Allow-Origin: *");
echo file_get_contents("https://api.frastonikelubra.com/WinGo/WinGo_30S/GetHistoryIssuePage.json");
?>
