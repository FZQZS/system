import Vue from 'vue'
import VueRouter from 'vue-router'


// import { getToken } from '../utils/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ()=>import('../views/Home.vue'),
    redirect:'/index',
    children:[
      {
        path:'/index',
        name:'Index',
        component:()=>import("../views/index/index.vue")
      },
      {
        path:'/account/all',
        name:'account_all',
        meta:{bread:["账户管理","所有人员"]},
        component:()=>import("../views/account/all.vue")
      },
      {
        path:'/account/business',
        name:'Business',
        meta:{bread:["账户管理","业务人员"]},
        component:()=>import("../views/account/business.vue")
      }
      ,
      {
        path:'/account/audit',
        name:'audit',
        meta:{bread:["账户管理","审核人员"]},
        component:()=>import("../views/account/audit.vue")
      },
      {
        path:'/account/risk',
        name:'risk',
        meta:{bread:["账户管理","风控经理"]},
        component:()=>import("../views/account/risk.vue")
      },
      {
        path:'/account/admin',
        name:'admin',
        meta:{bread:["账户管理","管理员"]},
        component:()=>import("../views/account/admin.vue")
      },
      {
        path:'/product/all',
        name:'product_all',
        meta:{bread:["产品管理","全部产品"],keepAlive:true},
        component:()=>import("../views/product/all.vue")
      },
      {
        path:'/product/carConsumption',
        name:'pcarConsumption',
        meta:{bread:["产品管理","汽车消费"],keepAlive:true},
        component:()=>import("../views/product/carConsumption.vue")
      },
      {
        path:'/product/estate',
        name:'estate',
        meta:{bread:["产品管理","房产消费"],keepAlive:true},
        component:()=>import("../views/product/estate.vue")
      },
      {
        path:'/product/mortgage',
        name:'mortgage',
        meta:{bread:["产品管理","抵押贷款"],keepAlive:true},
        component:()=>import("../views/product/mortgage.vue")
      },
      {
        path:'/product/detail',
        name:'product_all',
        meta:{bread:["产品管理","全部产品","产品详情"]},
        component:()=>import("../views/product/detail.vue")
      },
      {
        path:'/orders/all',
        name:'orders_all',
        meta:{bread:["订单管理","所有订单"]},
        component:()=>import("../views/orders/index.vue")
      },
      {
        path:'/orders/create',
        name:'orders_create',
        meta:{bread:["订单管理","新建订单"]},
        component:()=>import("../views/orders/create.vue")
      }
      ,
      {
        path:'/customer/detail',
        name:'customer_detail',
        meta:{bread:["客户管理","基本信息","信息详细"]},
        component:()=>import("../views/customet/detail.vue")
      },
      {
        path:'/customer/info',
        name:'customer_info',
        meta:{bread:["客户管理","基本信息"],keepAlive:true},
        component:()=>import("../views/customet/index.vue")
      },
      {
        path:'/customer/record',
        name:'customer_/record',
        meta:{bread:["客户管理","资金记录"]},
        component:()=>import("../views/customet/record.vue")
      },
      {
        path:'/todo',
        name:'todo',
        component:()=>import("../views/todo/index.vue")
      },
      {
        path:'/my',
        name:'my',
        component:()=>import("../views/my/index.vue")
      }
    ]
  },
  {
    path:"/login",
    name:'Login',
    component: ()=>import('../views/login.vue')
  },
  {
    path:'/404',
    name:'404',
    component:()=>import('../views/404.vue')
  }

]
const router = new VueRouter({
  routes
})

export default router
