# Vue.js 從零開始 Day3 - 201910 週六

## SSR VS CSR

差異:畫面處理在哪一端處理，效能消耗端不同
SSR:SERVER SIDE
CSR:CLIENT SIDE

## Vuex 集中式資料管理

讀取:State -> View
寫入:Action
*單向資料流管理*
不可以隨意直接修改資料
![img](https://tva1.sinaimg.cn/large/006y8mN6gy1g8rvh95lnjj30qm0e3gpo.jpg)
情境選擇:
![img](https://tva1.sinaimg.cn/large/006y8mN6gy1g8rvhck4v9j31ep0lv13x.jpg)
(1) 共用
(2) 操作

## 範例5

1. component寫法注意:Html不區分大小寫
2. 客製html標籤無法用預設@click，須加上native
3. 接外層資料 props

```javascript
<view-component :count="count" @click.native="count++"></view-component>
```

方法一

```javascript
props: ["count"]
```

方法二

```javascript
props: {
  count: {
    required: true,
    type: Number
    // default: 0
  }
}
```

1. 資料修改
   不能隨意往外改，資料擁有者才可以修改資料
   ![img](https://tva1.sinaimg.cn/large/006y8mN6gy1g8rvhh3hypj31cl0gf7ct.jpg)
2. 收歸國有 Vuex
   store(儲存區)=>state
   有公用state，還是可以有私有data
3. View的資料控管
   私有 : data
   借來 : props(parent)
   共用 : store(Vuex)
   ![img](https://tva1.sinaimg.cn/large/006y8mN6gy1g8rvhkv7qpj30vr09l779.jpg)
4. 嚴謹模式
   strict:true
   官方建議開發時開，上線關掉(需要檢查，會較耗效能)
   可以不開，但寫法需要嚴謹
5. Vuex的設計模式
   ![img](https://tva1.sinaimg.cn/large/006y8mN6gy1g8rvhnlkxrj311v0ndn61.jpg)
6. Mutations
   可以做第一層防禦(判斷修改)
   呼叫方式:commit

```javascript
let store = new Vuex.Store({
    strict: true,
    state: {
      count: 0
    },
    mutations: {
      changeCount(state, { count }) {
        if (count >= 0) {
          state.count = count;
        }
      }
    }
});

computed: {
  count: {
    get() {
      return this.$store.state.count;
    },
    set(value) {
      // this.$store.state.count = value;
      this.$store.commit("changeCount", { count: value });
    }
  }
}
```

1. Mixin
   解決重複寫相同computed
   問題:當computed內容與mixin重複時?
   以私有資料為主
   *模組的第一層，只能有一個dom*

![img](https://tva1.sinaimg.cn/large/006y8mN6gy1g8rvhqwpv3j312x0mjdlq.jpg)

## 範例6

1. Actions
   (1) 一定要return promise
   (2) 不能直接改資料
   (3) context => commit/dispatch/getters/state/rootGetters/rootState
   ![img](https://tva1.sinaimg.cn/large/006y8mN6gy1g8rvhx9durj310b0ohdot.jpg)
   用法其一:當成api資料管理器，資料依然在自己身上

2. ```javascript
   actions: {
     GET_NUMBER: ({ commit }) => {
       return new Promise((resolve, reject) => {
         setTimeout(function() {
           let number = Math.random();
           resolve(number);
         }, 1000);
       });
     }
   },
   ```

   

```javascript

methods: {
  async getNumber() {
    this.loading = true;
    let num = await this.$store.dispatch("GET_NUMBER");
    this.number = num;
    this.loading = false;
  }
}
```

用法其二:透過mutation寫入共用再讀取

```javascript
actions: {
  GET_NUMBER: ({ commit }) => {
    return new Promise((resolve, reject) => {
      setTimeout(function() {
        let number = Math.random();
        commit("changeNumber", { number });
        resolve(number);
      }, 1000);
    });
  }
},
mutations: {
  changeNumber(state, { number }) {
    state.number = number;
  }
}
```



```javascript
computed: {
  number: {
    get() {
      return this.$store.state.number;
    }
  }
},
methods: {
  async getNumber() {
    this.loading = true;
    await this.$store.dispatch("GET_NUMBER");
    this.loading = false;
  }
}

```

payload:攜帶物(傳遞資料的一包東西)

### 常用命名 (以下Alex分享，不代表本台立場

data => 資料，自己管理的內容
index => 索引，陣列索引或序列編號
key => 鍵，物件或對照表鍵值
result => 結果，輸入或輸出的值
param => 網址參數，/param
query => 網址參數，/?query
response => 回傳，API回傳 res
request => 要求，API要求 req
payload => 附帶資料，跟隨要求所帶的值
value => 值

## 下午場

## QA

1. 為何Actions要return component?
   actions 的 return : 讓前端知道我好了沒
   *如果沒有透過這個return讓前端知道，前端只能透過watch來知道是否資料已經取回來，因此強烈建議要return*

![img](https://tva1.sinaimg.cn/large/006y8mN6gy1g8rvi514hmj30vj0jfwlg.jpg)

1. vuex非同步可以使用async await嗎?
   vuex使用async await(Actions)

```javascript
async ASYNC_GET_NUMBER({dispatch}){
    let number = await dispatch('GET_NUMBER')
    commit('changeNumber',{number})
    return new Promise((resolve)=>{
        resolve(number)
    })
}
```

## 範例7 module

觀戰重點:資料何時保留?何時刪除?
觀戰重點:beforeDestroy/mounted

1. module一定是用function做
   store module為何不能用obj做?
   為何模組的data要用函式?
   用obj會變成同一個，無法重複利用
   用functoin才會new出一個新的,避免操作到同一個
2. module註冊有兩種方法
   第一種註冊方法:
   如果module使用obj，下面message與message1就會重複
   所以需要使用function

```javascript
modules:{
    message:messageModule(),
    message1:messageModule()
}
```

1. 永久資料vs暫時資料
   永久資料:例如登入資訊
   暫時資料:例如count
2. hasModule
   預設vuex沒有檢查module的方法
3. registerModule
   第二種註冊方法:
   (1) 檢查及註冊建議mouted之後再做比較安全
   (2) registerModule做出來的module就可以移除
   (3) 如果沒判斷是否有module，一直register，state只有一份，但是mutations會一直增加
4. 清掉方法
   (1) 資料清空

```javascript
this.$store.state.counter.count = 0
```

(2) 移除掉module

```javascript
if(this.$store.jasModule('counter')){
 this.$store.unregisterModule('counter')
}
```

1. 規劃資料
   ![img](https://tva1.sinaimg.cn/large/006y8mN6gy1g8rvib0aqhj30s50i30w5.jpg)
2. actions參數
   ![img](https://tva1.sinaimg.cn/large/006y8mN6gy1g8rviesbuxj30nr0l7dm6.jpg)

## 第三天範例 cli

1. 列出安裝清單:
   npm list -g --depth=0
   list(列出)
   -g(全域)
   –depth=0(深度第一層)
2. 安裝vue-cli:
   npm i -g @vue/cli

vue-cli使用方法:

1. vue ui
   // TODO
2. vue create

ESLint:規範

## 1個全新專案

main.js => 載入需要

1. 載入方式:
   (1) import

```javascript
import Home from '../views/Home.vue'
```

(2) 動態載入:

```javascript
component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
```

1. 單檔模組化 vs 分資料夾
2. 單檔移除eslint規則
   script中打
   /* eslint-disable no-unused-vars */
3. map系列 (對應)

```javascript
import { mapState, mapGetters, mapMutations, mapActions} from 'vuex';
```

(1) 放在computed
mapState

```javascript
...mapState({
    count:state=>state.count
})
// count:{
//     get(){
//         return this.$store.state.count;
//     }
// }
```

mapGetters

```javascript
...mapGetters(['msg'])
// msg:{
//     get(){
//         return this.$store.getters.msg
//     }
// }
```

vuex bindings(唯讀)

(2) 放在methods:
mapMutations

```javascript
...mapMutations({
    change:'CHANGE'
}),
increment(){
    this.change({value: this.count + 1})
    // this.$store.commit('CHANGE',{value: this.count + 1})
}
```

mapActions

```javascript
...mapActions({
    random:'GET_RANDOM'
})
get(){
    this.random()
    // this.$store.dispatch('GET_RANDOM')
}
```

*computed set 建議接props跟store使用*

##### module:資料分類

![img](https://tva1.sinaimg.cn/large/006y8mN6gy1g8rvlsrrtgj31250lznav.jpg)



#### vue map 寫法對照

```javascript
import { mapState, mapGatters, mapActions, mapMutations } from 'vuex'

// 各種map 寫法比較
export default {
  name: 'vuexmap',
  computed: {
    ...mapState({
      count: state => state['name-space'].count
    }),
    ...mapGatters(['msg'])
    // count: {
    //   get () {
    //     return this.$store.count
    //   }
    // },
    // msg: {
    //   get () {
    //     return this.$store.msg
    //   }
    // }
    //
    // set get 炫技寫法
    // count : {
    //   ...mapState({
    //     get: state => state.count
    //   }),
    //  ...mapMutations({
    //    set: 'CHANGE'
    //  })
    // }
    // 原本寫法
    // count: {
    //   get () {
    //     return this.$store.count
    //   },
    //   set (value) {
    //     this.$store.commit('CHANGE', value)
    //   }
    // }
  },
  methods: {
    ...mapMutations({
      change: 'CHANGE'
    }),
    increment () {
      this.change({ value: this.count + 1 })
    },
    decrement () {
      this.change({ value: this.count - 1 })
    },
    // increment () {
    //   this.$store.commit('CHANGE', { value: this.count + 1 })
    // },
    // decrement () {
    //   this.$store.commit('CHANGE', { value: this.count - 1 })
    // }

    // 在 vuex裡的action 是專門用來處理非同步
    // 所以最好用action裡用async fun return，下面就可以 await 來處理同步順序問題，也不用判斷還沒回傳回來時候的值
    ...mapActions({
      random: 'GET_RANDOM'
    }),
    get () {
      // await this.random()
      this.random()
    }
    // get () {
    //   await this.$store.dispatch('GET_RANDOM')
    // }
  }
```

