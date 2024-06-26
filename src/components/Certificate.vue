<script setup>
import { onMounted, ref } from 'vue'

const itemList = ref([])
onMounted(async () => {
  const s = await fetch(
    'https://autoreport.site:8888/api/collections/certificate/records',
  )
  const url = 'https://autoreport.site:8888/api/files/jixbw3lox0vzbo8'
  const { items } = await s.json()
  const list = items.map((item) => {
    return {
      id: item.id,
      title: item.title,
      img: `${url}/${item.id}/${item.image}`,
    }
  })
  getcertificate(itemList, list)
})

function getcertificate(itemList, list) {
  let path = []
  let count = 0
  list.forEach((item) => {
    count++
    path.push(item)
    if (path.length === 4 || count === list.length) {
      itemList.value.push(path)
      path = []
    }
  })
}
</script>

<template>
  <div class="relative pt-[60px]">
    <div class="px-[20%]">
      <div class="text-[40px] text-[#333] font-[500]">
        企业证书
      </div>
      <div class="text-[26px] text-[#ccc] font-[300] mb-[60px]">
        Certificate
      </div>
      <a-carousel
        :default-current="1"
        :auto-play="true"
        :autoplay-speed="2000"
        :style="{
          height: '270px',
        }"
        arrows
        indicator-type="never"
      >
        <a-carousel-item v-for="(item, index) in itemList" :key="index">
          <h3>
            <a-row :gutter="15" class="certificateRow">
              <a-col
                v-for="(certificate, certIndex) in item"
                :key="certIndex"
                :span="6"
                class="certificateCol"
              >
                <div style="text-align: center">
                  <img
                    :src="certificate.img"
                    class="h-[90%] w-[60%] my-0 mx-auto"
                  >
                  <div
                    class="text-white"
                    style="text-align: center; margin-top: 25px"
                  >
                    {{ certificate.title }}
                  </div>
                </div>
              </a-col>
            </a-row>
          </h3>
        </a-carousel-item>
      </a-carousel>
    </div>
    <div class="h-[220px] absolute w-full top-[280px] z-10">
      <svg height="100%" width="100%">
        <ellipse cx="50%" cy="276" rx="51%" ry="125%" style="fill: #294dce" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
:deep(.arco-carousel) {
  @apply relative z-50;
}

:deep(.arco-carousel-arrow-left) {
  @apply bg-[#d9d9d9] absolute -left-[150px] top-[100px];
}

:deep(.arco-carousel-arrow-right) {
  @apply bg-[#d9d9d9] absolute -right-[150px] top-[100px];
}

:deep(.arco-carousel-arrow > div:hover) {
  @apply bg-[#d9d9d9];
}
</style>
