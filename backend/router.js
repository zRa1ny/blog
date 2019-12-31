const express = require('express')
const jwt = require('jsonwebtoken')
const md5 = require('./md5')
const { insertOne, find, updateMany, deleteMany } = require('./db.js');
const { signToken, verifyToken } = require('./utils')
const router = express.Router();
function _getReqQuery (req) {
    return req.method === 'GET' ? req.query : req.body;
}
router.all('/admin/*', verifyToken) //admin 下面的添加token验证中间件

router.all('/register', (req, res, next) => {
    console.log(req)
    let { userName, passWord, nickname, avatar } = _getReqQuery(req);
    if (userName && userName !== '' && passWord && passWord !== '') {
        find('users', { query: { user: userName }, limit: 0, count: 0 }).then((result) => {
            console.log(result.data)
            if (result.state === 0) {
                console.log(result.data);
                res.json({
                    state: -1,
                    data: "数据库查询错误!"
                })
                return;
            }
            if (result.data.length <= 0) {
                //当前不存在改用户 新增
                insertOne('users', { user: userName, pass: md5(passWord), nickname: nickname || userName, avatar: avatar || 'avatar.jpg' }, function (result) {
                    console.log('1');
                    res.json(result);
                });
                console.log('2')
                return;

            }
            res.json({
                state: 0,
                data: "新增失败，该用户已经存在！"
            });

        }).catch(err => { console.log(err) })
    } else {
        res.json({
            state: 0,
            data: "请输入账号密码！"
        })
    }



})
router.all('/login', (req, res, next) => {
    let { userName, passWord } = _getReqQuery(req);
    if (userName && userName !== '' && passWord && passWord !== '') {
        find('users', { query: { user: userName }, limit: 1 }).then((result) => {
            if (result.data.length = 1) {
                let { user, pass } = result.data[0];
                if (pass === md5(passWord)) {
                    signToken({
                        userName
                    }).then(([token, timelong]) => {

                        res.cookie('token', token, { maxAge: timelong * 1000 })
                        res.cookie('userName', userName, { maxAge: timelong * 1000 })
                        res.json({
                            state: 1,
                            data: '登录成功！'
                        })
                    })

                }
            } else {

                res.json({
                    state: 0,
                    data: '登录失败，账号或密码错误！'
                })
            }


        }).catch(err => { console.log(err) })
    } else {
        res.json({
            state: 0,
            data: '账号密码不能为空！'
        })
    }
})
router.all('/exit', (req, res, next) => {

    res.cookie('token', "", { maxAge: 0 })
    res.cookie('userName', "", { maxAge: 0 })
    res.json({
        state: 1,
        data: '退出成功！'
    })

})

module.exports = router;
