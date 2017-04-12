<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2015/5/5
 * Time: 14:14
 */

class DBHelper{
    // dev
    private static $db_host = 'localhost';
    private static $db_user = 'jinlongart';
    private static $db_pwd = 'jinlongart';
    private static $db_name = 'jinlongart';

    // pro www.wujunxi.com
//    private static $db_host = 'qdm109341138.my3w.com';
//    private static $db_user = 'qdm109341138';
//    private static $db_pwd = 'Wujunxi19900225';
//    private static $db_name = 'qdm109341138_db';

    public static function getConn(){
        $conn = @ new mysqli(self::$db_host,self::$db_user,self::$db_pwd,self::$db_name);
        if(mysqli_connect_errno()){
            throw new Exception('Database connect error --'.mysqli_connect_errno());
        }
        $conn->set_charset("utf8");
        return $conn;
    }
}


