import router from './index'
import { getToken } from '../utils/auth'
router.beforeEach((to, from, next) => {
    if(getToken()){//当有token的时候 不允许前往login
      next(to.path!="/login")
    }else{//当没有token的时候  只能前往login
      if(to.path=="/login"){
        next()
      }else{
        //保证token被清除的时候返回login而不是空白页
        next({path:'/login'})
      }
    }

    // if(to.path!='/login'){
    //   if(!getToken()){
    //     next({path:'/login'})
    //   }else{
    //     next()
    //   }
    // }else{
    //   next()
    // }

    // if(to.path!='/login'&& !getToken()){
    //   next('/login')
    // }else if(getToken()){
    //   next(to.path!="/login")
    // }else{
    //   next()
    // }
})