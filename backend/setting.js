/**
 * 初始化admin用户配置
 */
let md5 = require('./md5.js');
let user = 'admin';
let pass = md5('admin');
let intro = 'Youth should repel mediocrity';
let nickname = 'admin';
let avatar = 'avatar.jpg';

module.exports = {
    dbUrl: 'mongodb://106.14.17.48:27017/',
    dbname: 'blog',
    user: user,
    pass: pass,
    intro: intro,
    nickname: nickname,
    avatar: avatar
}

