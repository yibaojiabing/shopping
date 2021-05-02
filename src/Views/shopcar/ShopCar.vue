<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <template v-slot:center>购物车（{{length}}）</template>
    </nav-bar>
    <cart-list></cart-list>
  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComponents/CartList'
import { mapGetters } from 'vuex'
export default{
  name:"ShopCart",
  components: {
    NavBar,
    CartList
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