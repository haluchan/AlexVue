const express = require('express')
const router = express.Router()
const dao = require('../dao')

router.get('/posts', async function (req, res) {
  res.json(await dao.getPosts())
})

const checkAuth = async (req, res, next) => {
  const user = await dao.checkUser(req)
  if (!user) {
    res.json({
      error: {
        code: '401',
        message: 'Unauthorized'
      }
    })
  }
  req.user = user
  next()
}

router.post('/posts', checkAuth, async function (req, res) {
  res.json(await dao.addPost(req.user, req.body.text))
})

router.delete('/posts/:id', checkAuth, async function (req, res) {
  res.json(await dao.deletePost(req.params.id, req.user.id))
})

router.patch('/posts/:id', checkAuth, async function (req, res) {
  res.json(await dao.updatePost(req.params.id, req.user.id, req.body.text))
})

module.exports = router
