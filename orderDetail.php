<?php include("iframe/header.php") ?>
<?php include("iframe/nav.php") ?>
    <link type="text/css" rel="stylesheet" href="/css/orderDetail.css">
    <div class="main">
<?php
    require("common/DBHelper.php");
    $order_id = isset($_GET["order_id"]) ? $_GET["order_id"] : -1;
    $db = DBHelper::getConn();
    $sqlStr = "select order_id,code,sender,senderPhone,senderAddress,receiver,receivePhone,receiveAddress,sendContent,".
        "sendStory, isPublic,title,subTitle,content,createTime,modifyTime from orders where order_id = ?";
    $stmt = $db->prepare($sqlStr);
    $stmt->bind_param("i",$order_id);
    $stmt->bind_result($order_id,$code,$sender,$senderPhone,$senderAddress,$receiver,$receivePhone,$receiveAddress,$sendContent,
        $sendStory,$isPublic,$title,$subTitle,$content,$createTime,$modifyTime);
    $stmt->execute();
    if($stmt->fetch()){
        ?>
    <div class="block-green">
        <input type="hidden" id="menuid" value="<?php echo $order_id ?>">
        <div class="row-key">寄件人姓名</div>
        <div class="row-value"><?php echo $sender ?></div>
        <div class="row-key">联系电话</div>
        <div class="row-value"><?php echo $senderPhone ?></div>
        <div class="row-key">寄件人地址</div>
        <div class="row-value"><?php echo $senderAddress ?></div>
    </div>
    <div class="block-yellow">
        <div class="row-key">收件人姓名</div>
        <div class="row-value"><?php echo $receiver ?></div>
        <div class="row-key">联系电话</div>
        <div class="row-value"><?php echo $receivePhone ?></div>
        <div class="row-key">收件人地址</div>
        <div class="row-value"><?php echo $receiveAddress ?></div>
    </div>
    <div class="block-blue">
        <div class="row-key">投寄内容</div>
        <div class="row-value"><?php echo $sendContent ?></div>
        <div class="row-key">背景故事</div>
        <div class="row-value"><?php echo $sendStory ?></div>
    </div>
    <div class="block-red">
        <label for="title" class="row-key">标题</label>
        <div class="row-value"><input type="text" value="<?php echo $title ?>" id="title"></div>
        <label for="subTitle" class="row-key">副标题</label>
        <div class="row-value"><input type="text" value="<?php echo $subTitle ?>" id="subTitle"></div>
        <label for="content" class="row-key">正文</label>
        <div class="row-value"><textarea id="content"><?php echo $content ?></textarea></div>
        <label for="pic" class="row-key">图片</label>
        <div class="row-value"></div>
        <label for="videoCode" class="row-key">视频码</label>
        <div class="row-value"><input id="videoCode" type="text" value=""></div>
        <label for="" class="row-key">快递单截图</label>
        <div class="row-value"></div>
        <label for="code" class="row-key">快递单号</label>
        <div class="row-value"><input type="text" id="code" value="<?php echo $code ?>"></div>
        <label class="row-key">是否公开</label>
        <div class="row-value">
            <label for="isPublicT">是</label>
            <input type="radio" value="1" name="isPublic" id="isPublicT" <?php if($isPublic)echo 'checked="checked"' ?>>
            <label for="isPublicF">否</label>
            <input type="radio" value="0" name="isPublic" id="isPublicF" <?php if(!$isPublic)echo 'checked="checked"' ?>>
        </div>
    </div><?php
    }else{
        echo '<h1>所查询的订单不存在.</h1>';
    }
$stmt->close();
$db->close();
?>
    </div>
<?php include("iframe/footer.php") ?>