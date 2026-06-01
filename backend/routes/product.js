const express = require('express')
const router = express.Router()
const db = require('../db')

// 📌 查询商品
router.get('/list', (req, res) => {
  const sql = 'SELECT * FROM products'
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ success: false })
    }
    res.json(result)
  })
})

// 📌 添加商品
router.post('/add', (req, res) => {
  const { name, price } = req.body

  const sql = 'INSERT INTO products (name, price) VALUES (?, ?)'
  db.query(sql, [name, price], (err, result) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ success: false })
    }
    res.json({ success: true })
  })
})

// 📌 删除商品
router.post('/delete', (req, res) => {
  const { id } = req.body

  const sql = 'DELETE FROM products WHERE id=?'
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false })
    }
    res.json({ success: true })
  })
})

// 📌 修改商品
router.post('/update', (req, res) => {
  const { id, name, price } = req.body

  const sql = 'UPDATE products SET name=?, price=? WHERE id=?'
  db.query(sql, [name, price, id], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false })
    }
    res.json({ success: true })
  })
})

module.exports = router