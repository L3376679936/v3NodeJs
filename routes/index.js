var express = require("express");
var router = express.Router();
const { getToken } = require("../common/jwt");
const { query, transaction } = require("../common/mysql");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.post("/login", function (req, res, next) {
  const { account, password } = req.body;
  // console.log(req.user,'reqqqqqqqqqqqqqqqq');
  let userInfo = req.user;
  console.log(userInfo, "userInfo");
  if (userInfo)
    return res.send({ meta: { msg: "登录成功", status: 200 }, data: userInfo });
  console.log(account, password);
  if (!account || !password) {
    return res.send({
      meta: { msg: "登录信息不能为空，请重试！", status: 400 },
      status: 1,
    });
  }
  let sql = "select * from user_info where account = ? and password = ?";
  query(sql, [account, password], next, (result) => {
    if (result && result.length) {
      // console.log(result,'result')
      let data = result[0];
      delete data.password;
      var token = getToken({ ...data });
      res.send({ meta: { msg: "登录成功", status: 200 }, token, data });
      return;
    }
    res.send({
      meta: { msg: "未找到账号信息，请重试！", status: 400 },
      // data:'liuaobo'
    });
    // next()
  });
});

router.get("/menu", function (req, res, next) {
  
  let sql =
    "SELECT JSON_ARRAYAGG(menu_data) AS menuData FROM (SELECT JSON_OBJECT('id', p.id,'authName', p.authName,'path', p.path,'children', JSON_ARRAYAGG(JSON_OBJECT('id', c.id, 'authName', c.authName,'path', c.path,'children', JSON_ARRAY()))) AS menu_data FROM permissions p LEFT JOIN permission_children c ON p.id = c.parentId GROUP BY p.id, p.authName, p.path ) AS menu_tree;";
  query(sql, [], next, (result) => {
    // console.log(result);
    // Q:为什么这里前端收到的数据带反斜杠呢？
    // A:因为这里返回的是一个字符串，需要转换成对象
    res.send({ meta:{msg: "获取成功", status: 200,}, data: JSON.parse(result[0].menuData) });
  });
});


router.get("/productList", function (req, res, next) {
  let sql = "SELECT JSON_ARRAYAGG(JSON_OBJECT('name', product_name, 'id', product_id)) AS products FROM goods_list;"
  query(sql, [], next, (result) => {
    // console.log(result[0].products, 'result');
    // Q:为什么这里前端收到的数据带反斜杠呢？
    // A:因为这里返回的是一个字符串，需要转换成对象
    res.send({ meta:{msg: "获取成功", status: 200,}, data: JSON.parse(result[0].products) });
  });
});



router.get("/liuaobo", function (req, res, next) {
  let sql = "SELECT JSON_ARRAYAGG(JSON_OBJECT('name', product_name, 'id', product_id)) AS products FROM goods_list;"
  query(sql, [], next, (result) => {
    console.log(result[0].products, 'result');
    // Q:为什么这里前端收到的数据带反斜杠呢？
    // A:因为这里返回的是一个字符串，需要转换成对象
    res.send({ meta:{msg: "获取成功", status: 200,}, data: JSON.parse(result[0].products) });
  });
});

router.post("/getGoodsList", function (req, res, next) {
  console.log(req.body, 'req.query')
  // let sql = "SELECT * FROM goods_list WHERE product_id = ?;";

  
// 使用一个数组来保存要查询的条件
const conditions = [];
const params = [];
if(req.body!=={}){
  for (let key in req.body) {
    if(req.body[key]){
      if (key === 'product_name') {
        conditions.push(`${key} LIKE ?`);
        params.push(`${req.body[key]}%`); // 在参数的开头添加 % 通配符
      } else {
        conditions.push(`${key} = ?`);
        params.push(req.body[key]);
      }
    }

  }
}

// 构建 SQL 查询语句
let sql = `SELECT * FROM goods_list`;
if (conditions.length > 0) {
  sql += ` WHERE ${conditions.join(' AND ')}`;
}


// console.log(sql, 'sql')

  // let sql = "SELECT JSON_ARRAYAGG(JSON_OBJECT('name', product_name, 'id', product_id)) AS products FROM goods_list;"
  query(sql, params, next, (result) => {
    console.log(result, 'result');
    // Q:为什么这里前端收到的数据带反斜杠呢？
    // A:因为这里返回的是一个字符串，需要转换成对象
    res.send({ meta:{msg: "获取成功", status: 200,}, data:result});
  });
});

router.post("/delGoods", function (req, res, next) {
  console.log(req.body, 'req.query')
  // let sql = "SELECT * FROM goods_list WHERE product_id = ?;";
  // let sql = "INSERT INTO goods_list (product_id, product_name, product_price, product_num, product_weight, product_state, product_time) VALUES (?, ?, ?, ?, ?, ?, ?);";
  let param = req.body.product_id;
  let sql = "DELETE FROM goods_list WHERE product_id = ?;";
  query(sql, [param], next, (result) => {
    // console.log(result, 'result');
    // Q:为什么这里前端收到的数据带反斜杠呢？
    // A:因为这里返回的是一个字符串，需要转换成对象
    res.send({ meta:{msg: "删除成功", status: 200,} });
  });

})

module.exports = router;
