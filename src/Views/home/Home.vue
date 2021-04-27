<template>
  <div id="home">
    <nav-bar class="home-color">
      <template v-slot:center><div>购物街</div></template>
    </nav-bar>
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature></feature>
      <tab-control :titles="titles"
                    @tabClick = "tabClick"
                    ref="tabControl" 
                    class="tab-control"></tab-control>
      <goods-list  :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>

  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import Feature from './childComps/Feature'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/common/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/common/backTop/BackTop'

import {getHomeMutidata,getNpsData} from '../../network/home'
export default {
  name: 'Home',
  data () {
    return {
      banners: [],
      recommends: [],
      results:{
        goods: {
          pop: {page: 0, list: []},
          sell: {page: 0, list: []},
          new: {page: 0, list: []}
        }
      },
      images: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg',
      ],
      currentType: 'pop',
      isShowBackTop: false,
      tabOffSetTop: 0,
      saveY: 0,
      titles: ['流行', '热销', '新款'],
      imgItemLoad: null
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    Feature,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  computed: {
    showGoods() {
      return this.results.goods[this.currentType].list     
    }
  },
  created () {
    this.getHomeMutidata()
    this.getNPSData('pop')
    this.getNPSData('new')
    this.getNPSData('sell')
  },
  mounted(){

  },
  methods: {
    controlScroll(position) {
      this.isShowBackTop = position.y < -1000
    },
    getHomeMutidata(){
      getHomeMutidata().then(res =>{
      this.banners = res.data.data.banner.list;
      this.recommends = res.data.data.recommend.list
    })
    },
    backTop(){
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position){
      this.isShowBackTop = (-position.y) > 1000
    },
    loadMore(){
      this.getNPSData(this.currentType)
    },
    getNPSData(type) {
      const page = this.results.goods[type].page + 1
      getNpsData(type, page).then(res => {
      this.results.goods[type].list.push(...res.data.data.list)
      this.results.goods[type].page += 1
      this.$refs.scroll.scroll.finishPullUp()
      })
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop"
          break
        case 1:
          this.currentType = "new"
          break
        case 2:
          this.currentType = "sell"
          break
      }
    }         
  },
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY)
  },
  deactivated() {
  this.saveY = this.$refs.scroll.getY()
  this.$bus.$off('imgItemLoad', this.imgItemLoad)
  }
}
</script>
<style scoped>
  #home{
    /* padding: 44px 0 0 0; */
    height: 100vh;
  }
  .home-color{
    background-color: pink;
    position: fixed;
    top: 0;
    right: 0;
    /* height: 44px; */
    left: 0;
    z-index: 10;
  }
  
  .content{
    margin-top: 44px;
    height: calc(100% - 48px);
    /* height: 300px; */
    overflow: hidden;
    
  }
</style>
