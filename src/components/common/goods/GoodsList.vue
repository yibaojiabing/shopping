<template>
  <div id="goods-list">
        <goods-list-item v-for="(item,index) in goods" :key="index" :goods-item="item"/>
    </div>
</template>
<script>
import GoodsListItem from './GoodsListItem'
export default{
  name: 'GoodsList',
  props: {
    goods:{
      type: Array,
      default(){
        return []
      }
    }
  },
  components: {
    GoodsListItem
  }
}
</script>
<style>
#goods-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        background-color: white;

        padding: 2px;
    }
</style>