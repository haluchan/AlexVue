const express = require('express')
const router = express.Router()
const dao = require('../dao')

const user = async function (req, res) {
  const result = await dao.checkUser(req)
  res.json(result)
}

router.get('/user', user)

module.exports = router
