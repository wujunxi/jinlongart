$(function($){

    // 定义表格
    var tableSetting = {
        cols: [
            {name: "姓名", code: "name"},
            {name: "职位", code: "occupation"},
            {name: "门派", code: "faction"},
            {name: "武功", code: "skill"},
            {name: "id", code: "id", isHide: true},
            {
                name: "操作", code: "oper", type: function (row) {
                return "<a class='detail' info='" + row["name"] + "'>详情</a>";
            }
            }
        ],
        showPage: true,
        url: "queryHero.php",
        onBeforeQuery: function () {
            $.cover("open", "数据查询中...");
        },
        onAfterQuery: function () {
            $.cover("close");
        },
        error: function () {
            $.cover("alert", "查询异常!");
        }
    }

    // 初始化表格
    var $table1 = $("#table1").cpptable(tableSetting).cpptable("query");

    // 监听事件

    $table1.delegate(".detail","click",function(){
        $.cover("alert",$(this).attr("info"));
    });

    $("#selPageSize").change(function(){
        $table1.cpptable("set","pageSize",$(this).val()).cpptable("query");
    });
});