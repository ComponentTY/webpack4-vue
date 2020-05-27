const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()

const reslove = (filename) => {
  return path.resolve(__dirname, filename)
}

app.use(express.static(reslove('webpack/public')))

app.get('*', (req, res) => {
  let html = fs.readFileSync(reslove('./webpack/public/' + 'index.html'), 'utf-8')
  res.send(html)
})

app.listen(3005, () => {
  console.log('运行端口 3005')
})
