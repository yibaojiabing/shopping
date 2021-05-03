<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" 
                    :is-checked="isSelectAll"
                    @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate">
      去计算({{checkLength}})
    </div>
  </div>
</template>
<script>
import CheckButton from './CheckButton'
export default{
  components: {
    CheckButton
  },
  computed: {
    totalPrice(){
      return '￥' + this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue,item) => {
        return preValue + item.price * item.count
      },0).toFixed(2)
    },
    checkLength(){
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    isSelectAll(){
      if(this.$store.state.cartList.length === 0) return false
      return !this.$store.state.cartList.find(item => !item.checked)
    }
  },
  methods:{
    checkClick(){
      if(this.isSelectAll){//全部选中
        this.$store.state.cartList.forEach(item => item.checked = false)

      }else{//部分或全部不选中
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    }
  }
}
</script>
<style scoped>
 .bottom-bar{
   height: 40px;
   display: flex;
   background-color: #eee;
   position: relative;
   line-height: 40px;
 }
  .check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }
  .check-button{
    height: 20px;
    width: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price{
    margin-left: 25px;
    flex: 1;
  }
  .calculate{
    width: 90px;
    background: red;
    color: #fff;
    text-align: center;
  }
</style>