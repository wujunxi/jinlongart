    <?php include("iframe/header.php") ?>
    <?php include("iframe/nav.php") ?>
    <div class="main">
        <h1 class="page-title">托运查询</h1>

        <form action="/" method="get">
            <div class="query-wrap">
                <label for="queryCode">托运单号...</label>
                <input type="text" id="queryCode" /><span class="query-icon"></span>
            </div>
        </form>

        <h3 class="item-title">公开性托运历史记录</h3>
        <ul class="public-list">
            <li><a href="/temp/the_taste_of_food.php">《妈妈广东菜的味道》</a><span class="sender">邹洁妈妈</span><span class="send-date">2015.5.2</span></li>
            <li><a href="/temp/a_relationship.php">《一段感情》</a><span class="sender">immortal</span><span class="send-date">2015.4.30</span></li>
            <li><a href="/temp/a_minute.php">《一分钟》</a><span class="sender">一米</span><span class="send-date">2015.4.23</span></li>
        </ul>
    </div>
    <?php include("iframe/footer.php") ?>
