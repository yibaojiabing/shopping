<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @title-click="titleClick"></detail-nav-bar>
    <scroll class="content" @scroll="contentScroll" :probe-type="3"  ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @detail-images-load="detailImagesLoad"></detail-goods-info>
      <detail-params-info :param-info="paramInfo" ref="params"></detail-params-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommends"></goods-list>
      
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCart='addCart'></detail-bottom-bar>
  </div>
</template>
<script>
import DetailNavBar from './childComponents/DetailNavBar'
import DetailSwiper from './childComponents/DetailSwiper'
import DetailBaseInfo from './childComponents/DetailBaseInfo'
import DetailShopInfo from './childComponents/DetailShopInfo'
import DetailGoodsInfo from './childComponents/DetailGoodsInfo'
import DetailParamsInfo from './childComponents/DetailParamsInfo'
import DetailCommentInfo from './childComponents/DetailCommentInfo'
import DetailBottomBar from './childComponents/DetailBottomBar'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/common/backTop/BackTop'
import {getDetail,getDetailRecommend} from 'network/detail'
import {Goods,Shop,GoodsParam} from 'network/detail'
import GoodsList from 'components/common/goods/GoodsList'
import {debounce} from 'common/util'
import {mixinImgItemLoad} from 'common/mixin'
export default{
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop
  },
  data(){
    return{
      iid: null,
      goods: {},
      topImages: [],
      shop:{},
      detailInfo: {},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      themeTopYs: [],
      getThemeTopY: null,
      isShowBackTop: false,
      currentIndex: 0
    }
  },
  created(){
    //保存传入的iid
    this.iid = this.$route.params.iid
    //根据iid请求详情
    getDetail(this.iid).then(res =>{
      // //获取顶部的图片轮播数据
      const data = res.data.result
      this.topImages = data.itemInfo.topImages
      // //获取商品信息
      this.goods = new Goods(data.itemInfo,data.colums,data.shopInfo.services)
      //创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)
      //获取商品详细信息
      this.detailInfo = data.detailInfo
      // console.log(this.detailInfo)
      //获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      // console.log(this.paramInfo)
      //取出评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
        // console.log(this.commentInfo)
      }
      
    })

    //请求推荐数据
    getDetailRecommend().then(res => {
        this.recommends = res.data.data.list
        // console.log(this.recommends)
      })
    //给getThemeTopY赋值
    this.getThemeTopY = debounce(() =>{
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
      console.log(this.themeTopYs)
    },100)
    //是否现实回到顶部
  },
  updated(){
    
  },
  methods: {
    detailImagesLoad(){
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    titleClick(index){
      
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
      console.log(this.themeTopYs)
    },
    backTop(){
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position){
    // console.log(position)
      this.isShowBackTop = (-position.y) > 1000
    },
    addCart(){
      //获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      // console.log(product);
      
      //将商品添加到购物车
      // this.$store.state.cartList.push(product)
      // this.$store.commit('addCart',product)
      this.$store.dispatch('addCart', product)
    },
    mixins: [mixinImgItemLoad],
  },
  
}
</script>
<style scoped>
#detail{
  position: relative;
  z-index: 9;
  height: 100vh;
  background-color: #fff;
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content{
  height: calc(100% - 44px - 50px);
}
</style>