/********************************
 * jQuery.cpptable
 *
 * @author   wujunxi
 * @date     2015-04-30
 * @version  0.1
 *
 ********************************/
(function ($) {
    /* 常量 */
    // 表格类名，表体类名，表头类名，表尾类名...
    var CLASS = "cpptable",
        TBODY = "cpptable-tbody",
        THEAD = "cpptable-thead",
        TFOOT = "cpptable-tfoot",
        RADIO = "cpptable-radio",
        CHECK = "cpptable-checkbox",
        RADIO_W = "cpptable-radio-w",
        CHECK_W = "cpptable-checkbox-w",
        CHECK_ALL = "cpptable-checkall",
        PAGE = "cpptable-page",
        PREV_PAGE = "cpptable-prev",
        NEXT_PAGE = "cpptable-next",
        FIRST_PAGE = "cpptable-first",
        LAST_PAGE = "cpptable-last",
        CURRENT_PAGE = "cpptable-current",
        DISABLE = "cpptable-disable",
        HIGHLIGHT = "cpptable-highlight";

    /* 私有方法 */

    /**
     * 构造单元格方法
     * @param opt 单元格配置
     * @param row 行对象
     * @returns {*|HTMLElement}
     */
    var cell = function (opt, row) {
            // 与默认设置合成
            opt = $.extend({
                // 是否<th>
                isTh: false,
                // 是否隐藏
                isHide: false,
                // 外部类
                wrapClass: null,
                // 内部类
                innerClass: null,
                // 键
                key: null,
                // 值
                val: "",
                // 单元格类型
                type: "text",
                // name属性
                name: null,
                // 宽度
                width : null
            }, opt);
            var $cell = opt.isTh ? $("<th>") : $("<td>"),
                $elem;
            // 添加键
            if (opt.key) {
                $cell.attr("key", opt.key);
            }
            // 添加td样式
            if (opt.wrapClass) {
                $cell.addClass(opt.wrapClass);
            }
            // 单元格类型判断
            if (opt.type == "text") {
                // do nothing
            } else if ($.isFunction(opt.type)) {
                $elem = $(opt.type(row));
            } else if (opt.type == "textbox") {
                $elem = $("<input type='text'>").val(opt.val);
            } else if (opt.type == "radio") {
                $elem = $("<input type='radio'>");
            } else if (opt.type == "checkbox") {
                $elem = $("<input type='checkbox'>");
            }
            // 添加内部样式
            if ($elem && opt.innerClass) {
                $elem.addClass(opt.innerClass);
            }
            // 添加name属性
            if ($elem && opt.name) {
                $elem.attr("name", opt.name);
            }
            // 如果是文本类型，添加title
            if (opt.type == "text") {
                $cell.text(opt.val).attr("title", opt.val);
            } else {
                $cell.append($elem);
            }
            // 设置宽度
            if(opt.width){
                $cell.width(opt.width);
            }
            return $cell;
        },
        /**
         * 刷新
         * @param $this 表格对象
         * @param opts 表格配置
         */
        refresh = function ($this, opts) {
            var item,showNum = 0,temp;
            for (var i = 0, len = opts.cols.length; i < len; i++) {
                item = $.extend({isHide: false}, opts.cols[i]);
                $("[key='" + item.code + "']", $this).toggle(!item.isHide);
                item.isHide || showNum++;
            }
            // 是否显示单选
            $("." + RADIO_W, $this).toggle(opts.showRadio);
            opts.showRadio && showNum++;
            // 是否显示多选
            $("." + CHECK_W, $this).toggle(opts.showCheckBox);
            opts.showCheckBox && showNum++;
            // 是否显示表尾
            $("."+TFOOT,$this).toggle(opts.showPage);
            if(opts.showPage){
                // 合并表尾单元格
                $("."+TFOOT+" td",$this).attr("colspan",showNum);
                //
                temp = (opts.pageNum == 0);
                $("."+FIRST_PAGE,$this).toggleClass(DISABLE,temp);
                $("."+PREV_PAGE,$this).toggleClass(DISABLE,temp);
                // 计算总页数
                opts.totalPage = Math.ceil(opts.total/opts.pageSize);
                temp = (opts.totalPage <= (opts.pageNum+1));
                $("."+NEXT_PAGE,$this).toggleClass(DISABLE,temp);
                $("."+LAST_PAGE,$this).toggleClass(DISABLE,temp);
                $("."+CURRENT_PAGE,$this).html("第<span class='"+HIGHLIGHT+"'>"+(opts.pageNum+1)+"</span>/"+opts.totalPage+"页");
            }
        },
        /**
         * 添加单行数据
         * @param row 行数据对象
         * @param $tbody 表体
         * @param opts 表配置项
         */
        addOneRow = function (row,$tbody,opts) {
                var $tr = $("<tr>"), col, temp;
                // radio
                $tr.append(cell({wrapClass: RADIO_W, innerClass: RADIO, type: "radio", name: opts.radioName},row));
                // check
                $tr.append(cell({wrapClass: CHECK_W, innerClass: CHECK, type: "checkbox"},row));
                for (var i = 0, len = opts.cols.length; i < len; i++) {
                    col = opts.cols[i];
                    temp = $.extend({}, col, {key: col.code, val: row[col.code] || "",width:null});
                    $tr.append(cell(temp, row));
                }
                $tbody.append($tr);
        },
        /**
         * 添加多行数据
         * @param rows 行数对象数组
         * @param $tbody 表体
         * @param opts 表配置项
         * @private
         */
        _addRow = function(rows,$tbody,opts){
            for (var i = 0, len = rows.length; i < len; i++) {
                addOneRow(rows[i],$tbody,opts);
            }
        },
        /**
         * 清除表体
         * @param $this
         * @private
         */
        _clear = function($this){
             $("." + TBODY, $this).empty();
        },
        /**
         * span构造器
         * @param c
         * @param t
         * @returns {XMLList|*}
         */
        span = function(c,t){
            return c ? (t ? $("<span class='"+c+"'>").text(t):$("<span class='"+c+"'>")) : $("<span>");
        },
        /**
         * 查询
         * @param opts
         * @param $this
         * @private
         */
        _query = function(opts,$this){
            // 如果没有设置数据源，则调用数据处理函数
            if(opts.url){
                /*
                约定数据源请求格式为 _pageNum=0&_pageSize=10
                约定响应json格式为 {total:120,rows:[]}
                 */
                var d = $.extend({_pageNum:opts.pageNum,_pageSize:opts.pageSize},opts.condition);
                opts.onBeforeQuery();
                $.ajax({
                    url:opts.url,
                    type:opts.type,
                    dataType:"json",
                    data:d,
                    success:function(r){
                        opts.total = r.total;
                        _clear($this);
                        _addRow(r.rows,$("."+TBODY,$this),opts);
                        refresh($this,opts);
                        opts.onAfterQuery();
                    },
                    error:opts.error
                });
            }else{
                opts.queryHandler(opts.pageNum,opts.pageSize,$this);
            }
        };

    /* 暴露给外部调用的方法表 */
    var methods = {
        /**
         * 初始化
         *    @parem _opts{Object} 配置信息
         */
        init: function (_opts) {

            // 在每个元素上执行方法
            return this.each(function () {
                var $this = $(this);

                /* 处理入参 */

                // 尝试去获取 opts，如果不存在，则返回“undefined”
                var opts = $this.data(CLASS);

                // 如果获取 opts 失败，则根据 _opts 和 default 创建它
                if (typeof(opts) == 'undefined') {

                    opts = $.extend({}, $.fn.cpptable.defaults, _opts);

                    // 根据载体id生产radio name
                    if (!opts.radioName) {
                        opts.radioName = $this.attr("id") + "_R";
                    }

                    $this.empty().addClass(CLASS);

                    var $thead = $("<tr class='" + THEAD + "'>"),
                        $tbody = $("<tbody class='" + TBODY + "'>"),
                        $tfoot = $("<tr class='" + TFOOT + "'>"),
                        $checkAll,
                        temp;

                    // 生成表头
                    // radio 占位
                    $thead.append(cell({isTh: true, wrapClass: RADIO_W},null));
                    // checkall
                    $checkAll = cell({isTh: true, wrapClass: CHECK_W, innerClass: CHECK_ALL, type: "checkbox"},null);
                    $thead.append($checkAll);
                    for (var i = 0, len = opts.cols.length, item; i < len; i++) {
                        item = opts.cols[i];
                        temp = $.extend({}, item, {isTh: true, key: item.code, val: item.name, type: "text"});
                        $thead.append(cell(temp,null));
                    }

                    // 生成表尾
                    var $fpage = span(FIRST_PAGE + " " + PAGE,"首页"),
                        $ppage = span(PREV_PAGE + " " + PAGE,"上一页"),
                        $npage = span(NEXT_PAGE + " " + PAGE,"下一页"),
                        $lpage = span(LAST_PAGE + " " + PAGE,"尾页"),
                        $cpage = span(CURRENT_PAGE + " " + PAGE);

                    $("<td>").append($fpage).append($ppage)
                        .append($cpage).append($npage).append($lpage).appendTo($tfoot);

                    $("<thead>").append($thead).appendTo($this);
                    $tbody.appendTo($this);
                    $("<tfoot>").append($tfoot).appendTo($this);

                } else {
                    // 如果获取了opts，则将它和 _opts 进行合并
                    opts = $.extend({}, opts, _opts);
                }

                // 事件监听
                $("." + CHECK_ALL, $checkAll).on("click", function () {
                    var isCheck = $(this).prop("checked");
                    $("." + CHECK, $tbody).each(function (i, e) {
                        $(e).prop("checked", isCheck);
                    });
                });
                // 监听每个checkbox，判断是否需要全选
                $tbody.delegate("." + CHECK, "click", function () {
                    var isAllCheck = true;
                    $("." + CHECK, $tbody).each(function (i, e) {
                        isAllCheck = isAllCheck && $(e).prop("checked");
                    });
                    $("." + CHECK_ALL, $checkAll).prop("checked", isAllCheck);
                });
                // 监听分页按钮
                $tfoot.delegate("."+PAGE,"click",function(){
                    var $me = $(this),opts = $this.data(CLASS);
                    if($me.is("."+DISABLE)){
                        return;
                    }
                    if($me.is("."+FIRST_PAGE)){
                        opts.pageNum = 0;
                    }else if($me.is("."+PREV_PAGE)){
                        opts.pageNum--;
                    }else if($me.is("."+NEXT_PAGE)){
                        opts.pageNum++;
                    }else if($me.is("."+LAST_PAGE)){
                        opts.pageNum = opts.totalPage - 1;
                    }else{
                        return;
                    }
                    $this.data(CLASS,opts);
                    _query(opts,$this);
                });

                // 刷新
                refresh($this, opts);

                // 每次都保存 opts
                $this.data(CLASS, opts);
            });
        },
        /**
         * 销毁
         */
        destroy: function (opts) {
            // 在每个元素中执行代码
            return $(this).each(function () {
                var $this = $(this);

                //
                $this.empty().removeClass(CLASS);

                // 删除元素对应的数据
                $this.removeData(CLASS);
            });
        },
        /**
         * 获得表格值 to-do
         */
        val: function (options) {
            // 这里的代码通过.eq(0)来获取选择器中的第一个元素的，我们或获取它的HTML内容作为我们的返回值
            var someValue = this.eq(0).html();

            // 返回值
            return someValue;
        },
        /**
         * 清除数据
         * @returns {*}
         */
        clear: function () {
            return $(this).each(function () {
                _clear($(this));
            });
        },
        /**
         * 向表格添加行
         * @param rows{Objec/Array} 待添加的行对象或数组
         */
        addRow: function (rows) {
            return $(this).each(function () {
                var $this = $(this),
                    $tbody = $("." + TBODY, $this),
                    opts = $this.data(CLASS);
                // 获取配置信息
                if (!opts) {
                    $.error("can not read options from element data.");
                }
                // 判断入参是数组还是对象
                if ($.isArray(rows)) {
                    _addRow(rows,$tbody,opts);
                } else if (typeof(rows) == "object") {
                    addOneRow(rows,$tbody,opts);
                } else {
                    $.error("param error on cpptable.addRow.");
                }
                // 刷新
                refresh($this, opts);
            });
        },
        "set" : function(name,val){
            return $(this).each(function(){
                var opts = $(this).data(CLASS);
                if(name in opts){
                    opts[name] = val;
                }
                $(this).data(CLASS,opts);
            });
        },
        "get" : function(name){
            return $(this).each(function(){
                var opts = $(this).data(CLASS);
                if(name in opts){
                    return opts[name];
                }
                return null;
            });
        },
        query : function(){
            return $(this).each(function(){
                var $this = $(this),opts = $this.data(CLASS);;
                _query(opts,$this);
            });
        }
    };

    // jQuery原型扩展
    $.fn.cpptable = function () {
        var method = arguments[0];
        // 判断第一个参数是否方法名
        if (methods[method]) {
            method = methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);
        } else if (typeof(method) == 'object' || !method) {
            // 如果传入参数非方法名，则调用初始化
            method = methods.init;
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.cpptable');
            return this;
        }

        return method.apply(this, arguments);
    };

    // 默认参数,挂在 $.fn.pluginName 下可以实现自定义覆盖
    $.fn.cpptable.defaults = {
        // 列
        cols: [],
        // 是否显示单选
        showRadio: false,
        // 是否显示多选
        showCheckBox: false,
        // 自定义单选name属性
        radioName: null,
        // 是否显示分页
        showPage : false,
        // 每页大小
        pageSize : 10,
        // 页码
        pageNum : 0,
        // 记录总数
        total : 0,
        // 总页数
        totalPage : 0,
        // 数据源
        url : null,
        // 请求方式
        type:"POST",
        // 数据传输格式
        dataType : "json",
        // 自定义数据处理函数
        queryHandler : $.noop,
        // 查询条件
        condition : null,
        // 异步查询错误处理
        error : $.noop,
        // 查询前触发事件
        onBeforeQuery: $.noop,
        // 查询后触发事件
        onAfterQuery: $.noop
    };

})(jQuery);