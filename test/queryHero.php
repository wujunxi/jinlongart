<?php
require('DBHelper.php');
header('Content-type:application/json;charset=utf-8');
$pageSize = $_REQUEST['_pageSize'];
$pageNum = $_REQUEST['_pageNum'];

$pageSize = isset($pageSize) ? intval($pageSize) : 5;
$pageNum = isset($pageNum) ? intval($pageNum) : 0;
try {
    $db = DBHelper::getConn();
    $sqlStr = "select count(1) from test_hero";
    $result = $db->query($sqlStr);
    $row = $result->fetch_row();
    $total = $row[0];
    if ($total == '0') {
        echo '{"retFlag":1,"rows":[],total:0}';
        exit;
    }
    $result->free();
    $sqlStr = "select * from test_hero limit " . ($pageNum * $pageSize) . "," . $pageSize;
    $stmt = $db->prepare($sqlStr);
    $stmt->bind_result($id, $name, $occupation, $faction, $skill);
    $stmt->execute();
    $json = '{"retFlag":1,"total":' . $total . ',"rows":[';
    $isHeader = true;
    while ($stmt->fetch()) {
        if ($isHeader) {
            $isHeader = false;
        } else {
            $json .= ',';
        }
        $json .= '{"id":"' . $id . '","name":"' . $name . '","occupation":"' . $occupation . '","faction":"' . $faction . '","skill":"' . $skill . '"}';
    }
    $json .= ']}';
    echo $json;
    $stmt->close();
    $db->close();
} catch (mysqli_sql_exception $e) {
    echo '{"retFlag":0,"retMsg":"' . $e->getMessage() . '"}';
    exit;
}