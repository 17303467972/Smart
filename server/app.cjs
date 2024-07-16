

const express = require('express')
const app = express()

const cors = require('cors') //解决跨域问题
app.use(cors())

const bodyParser = require('body-parser')
const multiparty = require('connect-multiparty')
// 处理 x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// 处理 mutipart/form-data
app.use(multiparty())
// 处理 application/json
app.use(bodyParser.json())
// 导入连接数据库的函数
const { conMysql } = require('./mysql.cjs')
// 创建统一的返回报文对象
class Response {
    constructor(isSucceed, msg, code, data) {
        this.isSucceed = isSucceed;
        this.msg = msg;
        this.code = code;
        this.data = data;
    }
}

// 一个简单的测试接口
app.get('/test', (req, res) => {
    res.send('测试用的接口')
})

//一个简单的接口，查询数据库中的信息
app.get('/getUser', (req, res) => {
    let sql = 'select * from user'
    conMysql(sql).then(result => {
        res.send(result)
    }).catch(error => {
        console.error('查询数据库失败:', error)
        res.status(500).send(new Response(false, '查询数据库失败', 500, null))
    })
})
app.get('/getUserInfo', (req, res) => {
	let sql = `select * from user where username = '${req.query.username}'`
	conMysql(sql).then(result => {
		let response = new Response(true, '获取成功', 200, result)
		res.send(response)
	}).catch(err => {
		res.status(500).send('数据库连接出错!')
	})
})
app.get('/rights', (req, res) => {
    let sql = 'select * from rights'
    conMysql(sql).then(result => {
        res.send(result)
    }).catch(error => {
        console.error('查询数据库失败:', error)
        res.status(500).send(new Response(false, '查询数据库失败', 500, null))
    })
})
app.get('/getRightsInfo', (req, res) => {
	let sql = `select * from rightss where title = '${req.query.title}'`
	conMysql(sql).then(result => {
		let response = new Response(true, '获取成功', 200, result)
		res.send(response)
	}).catch(err => {
		res.status(500).send('数据库连接出错!')
	})
})
// 监听node服务器的端口号
app.listen(3000, () => {
    console.log('恭喜你，服务器启动成功')
})

