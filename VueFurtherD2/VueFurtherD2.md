# Vue.js 更進一步 Day2 - 2019/11/30 週六

## 組件

1. Vue Simple Uploader
   // => 依造網址的protocal走，自動轉導http或https
   ex: ‘[//localhost:3000/upload](https://localhost:3000/upload)’
2. Vue Owl Carousel
   貓頭鷹輪播 => 將jquery plugin包成 vue
   slot設計參考
3. Vuetify
   bootstrap-vue/element

storybook
https://storybook.js.org/

scoped不建議搭配tag選取器:較耗效能

1. Vuetify-loader
   有特定命名規則可以使用
   特定命名規則:
   (1) component放在特定位置
   ex: base/BaseXXX
   (2) component有特定名稱系列
   ex:v-XXX/el-XXX/BaseXXX …
   Step:
2. 移除import
3. 設定vue.config.js
   第一種匯入

```javascript
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
...
plugins:[
    new VuetifyLoaderPlugin({
    match (originalTag, { kebabTag, camelTag, path, component }) {
      ...
    })
]
```

kebabTag: 用-連起來
camelTag: 首字大寫串接

與上次prerender組合成下面

```javascript
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
const path = require('path')

module.exports = {
  configureWebpack: () => {
    let config = {
      plugins: [
        new VuetifyLoaderPlugin({
          match (originalTag, { kebabTag, camelTag, path, component }) {
            if (kebabTag.startsWith('base-') || camelTag.startsWith('Base')) {
              return [camelTag, `import ${camelTag} from '@/components/Base/${camelTag}'`]
            }
          }
        })
      ]
    }
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, 'dist'),
        routes: ['/index.html', '/about.html'],
        renderer: new Renderer({
          // injectProperty: '__PRERENDER_INJECTED',
          // inject: {
          //   test: true
          // },
          // headless: false,
          renderAfterDocumentEvent: 'render-event'
        }),
        postProcess (renderedRoute) {
          renderedRoute.html = renderedRoute.html
            .replace(new RegExp('="/js/', 'g'), '="./js/')
            .replace(new RegExp('="/css/', 'g'), '="./css/')
            .replace(new RegExp('/img/', 'g'), './img/')
            .replace(new RegExp('/favicon.ico', 'g'), './favicon.ico')
          if (renderedRoute.route.endsWith('.html')) {
            renderedRoute.outputPath = path.join(
              __dirname,
              'dist',
              renderedRoute.route
            )
          }

          return renderedRoute
        }
      }))
    }
    return config
  }
}
```

另一種寫法

```javascript
chainWebpack: config => {
    config.plugin('VuetifyLoaderPlugin').tap(args => [{
      match (originalTag, { kebabTag, camelTag, path, component }) {...}
    }])
  }
```

1. 重啟server

問題:根據不同需求傳不同類型到組件中
components

```javascript
props:{
    text:{
      type: [String,Number],
      required:true
    }
}
```

問題:如果想傳null
將required改成default

## Nuxt

建議用在SSR
初始化:
npm init nuxt-app {{PROJECT-NAME}}
注意:

1. ESLint選滿會起不起來，建議不選
2. jsconfig.json

nuxt.config.js
srcDir:'client’
assets/component/layouts/middleware/pages/plugins/static/store
移到client

(1) 檔案結構化路由:
開檔案，路由就完成了
pages => SSR部分在此完成
子層目錄簽入 <nuxt-child/>
錯誤顯示頁面 _.vue

layout選擇

```javascript
layout:''
```

router-link vs nuxt-link

1. 讀取效率
   router-link 點下去連結讀取js
   nuxt-link 一開始就在最後偷偷讀取js(採用prefetch概念)

### vuetify-loader 一定要配 vuetify

### 設定檔沒吃到，重起vscode

jsconfig.json => vscode使用的設定檔

1. link可以合併使用:
   主選單用nuxt-link，次要選單用router-link

(2) router檔案

1. npm i @nuxtjs/router
2. buildModules: ["@nuxtjs/router"]
3. 開router.js或router資料夾
4. 資料夾需要做的設定(預設吃router.js)

```javascript
routerModules:{
    fileName:'router'
}
```

1. export改

```javascript
export default createRouter(){
  
}
```

meta-info => head

## store

strict => Nuxt會幫忙做
state 要 export function
其他可以用 object
SSR初始化(index.js):nuxtServerInit

```javascript
export const actions = {
    nuxtServerInit(payload){
        ...
    }
}
```

namespace => 檔名(靜態註冊)

動態註冊
(1) 放資料夾裡就不會被靜態註冊
(2) 補上export default

```javascript
export default {
  namespace: true,
  state,
  mutations,
  actions
};
```

Component:
第一個生命週期:
beforeCreate:可以用別人的東西，不能用自己的東西
(官網推薦最好註冊module的位置/沒有SSR效果)
第一個可用生命週期:
Created:可以用自己+別人的東西

別人的:props,routes,store,router

處理Server(純粹Server端階段)
asyncData(context) : 對應Data,可以retunr object
fetch(context) : 對應store

context裡有app/router/store

asyncData:
最主要再做塞Data這件事，這邊註冊模組只會再Server端註冊，Client註冊不到
fetch:
一樣註冊完，Client需要再註冊

前面兩個在Server端註冊，此時如果再beforeCreate註冊，會有Server重複註冊問題
解法:將Clietn註冊移往mounted => 太晚會無法處理資料
再解法:回到beforeCreate做Client註解，並解決Server端衝突問題
在pluging做出註冊及移除功能，皆需檢查是否有存在註冊