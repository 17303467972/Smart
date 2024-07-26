const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors') //解决跨域问题

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const multiparty = require('connect-multiparty')
// 处理 x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// 处理 mutipart/form-data
app.use(multiparty())
// 处理 application/json
app.use(bodyParser.json())
// 导入连接数据库的函数
const { conMysql } = require('./mysql.cjs')


// 一个简单的测试接口
app.get('/test', (req, res) => {
    res.send('测试用的接口')
})

//一个简单的接口，查询数据库中的信息
app.get('/api/getUser', (req, res) => {
    let sql = 'select * from user'
    conMysql(sql).then(result => {
        res.send(result)
    }).catch(error => {
        console.error('查询数据库失败:', error)
        res.status(500).send(new Response(false, '查询数据库失败', 500, null))
    })
})
app.get('/getUserInfo', (req, res) => {
	let sql = `select * from user where id = '${req.query.id}'`
	conMysql(sql).then(result => {
		let response = new Response(true, '获取成功', 200, result)
		res.send(response)
	}).catch(err => {
		res.status(500).send('数据库连接出错!')
	})
})
//更新信息users
  
// 定义更新用户信息的路由
app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;
  
    // 确保 id 是数字
    if (isNaN(id)) {
      return res.status(400).send('Invalid ID');
    }
    const sql = 'UPDATE user SET username = ?, password = ? WHERE id = ?';
    conMysql.query(sql, [username, password, id], (err, result) => {
      if (err) {
        console.error('Failed to update user:', err);
        return res.status(500).send(err);
      }
      res.status(200).send(result);
    });
  });
// app.get('/rights', (req, res) => {
//     let sql = 'select * from rights'
//     conMysql(sql).then(result => {
//         res.send(result)
//     }).catch(error => {
//         console.error('查询数据库失败:', error)
//         res.status(500).send(new Response(false, '查询数据库失败', 500, null))
//     })
// })

// app.get('/getRightsInfo', (req, res) => {
// 	let sql = `select * from rights where title = '${req.query.title}'`
// 	conMysql(sql).then(result => {
// 		let response = new Response(true, '获取成功', 200, result)
// 		res.send(response)
// 	}).catch(err => {
// 		res.status(500).send('数据库连接出错!')
// 	})
// })
// 监听node服务器的端口号
app.listen(3000, () => {
    console.log('恭喜你，服务器启动成功')
})

