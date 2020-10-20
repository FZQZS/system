import axios from 'axios'
import { getToken } from './auth';
import { Message } from 'element-ui';
const service = axios.create({
    baseURL: 'localhost:8080',
    timeout: 5000,
  });
//请求拦截
service.interceptors.request.use(function(config){
 //console.log(1,config)
   if(getToken()){//如果本地有token就执行
    config.headers['token']=getToken()
   }
   return config
},function(error){
  return Promise.reject(error)
}
)

//响应拦截
service.interceptors.response.use((response)=>{
  //console.log("这里是响应拦截",response)
  const res = response.data
  if(!res.success){
    // Message.success(res.message)
    Message({
      type:'error',
      message:res.message ||'请求错误'
    })
    return Promise.reject(new Error(res.message ||'请求错误'))
  }else{
    return response
  }

  // const res = response.data
  // if(res.success){
  //   Message({
  //         type:'success',
  //         message:res.message ||'请求错误'
  //       })
  //       return response
  // }else{
  //   return Promise.reject(new Error(res.message ||'请求错误'));
  // }
},(error)=>{
  // 对响应错误做点什么
  Message({
    message:error.message,
    type:'error'
  })
  return Promise.reject(error);
}
)
export default service
