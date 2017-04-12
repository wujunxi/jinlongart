create table orders(
  order_id int unsigned auto_increment primary key,
  code char(12),
  sender char(20) not null,
  senderPhone char(20) not null,
  senderAddress char(100),
  receiver char(20),
  receivePhone char(20),
  receiveAddress char(100),
  sendContent char(100) not null,
  sendStory varchar(1000) not null,
  sendDate date,
  isPublic char(2) default '0',
  title char(50),
  subTitle char(150),
  content varchar(1000),
  createTime datetime,
  modifyTime datetime
)ENGINE=MyISAM DEFAULT CHARSET=utf8;