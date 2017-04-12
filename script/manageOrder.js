$(function () {
    var tableSetting = {
        cols: [
            {name: "编码", code: "order_id", width: 50},
            {name: "订单号", code: "seq"},
            {name: "寄件人", code: "sender"},
            {name: "联系电话", code: "senderPhone"},
            {name: "创建时间", code: "createTime"},
            {name: "是否公开", code: "isPublic", width: 80},
            {
                name: "操作", code: "oper", width: 80, type: function (row) {
                return "<span class='clickable detail' info='" + row["order_id"] + "'>详情</span>";
            }
            }
        ],
        showPage: true,
        url: "/ajax/queryOrder.php",
        onBeforeQuery: function () {
            $.cover("open", "数据查询中...");
        },
        onAfterQuery: function () {
            $.cover("close");
        },
        error: function () {
            $.cover("alert", "查询异常!");
        }
    };

    var $orderList = $("#orderList").cpptable(tableSetting).cpptable("query");

    $orderList.delegate(".detail","click",function(){
        var id = $(this).attr("info");
        window.location.href = "orderDetail.php?order_id="+id;
    });

});