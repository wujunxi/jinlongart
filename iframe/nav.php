<link href="/css/nav.css" type="text/css" rel="stylesheet" />
<div class="index_nav" >
    <img src="/images/logo_s2.jpg" class="index_logo" alt="FWZ" />
    <ul id="nav">
        <li><a href="/">主页</a></li>
        <li><a href="/order.php">非物托运</a></li>
        <li><a href="/query.php">托运查询</a></li>
        <li><a href="/about.php">关于</a></li>
    </ul>
</div>
<script>
    (function(){
        var li = document.getElementById("nav").childNodes,
            currentPage = window.location.href.match(/\/\w+.php/);
//        console.log(currentPage);
        currentPage = currentPage == null ? "/" : currentPage[0];
        for(var i = 0; i < li.length; i++){
            if(li[i].nodeType == 1){
//                console.log(li[i].firstChild.attributes["href"].value);
                if(currentPage == li[i].firstChild.attributes["href"].value){
                    li[i].className = "active";
                }else{
                    li[i].className = "";
                }

            }
        }
    })();
</script>