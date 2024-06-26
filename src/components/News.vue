<script setup>
import { onMounted, ref } from 'vue'
import PocketBase from 'pocketbase'

const NewsListView = ref([])
const pb = new PocketBase('https://autoreport.site:8888')
onMounted(async () => {
  const records = await pb.collection('news').getFullList({})
  const data = records.map((item) => {
    const url = 'https://autoreport.site:8888/api/files/kuuapy1vhpnpuy2'
    return {
      title: item.title,
      time: item.time,
      link: item.link,
      image: `${url}/${item.id}/${item.image}`,
    }
  })
  NewsListView.value = getList(data)
})

function getList(arr) {
  let count = 0
  const itemList = []
  let path = []
  arr.forEach((item) => {
    count++
    path.push(item)
    if (path.length === 3 || count === arr.length) {
      itemList.push(path)
      path = []
    }
  })
  return itemList
}
</script>

<template>
  <div class="bg-[#F0f2f5]">
    <div class="py-[60px] mx-[20%] relative">
      <div class="text-[40px] text-[#333] font-[700]">
        新闻资讯
      </div>
      <div class="text-[26px] text-[#ccc] font-[700] mb-[60px]">
        News
      </div>
      <a-carousel
        :default-current="1"
        :style="{
          height: '480px',
        }"
        indicator-type="never"
      >
        <a-carousel-item v-for="(Item, index) in NewsListView" :key="index">
          <a-row class="newsMain" style="display: flex">
            <a-col
              v-for="(NewsItem, NewsIndex) in Item"
              :key="NewsIndex"
              :span="8"
              class="card border-l-[1px] border-[#efefef] w-full bg-white py-[42px] px-[25px]"
            >
              <img
                alt="tips"
                class="inline-block vertical-align-middle"
                src="/timing.png"
              >
              <span
                class="text-[14px] font-normal text-[#294dce] ml-4 inline-block"
              >{{ NewsItem.time.slice(0, 10) }}</span>
              <div
                class="text-ellipsis overflow-hidden w-full h-[50px] mt-[20px] mb-[30px] -webkit-box-orient:vertical -webkit-line-clamp:2 word-break:break-all"
              >
                {{ NewsItem.title }}
              </div>
              <a :href="NewsItem?.link" target="_blank">
                <a-button>了解更多</a-button>
              </a>
              <img
                :src="NewsItem.image"
                alt="图片"
                class="w-full h-48"
                style="margin-top: 40px; width: 100%"
              >
            </a-col>
          </a-row>
        </a-carousel-item>
      </a-carousel>
    </div>
  </div>
</template>

<style scoped>
@layer {
  .card:nth-child(1) {
    @apply border-none;
  }
}

:deep(.arco-carousel-arrow-left) {
  @apply bg-[#d9d9d9] absolute -left-[150px] top-[180px];
}

:deep(.arco-carousel-arrow-right) {
  @apply bg-[#d9d9d9] absolute -right-[150px] top-[180px];
}

:deep(.arco-carousel-arrow > div:hover) {
  @apply bg-[#d9d9d9];
}

:deep(.arco-icon) {
  @apply text-[#fff] w-[2em] h-[2em];
}

:deep(.arco-btn-secondary[type='button']) {
  @apply bg-white border-[1px] border-[#d9d9d9];
}

:deep(.arco-btn-secondary[type='button']:hover) {
  @apply text-[#40a9ff] border-[#40a9ff] bg-white;
}
</style>
