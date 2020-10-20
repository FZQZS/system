import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import router from './router'
import store from './store'
import './common/style.css'
import './mock/mock'
import './router/permission'  //全局守卫配置
import echarts from 'echarts'
import moment from 'moment'


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts
Vue.prototype.$moment = moment
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
