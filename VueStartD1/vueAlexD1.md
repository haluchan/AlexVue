# Vue.js 從零開始 Day1 - 201910 週六

## SPA與框架的意義
### SPA(Single Page Application) vs SSR(Server Side Rendering)

![](https://i.imgur.com/jhoxmZD.png)

SSR(整頁後端產生好)優點:
1.SEO
2.部分js+css(讀取效率較高
3.減少耗能

SPA優點:
1.過場比較順
2.轉換時間短

**(1)活動網站**
多頁切換 => SPA
少頁不連貫 => SSR
有沒有API? => (沒有)SSR

**(2)CMS平台**
SEO => SSR
時代演進 => 混搭(Hybrid)

### 框架優缺點
優點:
1.程式架構 (框架選擇)
2.模組化
3.資源 (社群生態)

缺點:
1.規則
2.押寶問題 (框架掛掉怎麼辦?)

面試題:為甚麼要用框架，主要能解決甚麼問題?
 => 讓畫面與狀態(資料)同步
 
## 範例1
使用js手動更新問題:
當遇到畫面改變時，
1.需要大量改code(非擴展)
2.需要耗更多的效能去改動畫面

三大框架:
Angular : 需要會Typescript
React   : 門檻較高(會跟可以用有落差)，接近js，變強js也會跟著變強，彈性較大
Vue     : 一開始為了輕便操作畫面而製作

面試題:為什麼Vue.js不用像React一樣自行指定畫面更新?(shouldcomponentupdate)
 => Vue幫你做了，diff不同
 => React diff DOM / Vue diff Data
 
## Hello Vue.js
1.良好的性能
2.平緩的學習曲線
3.模組化與漸進式開發
互動式渲染 => Component => 路由 => 資料 => Vue Cli

MVVM:資料與畫面的同步
Vue2 => 攔截做事情

MVC與MVVM => 中介者的差異
![](https://i.imgur.com/MDxR3Qf.png)

(1) Object.defineProperty
```javascript=
let a = 1;
let obj = Object.defineProperty({}, "count", {
    get() {
      console.log("get a");
      return a;
    },
    set(value) {
      console.log("set a");
      a = value;
    }
});
```
Get
```javascript=
obj.count
```
Set
```javascript=
obj.count = 3;
```

(2) observable => vue
先將資料跟畫面綁一起=>改資料就改畫面
<1> 生出資料
<2> 綁定
<3> 改資料

## 範例5
Vue的使用:可以在任何一頁的任何區塊
1. 畫面
2. 匯入Vue.js
a.宣告式
綁定方法(樣板):
(1) mustache {{}} (innertext)
```htmlmixed=
<h1 class="title">{{ msg }}</h1>
```
(2) v-text (innertext)
```htmlmixed=
<h1 class="title" v-text="msg">{{ msg }}</h1>
```
(3) v-html =>認識html標籤
```htmlmixed=
<h1 class="title" v-html="msg">{{ msg }}</h1>
```
ps:v-html不要用,使用者輸入不要用

(4) v-bind 單向綁定
```htmlmixed=
<input type="text" v-bind:value="msg" />
<input type="text" :value="msg" />
```
(5) v-model 雙向綁定(輸入框)
```htmlmixed=
<input type="text" v-model="msg" />
```

b.render
1.模板先寫好
2.data必須是function
```javascript=
let app = {
    data() {
      return {
        msg: "This is my message"
      };
    },
    template: `
    <div id="app">
      <section>
        <div class="container">
          <h1 class="title">{{ msg }}</h1>
          <h1 class="title" v-text="msg">{{ msg }}</h1>
          <div>
            <input type="text" v-model="msg" />
          </div>
          <input type="text" :value="msg" />
          <div></div>
        </div>
      </section>
    </div>`
};
```
3.生成畫面
(1)
```javascript=
new Vue({
    el: "#app",
    render: h => h(app)
});
```
(2)
```javascript=
new Vue({
    render: h => h(app)
}).$mount("#app");
```

## 範例3 oberserve array
1.vue2 裡對array操作有限制
 X array[i] = xxx
2.vue使用攔截

## observable
![](https://i.imgur.com/ykEnPsg.png)
![](https://i.imgur.com/EFZOsW0.png)

## 資料與畫面延伸處理
methods(方法) vs computed(計算)
1. 格式共用/資料處理 => computed
2. 需要傳參數/綁定 => methods
3. computed只有在資料變動的時候，才會觸發

```javascript=
let states = {
    ary: [{ name: "alex" }, { name: "sara" }]
};
new Vue({
    el: "#app",
    data: states,
    computed: {
      alex() {
        console.log("computed");
        return this.ary[0];
      }
    },
    methods: {
      getAlex() {
        console.log("methods");
        return this.ary[0];
      }
    }
});
```

## 範例7
任務:第二個下拉選單動，連動第三個下拉選單
1. 使用axios取回資料(需要await
2. 迴圈使用 v-for (in前面city/index自行取名)
   postal 可能陣列或物件
```javascript=
<option v-for="(city,index) in postal" :value="index">{{ city.name }}</option>
```
3. 寫v-for，一律綁key(讓vue知道每一筆資料的差別)
   key需要是1對1的，最好是放資料ID
4. 預設參數使用需要特別小心 null
5. 條件顯示 v-if/v-else (會讓區塊完全消失在DOM裡)
```javascript=
<h1 v-if="nowArea !== null">{{ nowArea.code }} {{ nowCity.name }} {{ nowArea.name }}</h1>
<h1 v-else>請選擇縣市區域</h1>
```
6. computed兩種格式 (1)function(不能set,單純get) (2) 物件(可以有get/set功能)
![](https://i.imgur.com/8dBxhzK.png)
7. reduce (第三個參數是index)
```javascript=
let ary = ["a", "b", "c", "d"];

let result = ary.reduce((prev, current) => {
  prev += current
  return prev;
}, "");

// 1. "", "a"=>"a"
// 2. "a", "b"=>"ab"
// 3. "ab", "c"=>"abc"
// 4. "abc", "d"=>"abcd"

console.log(result)
```
8. 連動(watch)
建議不能用computed時，再使用
```javascript=
watch:{
    "index.direct":{
      immediate: true, // 預設先做一次
      handler(newVal,oldVal){

}
    }
}
```
9. computed讓資料多一個接口

## 範例8
上傳圖片
1. 沒有在vue裡面操作就不需要放入vue(EX: FileReader)
2. File inputs are read only => 改用 v-on:change
```javascript=
<input class="file" type="file" accept="image/*" v-on:change='fileHandler'/>
<input class="file" type="file" accept="image/*" @change='fileHandler'/>
```
3. FileReader
https://developer.mozilla.org/zh-TW/docs/Web/API/FileReader
4. 生命週期
 mounted:畫面跟資料結合之後，通常用來初始化
5. vue裡取dom使用ref (this.$refs)
//TODO 待補
6. function功能
(1) 客製化資料
(2) 
7. 排序/交換
不能使用下面的方法: vue挾持不到，資料會變，畫面不變
```javascript=
let temp = this.list[index];
this.list[index] = this.list[index + direct];
this.list[index + direct] = temp;
```
8. Vue只要畫面沒有即時改變，就是錯了
9. splice
![](https://i.imgur.com/ZhYUtdd.png)
10. $set => 強制觸發畫面更新


