$(function(){
    var $sender = $("#sender"),
        $senderPhone = $("#senderPhone"),
        $senderAddress = $("#senderAddress"),
        $receiver = $("#receiver"),
        $receivePhone = $("#receivePhone"),
        $receiveAddress = $("#receiveAddress"),
        $sendContent = $("#sendContent"),
        $sendStory = $("#sendStory");

    $("#btnSubmit").click(function(){
        var order = getOrder();
        if(!checkField(order)){
            return;
        }
        $.cover("open","数据处理中...");
        $.ajax({
            url:"/ajax/submitOrder.php",
            type:"POST",
            dataType:"json",
            data:order,
            success:function(result){
                if(result.retFlag == 1){
                    $.cover("alert","提交成功！",reset);
                }else{
                    $.cover("alert","提交失败！",reset);
                }
            },
            error:function(x,t,m){
                $.error(t);
            }
        });
    });

    function checkField(order){
        if(order.sender.length == 0 || order.sender.length > 10){
            $.cover("alert","寄件人姓名不能为空，且长度不能超过10个字符。",function(){
                $sender.focus().select();
            });
            return false;
        }
        if(!/^\d{1,20}$/.test(order.senderPhone)){
            $.cover("alert","寄件人联系电话不能为空，且长度不能超过20个数字。",function(){
                $senderPhone.focus().select();
            });
            return false;
        }
        if(order.senderAddress.length > 50){
            $.cover("alert","寄件人地址长度不能超过50个字符。",function(){
                $senderAddress.focus().select();
            });
            return false;
        }
        if(order.receiver.length > 10){
            $.cover("alert","收件人姓名长度不能超过10个字符。",function(){
                $receiver.focus().select();
            });
            return false;
        }
        if(!/^\d{0,20}$/.test(order.receivePhone)){
            $.cover("alert","收件人联系电话长度不能超过20个数字。",function(){
                $receivePhone.focus().select();
            });
            return false;
        }
        if(order.receiveAddress.length > 50){
            $.cover("alert","收件人地址长度不能超过50个字符。",function(){
                $receiveAddress.focus().select();
            });
            return false;
        }
        if(order.sendContent.length == 0 || order.sendContent.length > 30){
            $.cover("alert","投寄内容不能为空，且长度不能超过30个字符。",function(){
                $sendContent.focus().select();
            });
            return false;
        }
        if(order.sendStory.length == 0 || order.sendStory.length > 400){
            $.cover("alert","投寄内容背景故事不能为空，且长度不能超过400个字符。",function(){
                $sendStory.focus().select();
            });
            return false;
        }
        return true;
    }

    function reset(){
        $(".order input,.order textarea").each(function(i,e){
            $(e).val("");
        });
    }

    function getOrder(){
        return {
            sender: $.trim($sender.val()),
            senderPhone: $.trim($senderPhone.val()),
            senderAddress:$.trim($senderAddress.val()),
            receiver:$.trim($receiver.val()),
            receivePhone:$.trim($receivePhone.val()),
            receiveAddress:$.trim($receiveAddress.val()),
            sendContent:$.trim($sendContent.val()),
            sendStory:$.trim($sendStory.val())
        };
    }
});