const axios = require('axios')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db/db.json')
const db = low(adapter)
module.exports = {
  checkFBUser (token) {
    return axios({
      method: 'GET',
      url: `https://graph.facebook.com/v5.0/me?fields=id,name,email&access_token=${token}`
    }).then(result => result.data.error ? null : result.data)
      .catch(() => null)
  },
  checkDBUser ({ id, name, email }) {
    let user = db.get('users.list').find({ email, facebook: { id } })
    if (!user || !user.value()) {
      const uid = db.get('users.autoIndex').value() + ''
      db.update('users.autoIndex', n => n + 1).write()
      user = db.get('users.list').push({
        id: uid,
        name,
        email,
        facebook: {
          id
        }
      }).write()
    } else {
      user.assign({
        facebook: {
          id
        }
      }).write()
    }
    return db.get('users.list').find({ email, facebook: { id } }).value()
  },
  async checkUser (req) {
    const cookies = req.cookies
    const token = cookies['auth._token.facebook'].substr(7)
    const result = await this.checkFBUser(token)
    if (result) {
      const user = await this.checkDBUser(result)
      if (user) {
        return {
          id: user.id,
          name: user.name,
          picture: `http://graph.facebook.com/${user.facebook.id}/picture?type=small`
        }
      }
    }
    return null
  },
  getPosts () {
    return {
      data: {
        posts: db.get('posts.list').value()
      }
    }
  },
  addPost (user, content) {
    const id = db.get('posts.autoIndex').value() + ''
    db.update('posts.autoIndex', n => n + 1).write()
    db.get('posts.list').push({
      id,
      content,
      time: new Date().getTime(),
      user
    }).write()
    return {
      data: {
        posts: [db.get('posts.list').find({ id }).value()]
      }
    }
  },
  deletePost (id, uid) {
    return {
      data: {
        posts: db.get('posts.list').remove({ id, user: { id: uid } }).write()
      }
    }
  },
  updatePost (id, uid, content) {
    return {
      data: {
        posts: [db.get('posts.list').find({ id, user: { id: uid } })
          .assign({ content, time: new Date().getTime() }).write()]
      }
    }
  }

}
