<?php include("iframe/header.php") ?>
<?php include("iframe/nav.php") ?>
<link type="text/css" rel="stylesheet" href="/css/order.css">
<div class="main">
    <div class="order">
        <h1 class="order-title">锦龙ART非物托运</h1>
        <h3 class="order-sub-title">服务热线：15999974019</h3>
        <div class="order-part">
            <label for="sender" class="order-key not-null">寄件人姓名</label>
            <input type="text" id="sender" class="order-value" >
            <label for="senderPhone" class="order-key not-null">联系电话</label>
            <input type="text" id="senderPhone" class="order-value" >
            <label for="senderAddress" class="order-key">寄件人地址</label>
            <textarea id="senderAddress" class="order-address"></textarea>
        </div><div class="order-part">
            <label for="receiver" class="order-key">收件人姓名</label>
            <input type="text" id="receiver" class="order-value" >
            <label for="receivePhone" class="order-key">联系电话</label>
            <input type="text" id="receivePhone" class="order-value" >
            <label for="receiveAddress" class="order-key">收件人地址</label>
            <textarea id="receiveAddress" class="order-address"></textarea>
        </div>
        <div class="order-part">
            <label for="sendContent" class="not-null">投寄内容</label><br>
            <textarea id="sendContent" class="order-content"></textarea>
        </div><div class="order-part">
            <label for="sendStory" class="not-null">投寄内容背景故事</label><br>
            <textarea id="sendStory" class="order-content"></textarea>
        </div>
    </div>
    <input type="button" value="提交" id="btnSubmit" class="order-submit">
</div>
<?php include("iframe/footer.php") ?>