<script setup>
import { onMounted, ref } from 'vue'
import PocketBase from 'pocketbase'
const title = ref('')
const dataList = ref([])
const tabIndex = ref(0)
function getUrl(id) {
  return `/solution/${id}`
}
function changeTitle(index) {
  title.value = dataList.value[index].summarize
  tabIndex.value = index
}
onMounted(async () => {
  const pb = new PocketBase('https://autoreport.site:8888')
  const data = await pb
    .collection('servers')
    .getFullList({ expand: 'content' })
  dataList.value = data.map((item) => {
    return {
      tabs: item.tabs,
      summarize: item.summarize,
      content: item.expand.content.map((con) => {
        const url = 'https://autoreport.site:8888/api/files/zumwf6ituvjyvjn'
        return {
          id: con.id,
          title: con.title,
          content: con.content,
          img: `${url}/${con.id}/${con.img}`,
        }
      }),
    }
  })
  if(window.location.href.includes('?') === true){
    tabIndex.value = +window.location.href.split('?')[1].split("=")[1]
  }
  title.value = dataList.value[tabIndex.value].summarize
})
</script>

<template>
  <div class="w-full">
    <div class="relative">
      <img
        alt="logo"
        class="w-full vertical-align-middle"
        src="/solution-logo.png"
      >
      <div class="absolute top-0 pt-[2%] pl-[20%]">
        <h5 class="text-white text-[50px] mb-[20px] mt-0">
          解决方案
        </h5>
        <div class="bg-white h-[4px] w-[34px]" />
        <h6 class="text-white text-[18px] font-normal mt-[23px] w-[850px]">
          {{ title }}
        </h6>
      </div>
    </div>
    <a-tabs @change="changeTitle" :active-key="tabIndex" :default-active-key="tabIndex">
      <a-tab-pane
        v-for="(item, index) in dataList"
        :key="index"
        :title="item.tabs"
      >
        <div class="mx-[20%] min-h-[550px] mt-14 flex flex-wrap space-x-4">
          <div
            v-for="(itemList, indexList) in item.content"
            :key="indexList"
            class="mb-10 w-[370px] h-[320px] bg-[#f6f7f8] hover:shadow"
          >
            <a :href="getUrl(itemList.id)" target="_blank">
              <div class="w-full h-[140px]">
                <img
                  :src="itemList.img"
                  alt="图片"
                  class="w-full h-full bg-position-center bg-cover bg-no-repeat"
                >
              </div>
              <div
                class="text-[16px] font-[600] text-[#333] leading-6 mt-5 mx-8 mb-3"
              >
                {{ itemList.title }}
              </div>
              <div class="text-[14px] mx-8 leading-6 textbox">
                {{ itemList.content }}
              </div>
            </a>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<style scoped>
:deep(.arco-tabs-nav) {
  @apply mx-[20%] mt-[20px];
}

:deep(.arco-tabs-nav::before) {
  @apply hidden;
}

:deep(.arco-tabs-nav-tab-list) {
  @apply w-full flex;
}

:deep(.arco-tabs-tab) {
  @apply flex-1 h-[48px] leading-[48px] text-[14px] cursor-pointer border-[1px] border-[#d0d0d0] border-l-0 m-0 px-4 text-[#333];
}

:deep(.arco-tabs-tab-title) {
  @apply block my-0 mx-auto;
}

:deep(.arco-tabs-tab:first-child) {
  @apply border-l-[1px] border-[#d0d0d0];
}

:deep(.arco-tabs-tab-active) {
  @apply bg-[#0e57a2] text-white !important;
}

:deep(.arco-tabs-tab:hover) {
  @apply bg-white text-[#0e57a2];
}

:deep(.arco-tabs-nav-ink) {
  @apply hidden;
}

.textbox {
  -webkit-line-clamp: 5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.amini:hover {
  animation: 0.6s ease-in-out forwards;
  animation-name: animations;
  position: relative;
  z-index: 999 !important;
}

@keyframes animations {
  0% {
    z-index: 0;
  }
  100% {
    transform: scale(1.1);
    width: 480px;
    z-index: 1000;
  }
}
</style>
