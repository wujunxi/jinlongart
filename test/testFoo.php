<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2015/5/5
 * Time: 14:56
 */
require('Foo.php');
$foo = new Foo();
$foo->attr = "jajajla\n";
$foo->say();

$ar = array('a'=>1,'b'=>2,3=>'c',4=>'d');
foreach($ar as $key=>$val){
    echo '{'.$key.':'.$val."}\n";
}