<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <!-- <li v-for="item in cartList">{{item}}</li> -->
      <cart-list-item v-for="(item,index) in cartList" :product='item' :key="index">{{item}}</cart-list-item>
    </scroll>
  </div>
</template>
<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'
import {mapGetters} from 'vuex'
export default{
  components:{
    Scroll,
    CartListItem
  },
  computed:{
    ...mapGetters(['cartList'])
  },
  activated(){
    this.$refs.scroll.refresh()
  }
}
</script>
<style scoped>
.cart-list{
  height: calc(100% - 49px - 44px - 40px);
}
.content{
  height: 100%;
  overflow: hidden;
}
</style>