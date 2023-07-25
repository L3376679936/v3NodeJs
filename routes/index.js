var express = require('express');
var router = express.Router();
const { getToken } = require("../common/jwt");
const { query, transaction } = require("../common/mysql");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/login', function(req, res, next) {
  const { account, password } = req.body;
  // console.log(req.user,'reqqqqqqqqqqqqqqqq');
  let userInfo = req.user;
  console.log(userInfo,'userInfo')
  if (userInfo) return res.send({ meta:{msg: "登录成功", status: 200,}, data: userInfo });
  console.log(account, password)
  if (!account || !password) {
    return res.send({meta:{msg: "登录信息不能为空，请重试！", status: 400,}, status: 1 });
  }
  let sql = "select * from user_info where account = ? and password = ?";
  query(sql, [account, password], next, (result) => {
    if (result && result.length) {
      // console.log(result,'result')
      let data = result[0];
      delete data.password;
      var token = getToken({ ...data });
      res.send({ meta:{msg: "登录成功", status: 200,}, token, data });
      return;
    }
    res.send(
      {
        meta:{msg: "未找到账号信息，请重试！",status: 400},
        // data:'liuaobo'
      }
  );
  // next()
})
});


router.get('/liuaobo', function(req, res, next) {
  res.send({
    meta:{msg: "添加成功",status: 200},
    data:'liuaobo'
  });
  // next()
});

module.exports = router;
