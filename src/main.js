import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// import Vuex from 'vuex'
import store from '@/store/index'
Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(MintUI);
var hasLogin=sessionStorage.getItem('hasLogin');
if(hasLogin) store.state.hasLogin = hasLogin;
// localStorage存储数据类型为对象时是先将对象转化为字符串存储，拿出来时再转回对象
var token=localStorage.getItem('token')
var date=new Date();
console.log('token-->top',token)
if(token){
  console.log('a->')
  let time=JSON.parse(token).time
  let nTime=date.getMinutes();
  let diff=nTime-time;
  console.log('new-time-->',diff,nTime,time)
  if(diff>=2){
    localStorage.removeItem('token')
  }
}else{
  console.log('b->')
  let time = date.getMinutes();
  let arr={time:time,token:time}
  console.log('arr->',typeof arr)
  var token = localStorage.setItem('token',JSON.stringify(arr))
}
// console.log('看看-->',token.token)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
