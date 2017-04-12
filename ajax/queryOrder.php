<?php
require('../common/DBHelper.php');
header("Content-type:application/json;charset=utf-8");
$pageSize = isset($_REQUEST['_pageSize']) ? $_REQUEST['_pageSize'] : 5;
$pageNum = isset($_REQUEST['_pageNum']) ? $_REQUEST['_pageNum'] : 0;

try {
    $db = DBHelper::getConn();
    $sqlStr = "select count(1) from orders";
    $result = $db->query($sqlStr);
    $row = $result->fetch_row();
    $total = $row[0];
    if($total == '0'){
        echo '{"retFlag":1,"rows":[],"total":0}';
        exit;
    }
    $result->free();
    $sqlStr = "select order_id,sender,senderPhone,createTime,if(isPublic='0','否','是') from orders limit " . ($pageNum * $pageSize) . "," . $pageSize;
    $stmt = $db->prepare($sqlStr);
    $stmt->bind_result($order_id, $sender, $senderPhone, $createTime, $isPublic);
    $stmt->execute();
}catch (mysqli_sql_exception $e){
    echo '{"retFlag":0,"retMsg":"'.$e->getMessage().'"}';
    exit;
}
$json = '{"retFlag":1,"total":'.$total.',"rows":[';
$isHeader = true;
while($stmt->fetch()){
    if($isHeader){
        $isHeader = false;
    }else{
        $json .= ',';
    }
    $json .= '{"order_id":"'.$order_id.'","sender":"'.$sender.'","senderPhone:":"'.$senderPhone.
        '","createTime":"'.$createTime.'","isPublic":"'.$isPublic.'"}';
}
$json .= ']}';
echo $json;