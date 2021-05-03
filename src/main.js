import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//解决移动端点击300ms延迟
import FastClick from 'fastclick'
// import VueLazyload from 'vue-lazyload'

// Vue.prototype.$bus = new Vue()
// FastClick.attach(document.body)
createApp(App).use(store).use(router).mount('#app')
FastClick.attach(document.body)
