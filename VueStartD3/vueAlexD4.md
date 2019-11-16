## Vue.js 從零開始 Day4 - 2019/11/16 週六

### 生命週期

beforeCreate:沒有this
created:之後才有this
mounted:最常操作時間點
資料變動:有掛載在畫面上的資料
beforeDestroy:最後有this，自己監聽的需在這裡關閉

![img](https://tva1.sinaimg.cn/large/006y8mN6gy1g9017tsv76j31250lxtmv.jpg)

### 範例1

![img](https://tva1.sinaimg.cn/large/006y8mN6gy1g9017t3kz6j31250lxtmv.jpg)

a.b.c建議逐層取，避免中間錯誤

hook都是同步，mounted 加上async只是為了可以寫await，不會特別等

public資料夾 => 網頁在run的資料夾
src => 程式的資料夾
assests => build會跑這裡，進行壓縮，會有catch問題，但是跑build會比較久

相對路徑=>圖片與資料較好
程式可能會比較深，建議用絕對路徑
=> @(src資料夾)

綁定(都是用props)

1. 資料餵給你
   :list=‘list’
2. 告訴你我要甚麼
   :auto='true’
   開關類可以簡化(auto)

別人丟給我們，我們可以選擇要不要接(props)
v-for:for in 可以針對陣列/物件/數字

this.$emit : 發事件
事件發規發，沒有偵聽還是不會發生

偵聽事件是否要檢查 === 收到還的一百萬是否要檢查?

sync會自動寫入資料 => 'update:props’
EX:
:current.sync='current’
this.$emit(‘update:current’)

sync請搭配computed使用，不要直接綁資料

![img](https://tva1.sinaimg.cn/large/006y8mN6gy1g9017ynrydj31a50kbgw4.jpg)
provide/inject(功能強大，請做限制)
1.模組內 2. 純讀
給:provide

```javascript
provide() {
    return {
      sliderList: this.list
    };
  },
```

取:inject

```javascript
inject: ["sliderList"],
```

**不響應**
適合原始資料傳遞，做公用資料，不做變動資料

兩種做法，傳送資料:

1. nowPic
   做成純component,沒有邏輯判斷
2. current,list
   在裡面去判斷顯示

![img](https://tva1.sinaimg.cn/large/006y8mN6gy1g90188ll8xj31390g1gqq.jpg)

watch:資料’改變後’的處理，參數前面new，後面old

```javascript
watch:{
    // 方法型:功能較少
    auto(newVal,oldVal) {
        // 盡量不要做資料回寫的動作，可以做狀態處理
        // this.auto = oldVal
    }
    // 物件型
    auto:{
        immediate: true, // 第一次就做
        hanfler(value){
            value ? this.setTimer() : this.clearTimer();
        }
    }
}
```

### Router

1. params

```javascript
path: "/user/:uid"
```

1. query string
   ?id=123

得到router變化
computed/watch/beforeRouteUpdate

```javascript
computed: {
    id() {
      console.log("computed:" + this.$route.query.id);
      return this.$route.query.id || "none";
    }
    },
    beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter:" + to.query.id);
    next();
    },
    beforeRouteUpdate(to, from, next) {
    console.log("beforeRouteUpdate:" + to.query.id);
    next();
    },
    watch: {
    // $route(to) {
    //   console.log("watch:" + to.query.id);
    // }
    $route: {
      immediate: true,
      handler(to) {
        console.log("watch:" + to.query.id);
      }
    }
}
```

$router.push有四個參數

1. router-link

```javascript
<router-link :to="{query:{id:'alex'}}">Query Alex</router-link>
```

1. 
2. 
3. 

router.push這樣寫會噴錯

```javascript
@click="$router.push({query:{id:qid}})"
```

未來要改成

```javascript
changeQuery() {
  this.$router.push({ query: { id: qid } }).catch(err => {
    console.log("error", err);
  });
}
```

Json-server
npm i -g json-server
json-server db.json

**同步非同步並非await就等待，要看製作機制**

如果router裡面要用store就要import

directive:綁DOM使用

1. bind
2. inserted
3. update
4. componentUpdate
5. unbind

```javascript
<p v-content='Hello'></p>


Vue.directive('content' , {
 bind(el, binding, vnode){
  console.log(el, binding, vnode);
 },
 inserted(el,{value}){
  el.innerText = value;
 }
})
```

### 範例2:做個外掛的注意事項:

npm i @vue/composition-api

1. mixins
   主件+mixins
   重複code衍伸出mixins
   問題:覆寫
2. HOC 高階主件
   將別的主件包裝產生新的主件(封裝主件)
3. RenderLess
   將畫面權限交給別人
   同樣資料，切換不同component，就可以切換不同樣式
4. composition
   資料管理

mounted寫了事件監聽，馬上寫上beforeDestory