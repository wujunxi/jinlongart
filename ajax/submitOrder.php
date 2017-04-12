<?php

require('../common/DBHelper.php');
header("Content-type:application/json;charset=utf-8");

$sender = $_POST['sender'];
$senderPhone = $_POST['senderPhone'];
$senderAddress = $_POST['senderAddress'];
$receiver = $_POST['receiver'];
$receivePhone = $_POST['receivePhone'];
$receiveAddress = $_POST['receiveAddress'];
$sendContent = $_POST['sendContent'];
$sendStory = $_POST['sendStory'];

//if(!get_magic_quotes_gpc()){
//    $sender = addslashes($sender);
//    $senderPhone = addslashes($senderPhone);
//    $senderAddress = addslashes($senderAddress);
//    $receiver = addslashes($receiver);
//    $receivePhone = addslashes($receivePhone);
//    $receiveAddress = addslashes($receiveAddress);
//    $sendContent = addslashes($sendContent);
//    $sendStory = addslashes($sendStory);
//}

$db = DBHelper::getConn();

$sqlStr = "insert into orders(sender,senderPhone,senderAddress,receiver,".
    "receivePhone,receiveAddress,sendContent,sendStory,createTime)".
    "values(?,?,?,?,?,?,?,?,now()) ";
$stmt = $db->prepare($sqlStr);
$stmt->bind_param("ssssssss",$sender,$senderPhone,$senderAddress,
    $receiver,$receivePhone,$receiveAddress,$sendContent,$sendStory);
$stmt->execute();
if($stmt->affected_rows > 0){
    echo '{"retFlag":1,"retMsg":"'.'"}';
}else{
    echo '{"retFlag":0,"retMsg":"insert fail."}';
}
$stmt->close();
$db->close();