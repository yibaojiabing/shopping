<template>
    <div v-if="Object.keys(detailInfo).length !== 0" class="goods_info">
      <div class="info-desc clear-fix">
        <div class="start"></div>
        <div class="desc">{{detailInfo.desc}}</div>
        <div class="end"></div>
      </div>
      <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
      <div class="info-list">
        <img  v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" :src="item" @load="imgLoad" alt="">
      </div>
      
    </div>
</template>

<script>
    export default {
        props: {
            detailInfo: {
                type: Object,
                default() {
                    return {};
                },
            },
        },
        data() {
            return {
                counter: 0,
                imageLength: 0,
            };
        },
        methods: {
            imgLoad() {
                // 每一次图片加载完成就让 imageNumber加一 当imageNumber和图片数量一致时发送事件
                if (++this.counter === this.imageLength) {
                    // 图片加载完发送请求到父组件
                    this.$emit("detailImagesLoad");
                }
            }
        },
        watch: {
            detailInfo() {
              //获取图片个数
                this.imageNumber = this.detailInfo.detailImage[0].list.length
            }

        }
    };
</script>

<style scoped>
    .desc {
        padding: 15px;
        font-size: 12px;
    }

    .detail {
        margin-bottom: 20px;
    }

    .info-key{
        font-size: 24px;
        padding-left: 15px;
        margin-bottom: 15px;
    }

    .info-list img {
        width: 100%;
        vertical-align: middle;
    }
</style>