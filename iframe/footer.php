<link rel="stylesheet" type="text/css" href="/css/footer.css" />
<div class="footer">
    © 2015 jinlongart <?php
    $USER_NAME = $_SESSION['user_name'];
    if(isset($USER_NAME)){
        echo "<span class=\"logout-btn\">$USER_NAME</span>";
    }else{
        echo '<span class="login-btn">管理员</span>';
    }
    ?>
</div>
<script type="text/javascript" src="/script/jquery-1.11.2.min.js" ></script>
<script type="text/javascript" src="/script/cover/jquery.cover.min.js" ></script>
<script type="text/javascript" src="/script/cpptable/jquery.cpptable.min.js" ></script>
<?php
    // 检查是否存在 同名的js文件，存在则引入.
    $script_name = str_replace(".php",".min.js",$_SERVER["SCRIPT_NAME"] == '/' ? '/index.php' : $_SERVER["SCRIPT_NAME"]);
    if(file_exists($_SERVER['DOCUMENT_ROOT'].'/script'.$script_name)){
        echo '<script type="text/javascript" src="/script'.$script_name.'" ></script>';
    }
?>
</body>
</html>