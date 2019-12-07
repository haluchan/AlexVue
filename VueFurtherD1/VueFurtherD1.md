# Vue.js 更進一步 Day1 - 2019/11/23 週六

## 專案起手式

Linter

1. ESLint
2. StyleLint

npm list -g -depth=0
npm uninstall -g vue-cli
npm install -g @vue/cli

settings.json

```javascript
{
  // 可以刪除
  "prettier.semi": false,
  "prettier.singleQuote": true,
  // 將預設關閉(會跟eslint衝)
  "vetur.validation.template": false,
  "vetur.validation.script": false,
  "vetur.validation.style": false,
  "editor.formatOnSave": false,
  "javascript.validate.enable": false,
  
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  
  //存檔的fix要搭配下面options/validate
  "eslint.autoFixOnSave": true,
  "eslint.alwaysShowStatus": true,
  "eslint.options": {
    "extensions":[".html",".js",".vue"]
  },
  "eslint.validate": [
    {"language": "html","autoFix": true},
    {"language": "javascript","autoFix": true},
    {"language": "vue","autoFix": true}
  ]
}
```

prettier.config.js

```javascript
export default{
    semi:false,
    singleQuote:true
}
```

style guide

手動run lint
npm run lint
package.json

```javascript
"scripts": {
    "lint": "npm run lint:script && npm run lint:style",
    "lint:script": "vue-cli-service lint",
    "lint:style": "stylelint"
},
"lint-staged": {
    "*.{js,vue}": [
      "npm run lint",
      "git add"
    ]
}
```

vue檔裡面寫網頁，存檔無法一次到位，要多存幾次
模板檔
.vuerc

```javascript
{
  "useConfigFiles": true,
  "plugins": {
    "@vue/cli-plugin-babel": {},
    "@vue/cli-plugin-router": {
      "historyMode": false
    },
    "@vue/cli-plugin-vuex": {},
    "@vue/cli-plugin-eslint": {
      "config": "standard",
      "lintOn": [
        "save",
        "commit"
      ]
    }
  },
  "cssPreprocessor": "node-sass"
}
```

render 在template

1. 檔名.開頭的要改成_ (ex:.vscode => _vscode)
2. 檔名_開頭的要改成__

extensions.json放vscode外掛

Prerender +SSR
Prerender:先載好，上線後直接load下來
SSR:直線處理
Q1:流量很大的新聞網站?(變動性?
Q2:流量很大的拍賣網站
如果不用SEO => SPA
再來考量內容的變動性 =>
量很大/變動性不大 => Prerender

## Prerender

1. 安裝套件
   npm i prerender-spa-plugin
   package.json

```javascript
"dependencies": {
    "prerender-spa-plugin": "^3.4.0"
}
```

1. 會依造router分出很多隻檔案
   (1) webpack設定
   vue.config.js

```javascript
routes: ['/index.html', '/about.html']
```

對應router裡面path要改成網頁

1. builder會做一個chrome模擬瀏覽器，等待你告訴他event，他才會開始render

```javascript
renderAfterDocumentEvent: "render-event"
```

**如果同步，可以再mounted去打emit**

```javascript
mounted: () => {
    document.dispatchEvent(new Event('render-event'))
}
```

**如果有非同步，需要再api回來後才能去打emit**

```javascript
mounted: async () => {
    await store.dispatch('XXX')
    document.dispatchEvent(new Event('render-event'))
}
```

1. headkess 可以叫出模擬瀏覽器

```javascript
headless: false,
```

1. 換路徑
   預設根目錄，不換路徑可能會找不到，換成相對路徑

```javascript
renderedRoute.html = renderedRoute.html
  .replace(new RegExp('="/js/', 'g'), '="./js/')
  .replace(new RegExp('="/css/', 'g'), '="./css/')
  .replace(new RegExp('/img/', 'g'), './img/')
  .replace(new RegExp('/favicon.ico', 'g'), './favicon.ico')
```

1. 將檔案從資料夾拔出來變成html

```javascript
if (renderedRoute.route.endsWith('.html')) {
  renderedRoute.outputPath = path.join(
    __dirname,
    'dist',
    renderedRoute.route
  )
}
```

1. inject參數

```javascript
injectProperty: '__PRERENDER_INJECTED',
inject: {
  foo: "bar"
},
```

透過 window.__PRERENDER_INJECTED.foo 取得

## 製作樣板順序

1. create repo
2. clone repo
3. generator , ./template
4. push
5. vue create --preset {{userName}}/{{repoName}} {{projectName}}

Prerender幫忙增加入口提升SEO
npm i vue-meta

main.js增加use

```javascript
import VueMeta from 'vue-meta'

Vue.use(VueMeta)
```

App.vue主要是框架，通常主要定(%s可以取到title)

```javascript
export default {
  metaInfo () {
    return {
      titleTemplate: '%s - Vue Prerender'
    }
  }
}
```

內頁的vue

```javascript
metaInfo () {
    return {
      title: this.title,
      meta: [
        { property: 'og:title', content: `Vue Prerender | ${this.title}` }
      ]
    }
},
```

### Vue Router 卷軸控制(錨點)

1. 環境變數裡的公用路徑

```javascript
publicpath(){
    return process.env.
}
```

1. 忽略eslint
   .eslintignore
   dist
2. 錨點#
   path上加上#
3. router會攔截連結 (可以直接設在樣板裡)
   savePosition:回上頁使用

```javascript
scrollBehavior(to,from,savePosition){
    // 有上一頁就回上一頁
    if (savePosition) {
      return savePosition
    // 有錨點就去錨點
    } else if (to.hash) {
      return { selector: to.hash }
    // 其他就回到最上面
    } else {
      return { x: 0, y: 0 }
    }
}
```

### Vue Plugin

1. install

```javascript
export default{
 install(Vue, options) {
 
 }
}
```

1. 外掛只是觸發點
2. 如果外掛匯入只要一行可以放在main.js
3. 如果是一整包，需要再包一層 EX:i18n

### i18n

npm i vue-i18n

$t(‘hello’)

```javascript
import Vue from 'vue'
import VueI18n from 'vue-i18n'

import tw from './locales/tw.json'
// import en from './locales/en.json'
// import jp from './locales/jp.json'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'tw', // 預設語言
  messages: {
    tw// , en, jp
  }
})

export default i18n
```

1. 非同步i18n
   store

```

```

### vee validator

npm install vee-validate

// TODO