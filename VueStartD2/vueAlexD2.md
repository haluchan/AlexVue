# Vue.js 從零開始 Day2 - 201910 週六

## 問題回饋

Q1:LinkMenu (null)
null變成’null’與綁定有關

```javascript
<!-- 字串null/字串不是空值 -->
<option value="null">請選擇</option>
<option :value="'null'">請選擇</option>
<!-- null -->
<option :value="null">請選擇</option>
```

Q2:delete

Q3:範例7轉換成render(無痛升級前奏:拆模組)
步驟1:將原本方法及data寫進component，並將data轉成function

```javascript
let app ={
    data(){
        return {...}
    }
}
```

步驟2:將new Vue改成render component

```javascript
new Vue({
    render: h => h(app)
}).$mount("#app");
```

步驟3:將html剪下放component換成新的

SERVER SIDE RENDER

\```javascript= let app ={ template:`

...

`, data(){ return {...} } } ```

## 範例9 slide

1. v-cloak隱藏畫面

```javascript
[v-cloak]{
 display: none;
}
 <div id="app" v-cloak>
```

1. 改變資料

```javascript
change(index) {
    if(index>this.list.length -1){
      this.active = 0
    }else if(index < 0){
      this.active = this.list.list - 1
    }else{
      this.active = index;
    }
}
change(index) {
    this.active = (index + this.list.length) % this.list.length;
}
```

![img](https://tva1.sinaimg.cn/large/006y8mN6gy1g8rvmpk9p4j317p0jhguq.jpg)
\3. 共用變數可移到共用computed
寫在外面可以讓更多人用

```javascript
computed:{
  total(){
    return this.list.length
  }
}
```

1. v-for 可以選擇
   (1) 用list跑迴圈
   優:可以取到id
   缺:index從0開始，需要+1
   (2) 用total跑回圈
   ps: 顯示要+1(從1開始),切換要從0開始
2. class綁法
   (1)靠function
   (2)一個class配一個boolean
   :class=’{active:index === active}'
   ps: class有沒有引號取決於className
3. (2)img src= 會多一次讀取
   (3)background-image
   :style="{‘background-image’:`url(${nowPic.src})`}"
4. 動畫效果
   ![img](https://tva1.sinaimg.cn/large/006y8mN6gy1g8rvmu5gr1j30wg0cmdig.jpg)
   4個點
   enter/enter-to/leave/leave-to

```javascript
.fade-enter{
    opacity:0
}
.fade-leave-to{
    opacity:0
}
```

2個過程
enter-active/leave-active

```javascript
.fade-enter-active{
    transition:opacity 0.8s
}
.fade-leave-active{
    transition:opacity 0.4s
}
<transition name="fade">
</transition>
```

注意:div需要綁key做判斷，否則可能會失效

1. 方法
   同一個屬性操作，盡可能不要重複在不同地方控制
   ex:computed裡跟methods都去控制background-image
   可以改成接力的方式

```javascript
computed: {
    nowBackground() {
        return {"background-image":`url(${this.nowPic.src})`}
},
methods:{
    getbackground(index){
        return {"background-image":`url(${index})`}
}
```

nowBackground

```javascript
nowBackground() {
            return this.getbackground(this.nowPic.src);
          }
```

1. v-for不要配v-if
   改變dom架構會耗較多效能，建議做資料處裡

{{num}}

v-if:完全不要DOM，不要配v-for v-show:如果需要暫時隱藏，不拔除，可以配v-for 10. 多個動畫跟單個是不同的 <transition-group name="fade" tag="div" class="container"></transition-group> (1)指定tag (預設span) (2)加上class 差異: transition是虛擬標籤，transition-group是真實標籤，會影響dom結構

動畫
(1)如果第一張有效果加 appear
(2)如果想要層次感加 mode
(transition-group不支援 建議用css的delay做掉)
mode=“out-in” 先退場再進場
\11. 計時器
思考:變數使用是否需要用vue處理

```javascript
created(){
    // 第一個可以用this的時間點
}
beforeMount(){
    // mount之前
}
mounted(){
    // mount之後，已經上畫面，準備要show
    this.setTimer()
}
beforeDestroy(){
    // 最後可以用this的時間點
}
```

setTimeout vs setInterval
1.setTimeout 一次性觸發(掌控度較佳，但需要控制)
2.setInterval 連續觸發
當想要控制越多，就要做越多事情
可以根據情境做選擇

***推薦外掛:Code Spell Checker***

1. transition-group遇上mouseenter
   transition-group自訂tag遇到原生預設的事件mouseenter
   會被認定為自訂事件，要取原生事件需要告知使用原生事件(mouseenter.native)

[練習]

1. 動畫嘗試把淡入淡出改成上下移動
2. 如果資料只有一張，計時器會努力跑，該怎麼處理?

## QA

computed vs metods vs watch
computed:資料再處理，分成function跟object
metods:客製化操作/事件處理(平常做的function)
watch:資料監控後處理

computed vs metods
computed:catch
metods:每一次

computed vs watch
computed:寫入前
watch:寫入後
![img](https://tva1.sinaimg.cn/large/006y8mN6gy1g8rvmyu5lxj310g0m7aip.jpg)

# 下午場

## 範例10

1. 模組
   ![img](/Users/halu/Pictures/md/DXHOcHL.png)
2. 三元運算

```javascript
this.step =
  this.step + direct < 0
  ? 0
  : this.step + direct >= this.total - 1
  ? this.total - 1
  : this.step + direct;
```

1. componet
   (1) 命名
   網頁:全小寫-串
   程式:駝峰式命名
   (2) 綁到畫面上

```javascript
components:{
 // name:component
}
```

html沒有大小寫區分
(3) 狀態保留
當換頁，組件被拆掉，資料不見，狀態也會消失
<keep-alive></keep-alive>
(預設全留，只mounted一次)
(4) 指定保留特定
<keep-alive :include='keepStep'></keep-alive>
記憶體衡量與使用者方便之間去做權衡

1. vue組件
   (1) transition : 單組動畫
   (2) transition-group : 多組動畫
   (3) keep-alive : 保留資料
   (4) component : 切換組件
   <component :is="'name-component'"></component>
2. class綁定
   用class綁定，原本的class還是可以使用
   EX:
   :class="{button:true}" 可以寫 class=“button”
3. components檔案切分
   components.js

```javascript
let Components = {
    function aaaComponents() ={}
    function bbbComponents() ={}
    function cccComponents() ={}
    return {
        aaaComponents,
        bbbComponents,
        cccComponents
    }
}
```

## 路由器

後端路由 vs 前端路由
![img](https://tva1.sinaimg.cn/large/006y8mN6gy1g8rvn3shzuj30sn0kmgpq.jpg)

hash mode vs history mode
hash mode:使用#，網頁不會重load，但無法提升SEO

## 範例1

模組template第一層只能有一個TAG
一個route對到一個頁面模組(大)
設計route:

1. routes
   路由規則
2. mode
   預設hash

```javascript
let router = new VueRouter({
    mode:'hash',
    routes:[
        {path:"/", component:index},
        {path:"/start", component:start},
        {path:"/advance", component:advance}
    ]
})

new Vue({
    el:'#app',
    router
})
```

1. 路由器畫面
   <router-view></router-view>
2. 前端router用處
   並非為了SEO，為了記憶讓使用者方便
   如果需要SEO需要配合後端router
3. 切換
   需要告知link去哪裡 => 必須傳一個to給他
   可以使用tag指定及設定class
   <router-link tag="div" class="button" to="/"></router-link>
   to的寫法:
   (1) 沒有綁定，當成字串用
   <router-link to="/"></router-link>
   (2) 綁定，可以給路由名字
   <router-link :to="{name:'adv'}"></router-link>
4. 路由可以取名字

```javascript
let router = new VueRouter({
    routes:[
        {path:"/advance", component:advance, name:'adv'}
    ]
})
```

1. 導頁概念
   問題1:如果使用者輸入沒設定在規則的網址? => 重導
   沒有指定路( * )由會放到最後一個(讀取是由上而下)

```javascript
let router = new VueRouter({
    routes:[
        {path:"/", component:index},
        {path:"*", redirect:'/'}
    ]
})
```

問題2:mode改成history mode，使用者複製貼上，網頁會掛掉
因為檔案只有一支，需要server端配合全都導到同一頁html
純前端需要使用hash mode

1. 轉場效果
   配合transition

## 範例2

巢狀結構
![img](https://tva1.sinaimg.cn/large/006y8mN6gy1g8rvn91ifsj30ue0l40yj.jpg)
每一層會有一個route-view
每一層對應一個component

1. 巢狀屬性path如果下斜線，需要每一層寫出來
   EX:{path:"/framework/vue", component:vue}
   建議不要寫斜線
   EX:{path:“vue”, component:vue}

```javascript
let router = new VueRouter({
    routes:[
        {path:"/framework", component:framework
         children:[
             {path:"vue", component:vue}
         ]
        },
        {path:"*", redirect:'/framework'}
    ]
})
```

1. 預設首頁
   除了 * 外，還需要補空

```javascript
let router = new VueRouter({
    routes:[
        {path:"/framework", component:framework
         children:[
             {path:"", redirect:'vue'}
             {path:"vue", component:vue}
             {path:"*", redirect:'vue'}
         ]
        },
        {path:"*", redirect:'/framework'}
    ]
})
```

## 範例3

使用程式切換router(程式導頁)

1. SPA是否讓別人選擇上下頁?
   使用push

```javascript
to(path){
    this.$router.push(path)
}
```

1. 多選
   (1) 資料類型用陣列
   (2) 每個v-model綁在同一個參數上
2. $router.push不允許一直放同一頁

```javascript
if(this.$router.path === path) return false
```

1. 上一頁/下一頁

```javascript
go(direct){
    this.$router.go(direct)
}
```

1. replace

```javascript
to(path){
    this.$router.replace(path)
}
```

1. $route vs $router
   $route:紀錄現在路由狀態的資料組(資料)
   $router:操作用，可以push/replace/go(實體)
2. 選到按鈕亮起來
   經過與到達
   (router-linke-active/router-link-exact-active)
   router-link-exact-active:效果只想讓現在頁面按鈕亮
   router-linke-active:效果過程都亮
3. 程式導頁時機
   沒有互動行為
   (1) 到數計時導頁
   (2) 表單送出檢核
4. router-link Tag
   (1) exact :
   (2) replace : 將router.push改成router.push改成router.replace

## 範例4

router hook(攔截點檢查) 有三個參數:
(1) to
(2) from
(3) next (一定要寫，不然就卡死)
路由上提供meta參數(可以用來驗證)

```javascript
let router = new VueRouter({
    routes:[
        { path: "/", component: index },
          { path: "/start", 
            component: index },
            beforeEnter(to,from,next){
                //TODO
                next()
            }
          {
            path: "/advance",
            name: "advance",
            component: advance,
            meta:{auth:true}
          }
    ]
})

router.beforeEach((to,from,next)=>{
    if(to.meta.auth === true){
        if(data.login === false){
            alert('尚未登入')
            return next('/')
        }
    }
    next()
})
```

攔截點:
beforeEach:第一層全部都會檢查
beforeEnter:第二層(router)進入檢查
beforeRouteEnter:第三層(component)進入檢查
beforeRouteLeave:第三層(component)離開檢查,ex:確定要離開?

生命週期順序:
beforeEach -> beforeEnter -> beforeRouteEnter -> -> mounted -> beforeLeave -> destory

不建議hook帶資料，主要做攔截檢查

[練習]

1. 輪播:圖片數量及功能限制
2. 輪播模組化

上週作業:
當選第二個，連動第三個
find():回傳第一個滿足所提供之測試函式的元素
findIndex():回傳index

```javascript
methods:{
    setDirectIndex(){
        if(this.cityIndex !== null && this.areaIndex !== null){
            this.index.direct = this.directList.findIndex(
            element => 
             element.cityIndex === this.cityIndex && element.areaIndex === this.areaIndex
            )
        }
    }
}
```