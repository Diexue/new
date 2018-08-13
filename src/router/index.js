import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index/index'
import store from '../store/index'
Vue.use(Router)

const router= new Router({
  routes: [
    {
      path:'/',
      name:'index',
      component:Index
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    }, {
      path:'/first',
      name:'first',
      meta:{
        requireAuth:true
      },
      component:resolve=>require(['@/pages/first/index'],resolve)
    },{
    path:'/second',
      name:"second",
      meta:{
        requireAuth:true
      },
      component:resolve=>require(['@/pages/second/index'],resolve)
    },
    {
      path:'/login',
      name:"login",
      component:resolve=>require(['@/pages/login/login'],resolve)
    },{
      path:'/register',
      name:"register",
      component:resolve=>require(['@/pages/login/register'],resolve)
    },
    {
      path:'/page',
      name:'',
      component:resolve=>require(['@/pages/page/index'],resolve),
      children:[
        {
          path:'',
          name:'first',
          component:resolve=>require(['@/pages/page/first/index'],resolve)
        },
        {
          path:'/page/first',
          name:'first',
          component:resolve=>require(['@/pages/page/first/index'],resolve)
        },
        {
          path:'/page/second',
          name:'second',
          components:{
            default:resolve=>require(['@/pages/page/second/index'],resolve),
            second:resolve=>require(['@/pages/page/first/index'],resolve),
          }
        },

      ]
    },
    {
      path:'/slot',
      name:'slot',
      component:resolve=>require(['@/pages/slot/index'],resolve)
    },
    {
      path:'/websoket',
      name:'websoket',
      component:resolve=>require(['@/pages/websoket/index'],resolve)
    },
    {
      path:'/calendar',
      name:'calendar',
      component:resolve=>require(['@/pages/calendar/index'],resolve)
    },
  ]
})
router.beforeEach((to,from,next)=>{
  console.log('ddd--->',to)
  if(to.meta.requireAuth){
    if(!store.state.hasLogin){
      console.log('定向',to.path)
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }else{
      next()
    }
  }else{
    next()
  }
  // const nextRoute = ['second','first'];
  // if(nextRoute.indexOf(to.name)>=0){
  //   if(!store.state.hasLogin){
  //     router.push({ name:'login'})
  //   }
  // }
  // if(to.name==='login'){
  //   console.log('true--->')
  //   if(store.state.hasLogin){
  //     router.push({name:'index'})
  //   }
  // }
  // next();
})
export default router;
