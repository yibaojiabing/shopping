<template>
    <div id="classifyContent">
        
            <div class="right">
                <scroll class="content-c" ref="scroll">
                <div :column-num="2" >
                    <div class="item" v-for="(item,index) in contentList" :key="index"
                                   @click.native="gotoLink(item.link)">
                        <div class="title-content">{{item.title}}</div>
                        <img :src="item.image" class="img-content" @load="imageLoad"/>
                        
                    </div>
                </div>
                </scroll>
            </div>
        
    </div>
</template>

<script>
    import Scroll from "components/common/scroll/Scroll";
    // import Vue from 'vue';
    // import {Grid, GridItem} from 'vant';

    // Vue.use(Grid);
    // Vue.use(GridItem);
    export default {
        name: "ClassifyContent",
        props: {
            contentList: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                imageNumber: 0,
            }
        },
        methods: {
            imageLoad() {
                if (++this.imageNumber == this.contentList.length) {
                    this.$refs.scroll.refresh();
                }
            },
            gotoLink(link) {
                window.location.href = link
            }
        },
        components: {
            Scroll
        },
        mounted() {
            this.$nextTick(function () {
                // this.$on('backTop', function () {
                //     this.$refs.scroll.scrollTo(0, 0, 0)
                // })
            })
        }
    }
</script>

<style scoped>
    .right {
        width: 100%;
        display: flex;
    }

    .content-c {
        overflow: hidden;
        height: calc(100vh - 97px);
    }
    .item{
        height: 180px;
        width: 180px;
        margin-top: 24px;
    }
    .img-content {
        width: 100%;
    }

    .title-content {
        text-align: center;
        font-size: 18px;
        /* margin-top: 10px; */
    }
</style>