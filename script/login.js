/**
 * Created by wujx on 15/5/3.
 */
$(function(){
    var LOGIN_RESULT = {
        success:1,
        userNotExist:2,
        pwdError:3
    };

    var $user = $("#user"),
        $pwd = $("#pwd"),
        $tips = $(".login-tips"),
        $btnTrue = $(".login-true"),
        $btnFalse = $(".login-false"),
        $loginUser = $(".login-user"),
        $panelA = $(".panelA"),
        $panelB = $(".panelB"),
        isLogin = false;

    function closeLoginBox(){
        $(".login-box").hide();
        $tips.text("");
        $user.val("");
        $pwd.val("");
    }

    $(".login-btn").click(function(){
        $(".login-box").show();
        if(isLogin){
            $panelA.hide();
            $panelB.show();
        }else{
            $panelB.hide();
            $panelA.show();
            $user.focus();
        }
    });
    $btnFalse.click(closeLoginBox);
    $btnTrue.click(function(){
        if(isLogin){
            closeLoginBox();
            return;
        }
        var user = $user.val(),pwd = $pwd.val();
        if($.trim(user) == ""){
            $tips.text("用户名不能为空！");
            $user.focus();
            return;
        }
        if($.trim(pwd) == ""){
            $tips.text("密码不能为空！");
            $pwd.focus();
            return;
        }
        $.ajax({
            url:"/ajax/login.php",
            type:"POST",
            data:{user:user,pwd:pwd},
            dataType:"json",
            success:function(d){
                if(d.result == LOGIN_RESULT.success){
                    closeLoginBox();
                    $loginUser.text(d.name);
                    isLogin = true;
                }else if(d.result == LOGIN_RESULT.pwdError){
                    $tips.text("密码错误！");
                    $pwd.focus().select();
                }else if(d.result == LOGIN_RESULT.userNotExist){
                    $tips.text("用户不存在！");
                    $user.focus().select();
                }
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){
                console.error("ajax error!"+textStatus);
            }
        });
    });
});