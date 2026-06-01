const express = require("express")
const router = express.Router()
const db = require("../db")

router.post("/login", (req, res) => {
  const { username, password } = req.body

  const sql =
    "SELECT * FROM users WHERE username=? AND password=?"

  db.query(
    sql,
    [username, password],
    (err, result) => {

      if (err) {
        return res.json({
          code: 500,
          msg: "服务器错误"
        })
      }

      if (result.length > 0) {
        return res.json({
          code: 200,
          msg: "登录成功"
        })
      }

      res.json({
        code: 400,
        msg: "账号或密码错误"
      })
    }
  )
})

module.exports = router