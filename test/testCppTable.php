<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Test cpptable</title>
    <link href="css/testCppTable.css" rel="stylesheet">
    <link href="js/cover/jquery.cover.css" rel="stylesheet">
    <link href="js/cpptable/jquery.cpptable.css" rel="stylesheet">
</head>
<body>
<div class="container">
    <div class="left">
        <ul>
            <li>Home</li>
            <li>News</li>
            <li>Product</li>
            <li>About</li>
        </ul>
    </div>
    <div class="right">
        <lable for="selPageSize">每页大小</lable>
        <select id="selPageSize">
            <option value="10">10</option>
            <option value="5">5</option>
        </select>
        <table id="table1">

        </table>

        <br/>
        <br/>
        <br/>

        <ul class="pagination">
            <li class="page-prev">上一页</li>
            <li>1</li>
            <li>2</li>
            <li class="page-ellipse">...</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li class="page-active">7</li>
            <li>8</li>
            <li>9</li>
            <li>10</li>
            <li>11</li>
            <li>12</li>
            <li>13</li>
            <li class="page-next">下一页</li>
        </ul>

    </div>
</div>
<script type="text/javascript" src="js/jquery-1.11.2.min.js"></script>
<script type="text/javascript" src="js/cover/jquery.cover.min.js" ></script>
<script type="text/javascript" src="js/cpptable/jquery.cpptable.js"></script>
<script type="text/javascript" src="js/testCppTable.js"></script>
</body>
</html>