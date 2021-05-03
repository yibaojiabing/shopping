<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <template v-slot:center>购物车（{{length}}）</template>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list></cart-list>
    <!-- 底部汇总 -->
    <cart-botton-bar></cart-botton-bar>
  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComponents/CartList'
import CartBottonBar from './childComponents/CartBottonBar'
import { mapGetters } from 'vuex'
export default{
  name:"ShopCart",
  components: {
    NavBar,
    CartList,
    CartBottonBar
  },
  computed:{
    
    ...mapGetters({
      length: 'cartLength',
      list: 'cartList'
    })
  }
}
</script>
<style scoped>
  .cart{
    height: 100vh;
  }
 .nav-bar{
   background-color: pink;
   color: #fff;
 }
</style>