const MongoClient = require('mongodb').MongoClient;
const setting = require("./setting");


function _connectDB () {
    let url = setting.dbUrl + setting.dbname;
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
            if (err) {
                console.log('链接数据库出错！')
                reject([err, db]);
                throw err;
            }
            console.log('链接数据库成功！')
            resolve([err, db]);
        })
    });

}
(function init () {
    let { user, pass, intro = '暂无', nickname = '暂无昵称', avatar, dbname } = setting;
    let json = { "user": user, "pass": pass, "avatar": avatar, "intro": intro, "nickname": nickname }
    _connectDB().then(([err, db]) => {
        db.db(dbname).collection('users').find({ "user": user }).toArray(function (err, result) {
            if (err) {
                console.log('查询管理员失败');
                db.close;
                return;
            }
            if (result.length !== 0) {
                console.log('无需初始化！');
                db.close();
                return;
            }
            usersCollection.insertOne(json, function (err, res) {
                if (err) {
                    console.log('管理员信息初始化失败')
                    db.close();
                    return;
                }
                console.log('管理员信息初始化成功')
                db.close();
            })

        })
    })
})()

/* 
{
    state:1,//状态  1 标识成功
    data:{}// 数据
}


*/


exports.insertOne = (collectionName, json, callback) => {
    return _connectDB().then(([err, db]) => {
        return new Promise((resolve, reject) => {
            db.db(setting.dbname).collection(collectionName).insertOne(json, (err, result) => {
                if (err) {
                    reject({
                        state: 0,
                        data: err
                    })
                    db.close();
                    return;
                };
                resolve({
                    state: 1,
                    data: {
                        id: result.insertedId
                    }
                })
                db.close();
            })
        })
    })
}

exports.find = (collectionName, queryJson) => {
    return _connectDB().then(([err, db]) => {
        let json = queryJson.query || {},
            limit = Number(queryJson.limit) || 0,
            count = Number(queryJson.page) - 1,
            sort = queryJson.sort || {};
        // 页数为0或者1都显示前limit条数据
        if (count <= 0) {
            count = 0
        } else {
            count = count * limit;
        }
        return new Promise((resolve, reject) => {
            db.db(setting.dbname).collection(collectionName).find(json).limit(limit).skip(count).sort(sort).toArray((err, result) => {
                if (err) {
                    reject({
                        state: 0,
                        data: err
                    })
                    db.close();
                    return;
                };
                resolve({
                    state: 1,
                    data: result
                })
                db.close();
            })
        })

    })
}

exports.updataMany = (collectionName, whereJson, updataJson, callback) => {
    return _connectDB().then(([err, db]) => {
        let json = queryJson.query || {},
            limit = Number(queryJson.limit) || 0,
            count = Number(queryJson.page) - 1,
            sort = queryJson.sort || {};
        // 页数为0或者1都显示前limit条数据
        if (count <= 0) {
            count = 0
        } else {
            count = count * limit;
        }
        return new Promise((resolve, reject) => {
            db.db(setting.dbname).collection(collectionName).find(json).limit(limit).skip(count).sort(sort).toArray((err, result) => {
                if (err) {
                    reject({
                        state: 0,
                        data: err
                    })
                    db.close();
                    return;
                };
                resolve({
                    state: 1,
                    data: result
                })
                db.close();
            })
        })
    })
}

exports.deleteMany = (collectionName, json, callback) => {
    return _connectDB().then((err, db) => {
        return new Promise((resolve, reject) => {
            db.db(setting.dbname).collection(collectionName).deleteMany(json, function (err, results) {
                if (err) {
                    reject({
                        state: 0,
                        data: err
                    })
                    db.close();
                    return;
                };
                resolve({
                    state: 1,
                    data: result
                })
                db.close();
            });
        })
    })
}

