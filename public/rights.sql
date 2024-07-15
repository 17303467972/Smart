CREATE TABLE rights (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(20) NOT NULL,
    path VARCHAR(100) NOT NULL,
    icon VARCHAR(100) NOT NULL,
    parent_id INT DEFAULT '0',
    is_leaf TINYINT DEFAULT '0'
);
INSERT INTO rights (title,path,icon) values ('首页','/index','PageFilled');
INSERT INTO rights (title,path,icon) values ('用户管理','/user-manage','User');
INSERT INTO rights (title,path,icon,parent_id,is_leaf) values ('用户列表','/user-manage/list','List',2,1);
INSERT INTO rights (title,path,icon) values ('权限管理','/right-manage','Key');
INSERT INTO rights (title,path,icon,parent_id,is_leaf) values ('权限列表','/right-manage/rightlist','List',4,1);
INSERT INTO rights (title,path,icon) values ('设备管理','/device-manage','Device');
INSERT INTO rights (title,path,icon,parent_id,is_leaf) values ('设备列表','/device-manage/devicelist','List',6,1);
INSERT INTO rights (title,path,icon,parent_id,is_leaf) values ('智能管理','/device-manage/smartdevice','List',6,1);