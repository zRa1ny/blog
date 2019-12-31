const jwt = require('jsonwebtoken')
const secret = "qsaxtdsd12w";
const timelong = 60 * 60 * 24 * 30; //s
// 签发token
exports.signToken = (query) => {
    return new Promise((resolve, reject) => {
        let token = jwt.sign(query, secret, {
            expiresIn: timelong //秒到期时间
        });
        resolve([token, timelong]);
    })

}
// 验证token
exports.verifyToken = (req, res, next) => {
    // console.log('验证token')
    let token = req.cookies.token;
    jwt.verify(token, secret, (error, decoded) => {
        if (error) {
            res.json({
                state: 0,
                data: '无效token！'
            })
            return
        }
        req.decoded = decoded;
    })
    next();
}

