<?php
header('Content-type:application/json');

$user = $_REQUEST['user'];
$pwd = $_REQUEST['pwd'];

$db = @ new mysqli('localhost', 'jinlongart', 'jinlongart', 'jinlongart');

if (mysqli_connect_errno()) {
    echo mysqli_connect_errno() . 'Error:Could not connet to database.';
    exit;
}

$query = "select t.name from users t where t.account = ? and t.password = ?";
$stmt = $db->prepare($query);
$stmt->bind_param("ss", $user, $pwd);
$stmt->execute();
$result = $stmt->get_result();
$num_results = $result->num_rows;
if ($num_results > 0) {
    $row = $result->fetch_assoc();
    $name = $row['name'];
    echo '{"result":1,"name":"' . $name . '"}';
} else {
    echo '{"result":3}';
}

$stmt->close();
$db->close();