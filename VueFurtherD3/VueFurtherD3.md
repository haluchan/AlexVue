
facebook oauth
https://developers.facebook.com/

package-lock.json => 當初使用的版本
動到package.json => lock就失效

“lint”: “eslint --ext .html,.js,.vue . --fix”

lint-staged
yorkie

@nuxtjs/auth
https://auth.nuxtjs.org/
延伸練習:

1. 改用google或git登入
2. 綜合登入

oauth(開放授權)
endpoint

1. code
2. token
3. info
   ![endpoint](https://tva1.sinaimg.cn/large/006tNbRwgy1gadj2enuj3j31670n9gw1.jpg)

```javascript
auth: {
  strategies: {
    facebook: {
      client_id: '...',
      authorization_endpoint: 'https://facebook.com/v5.0/dialog/oauth',
      userinfo_endpoint: '/auth/user', // 寫DB
      scope: ['public_profile', 'email']
    },
  }
}
```

https://developers.facebook.com/tools/explorer/?method=GET

```javascript
this.$auth.loginWith('facebook') // 對到strategies的name

```

openId

後端
資料庫
lowdb
關聯式資料庫 VS NO SQL
SQL:時間換空間/資料獨立
NOSQL:空間換時間/資料同步
NO SQL => NOT ONLY SQL

xxxParser : 解物件
bodyParser/cookieParser : 將body/cookie解成物件
consola => Nuxt選的
api : 公開的
auth: 私密的

Parser要先起來(use)

```javascript
// Step1 解析傳遞資料/先全部過bodyParser 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// Step2 解析cookie/全部過cookieParser 
app.use(cookieParser())
// Step3 如果符合/api，找對應功能 (回應即結束)
// 網址/api進這裡，若結束就不往下
app.use('/api', api)
// Step4 如果符合/auth，找對應功能 (回應即結束)
// 網址/auth進這裡，若結束就不往下
app.use('/auth', auth)
// Step5 其他，找對應功能 (回應即結束)
app.use(nuxt.render)
```

ORM:物件關係對應
http://0rz.tw/bpQKs

auth/index.js

```javascript
// /auth 才會進來
const auth = require('./auth')
app.use('/auth', auth)
// /auth/user 且是 get 才會進來
router.get('/user', user) 

```

```javascript
// 無差別攔截剩下的頁面 /auth/...
router.use(function (req, res) {
  res.json({
    error: {
      code: 404,
      message: 'Not Found'
    }
  })
})
```

server層:主要進行簡單檢查(有時丟到後面檢查)，轉導
![img](https://tva1.sinaimg.cn/large/006tNbRwgy1gadj28p8vkj318b0kxk2f.jpg)

https://auth.nuxtjs.org/schemes/oauth2.html#options

```javascript
// token 預設 Bearer{token} => substr(7)
const token = cookies[`auth._token.${auth.strategy}`].substr(7)
```

https://github.com/typicode/lowdb

nuxt.config.js

```javascript
env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
},
```

directives:
inserted(mounted)

props=>

1. Object => 需validator
2. Array => 很難控管
3. Function => X

lowdb
remove回傳陣列
assign回傳單筆

練習:

1. 將POST 跟 POSTINPUT整合成POSTLIST
2. 將POST METHODS 改 COMPUTED