/*
Navicat MySQL Data Transfer

Source Server         : wujunxi
Source Server Version : 50148
Source Host           : qdm109341138.my3w.com:3306
Source Database       : qdm109341138_db

Target Server Type    : MYSQL
Target Server Version : 50148
File Encoding         : 65001

Date: 2015-05-04 17:15:06
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `test_hero`
-- ----------------------------
DROP TABLE IF EXISTS `test_hero`;
CREATE TABLE `test_hero` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(20) DEFAULT NULL,
  `occupation` char(50) DEFAULT NULL,
  `faction` char(20) DEFAULT NULL,
  `skill` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of test_hero
-- ----------------------------
INSERT INTO `test_hero` VALUES ('1', '萧峰', '丐帮帮主', '丐帮', '擒龙功，龙爪手，降龙十八掌，太祖长拳');
INSERT INTO `test_hero` VALUES ('2', '虚竹', '灵鹫宫宫主', '逍遥派', '天山折梅手,小无相功,天山六阳掌,生死符');
INSERT INTO `test_hero` VALUES ('3', '段誉', '大理王子', '大理段氏', '凌波微步,北冥神功，六脉神剑');
INSERT INTO `test_hero` VALUES ('4', '段正淳', '大理王爷', '大理段氏', '一阳指');
INSERT INTO `test_hero` VALUES ('5', '无崖子', '逍遥派创始人', '逍遥派', '北冥神功，八荒六合唯我独尊功，天山六阳掌，天山折梅手，龟息功');
INSERT INTO `test_hero` VALUES ('6', '慕容复', '大燕国后裔', '慕容氏', '以彼之道还治彼身');
INSERT INTO `test_hero` VALUES ('7', '鸠摩智', '吐鲁番国师', '？？？', '杂……');
INSERT INTO `test_hero` VALUES ('8', '游坦之', '聚贤庄少庄主', '聚贤庄', '易筋经');
INSERT INTO `test_hero` VALUES ('9', '李秋水', '逍遥派三老之一', '逍遥派', '小无相功，北冥神功，寒袖拂穴，白虹掌力，传音搜魂');
INSERT INTO `test_hero` VALUES ('10', '天山童姥', '逍遥派三老之一', '逍遥派', '八荒六合唯我独尊功，生死符，天山折梅手');
INSERT INTO `test_hero` VALUES ('11', '扫地僧', '扫地僧', '少林寺', '？？？');
INSERT INTO `test_hero` VALUES ('12', '阿朱', '段正淳与情妇阮星竹之女', '', '善易容');
INSERT INTO `test_hero` VALUES ('13', '阿紫', '阿朱的妹妹', '', '');
INSERT INTO `test_hero` VALUES ('14', '王语嫣', '段正淳与情妇王夫人之女', '', '');
INSERT INTO `test_hero` VALUES ('14', '木婉清', '段正淳与情妇秦红棉之女', '', '');
