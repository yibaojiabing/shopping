import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
// import vueRouter from 'vue-router'
import Vue from 'vue'
const Home = () => import('../Views/home/Home.vue')
const Classify = () => import('../Views/category/Classify.vue')
const ShopCar = () => import('../Views/shopcar/ShopCar.vue')
const Profile = () => import('../Views/profile/Profile.vue')
const Detail = () => import('../Views/detail/Detail')

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path:'/home',
    component: Home
  },
  {
    path: '/category',
    component: Classify
  },
  {
    path: '/shopcar',
    component: ShopCar
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]

const router = createRouter({
  //vue-router模式：history（url里没有#）
  //另一种模式  这种端口号后有#连接
  // history:createWebHashHistory(),
  history: createWebHistory(),
  routes,
  
})

export default router
