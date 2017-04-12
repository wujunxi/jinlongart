/**
 * jquery.cover
 * @author wujunxi
 * @date 2015-05-02
 * @version 0.1
 */

(function ($) {
    var $cover, $info, $msgbox, $msgboxinfo, $btnTrue, $btnFalse,
        isInit = false, isDebug = false,
        onTrueClick = null, onFalseClick = null;

    // private方法，初始化、打开遮盖层、关闭遮盖层
    /*
     * <main>
     *		<muslin>蒙层</muslin>
     *		<info>提示信息</info>
     *      <msgbox>
     *				<msgboxinfo>提示框信息</msgboxinfo>
     *				<btn-true>确认按钮</btn-true>
     *				<btn-false>取消按钮</btn-false>
     * 	    </msgbox>
     * </main>
     */
    var init = function () {
        $cover = $("<div>").addClass("cover-main");
        $("<div>").addClass("cover-muslin").appendTo($cover)
            .click(function () {
                // 是否调试状态
                if (isDebug) {
                    _close();
                }
            });
        $info = $("<div>").addClass("cover-info").appendTo($cover);
        $msgbox = $("<div>").addClass("cover-msgbox").appendTo($cover);
        $msgboxinfo = $("<div>").addClass("cover-msgboxinfo").appendTo($msgbox);
        $btnTrue = $("<div>").addClass("cover-btn-true").text("确认").appendTo($msgbox)
            .on("click", function () {
                _close();
                if (onTrueClick) {
                    onTrueClick();
                }
            });
        $btnFalse = $("<div>").addClass("cover-btn-false").text("取消").appendTo($msgbox)
            .on("click", function () {
                _close();
                if (onFalseClick) {
                    onFalseClick();
                }
            });
        $cover.appendTo($("body"));
    }, _open = function () {
        // 锁定滚动条
        $("html").eq(0).css("overflow", "hidden");
        $cover.show();
    }, _close = function () {
        $cover.hide();
        // 解除滚动条锁定
        $("html").eq(0).removeAttr('style');
    };

    // public方法表
    var methods = {
        open: function (info) {
            if (info) {
                $info.text(info);
            }
            $msgbox.hide();
            _open();
        },
        close: function () {
            _close();
        },
        "alert": function (info,callback) {
            isAlert = true;
            if (info) {
                $msgboxinfo.text(info);
            }
            onTrueClick = callback || null;
            $btnFalse.hide();
            $msgbox.show();
            _open();
        },
        "confirm": function (param) {
            // 合并入参
            param = $.extend({info: "", onTrue: null, onFalse: null}, param);
            if (param.info) {
                $msgboxinfo.text(param.info);
            }
            onTrueClick = param.onTrue;
            onFalseClick = param.onFalse;
            $btnFalse.show();
            $msgbox.show();
            _open();
        }
    };
    $.extend({
        cover: function () {
            var method = arguments[0];

            if (typeof(method) == "string" && method in methods) {
                method = methods[method];
                arguments = Array.prototype.slice.call(arguments, 1);
            } else if (typeof(method) == 'object' || !method) {

            } else {
                $.error('Method ' + method + ' does not exist on jQuery.cover');
                return this;
            }
            // 初始化，全局初始化一次
            if (!isInit) {
                init();
                isInit = true;
            }
            // 设置调试参数
            isDebug = !!arguments[1];

            return method.apply(this, arguments);
        }
    });
})(jQuery);
