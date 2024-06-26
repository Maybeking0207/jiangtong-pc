<script setup>
import { onMounted, ref } from 'vue'

const server = ref([])
onMounted(async () => {
  const url = 'https://autoreport.site:8888/api/files/bg994jz79bh5rhp'
  const list = await fetch(
    'https://autoreport.site:8888/api/collections/servers/records',
  )
  const { items } = await list.json()
  server.value = items.map((item) => {
    return {
      tabs: item.tabs,
      img: `${url}/${item.id}/${item.img}`,
      id: item.id,
      summarize: item.summarize,
      content: item.content,
    }
  })
  const content = await fetch(
    'https://autoreport.site:8888/api/collections/content/records',
  )
  const { items: contentItems } = await content.json()
  contentItems.forEach((item, index) => {
    contentItems[
      index
    ].img = `https://autoreport.site:8888/api/files/zumwf6ituvjyvjn/${item.id}/${item.img}`
  })
  contentItems.forEach((item) => {
    server.value.forEach((serverItem) => {
      serverItem.content.forEach((contentItem, index) => {
        if (contentItem === item.id)
          serverItem.content[index] = item
      })
    })
  })
})
const getParams = (id) => {
  return `/solution?id=${id}`
}
</script>

<template>
  <div class="w-full bg-[#f7f7f7] mt-[60px]">
    <a-tabs>
      <a-tab-pane
        v-for="(item, index) in server"
        :key="index + 1"
        :title="item.tabs"
      >
        <div class="relative mt-0.5 -mr-[5px] -mb-[5px] -ml-[5px]">
          <div class="w-1/3 float-left relative">
            <a :href="getParams(index)">
              <div class="pointer w-full py-[67px] px-[30px] overflow-hidden">
                <img
                  :src="item.img"
                  alt="图片"
                  class="w-[97%] h-[380px] absolute top-[2px] left-[4px] vertical-align-middle"
                >
                <div class="z-[1000] text-white relative text-[18px] font-bold">
                  概述：
                </div>
                <div
                  class="bg-white h-[3px] w-[30px] mt-[10px] z-[1000] relative"
                />
                <div
                  class="w-full text-[16px] mt-[20px] font-normal text-white relative z-[999] -webkit-line-clamp(10) word-break-all text-overflow-ellipsis"
                >
                  {{ item.summarize }}
                </div>
              </div>
              <div
                class="h-[380px] w-[97.8%] bg-gradient-to-tr from-blue-700 via-blue-700 to-blue-50 opacity-50 absolute top-0 left-[2px] z-10"
              />
            </a>
          </div>
          <div class="w-2/3 float-left relative">
            <div class="relative -m-[5px]">
              <div class="w-full p-[5px] left relative">
                <a :href="getParams(index)">
                  <div v-if="item.content.length === 2">
                    <div class="relative">
                      <div
                        class="relative mb-2 h-[185px] w-full -webkit-box-orient:vertical -webkit-line-clamp(3) overflow-hidden py-[36px] px-[30px] text-ellipsis word-break-all"
                      >
                        <img
                          :src="item.content[0].img"
                          alt="图片"
                          class="h-[185px] w-full absolute top-[2px] left-[4px]"
                        >
                        <div
                          class="text-white text-[18px] font-bold relative z-50"
                        >
                          {{ item.content[0].title }}
                        </div>
                        <div
                          class="bg-white h-[3px] mt-2.5 relative w-[30px] z-50"
                        />
                        <div
                          class="w-full word-break-all text-[16px] font-normal text-white relative z-50 mt-5 textbox"
                        >
                          {{ item.content[0].content }}
                        </div>
                      </div>
                      <div
                        class="h-[185px] w-full bg-gradient-to-tr from-blue-700 via-blue-700 to-blue-50 opacity-50 absolute top-[2px] left-[2px] z-10"
                      />
                    </div>
                    <div class="relative">
                      <div
                        class="relative mb-2 h-[185px] w-full -webkit-box-orient:vertical -webkit-line-clamp(3) overflow-hidden py-[36px] px-[30px] text-ellipsis word-break-all"
                      >
                        <img
                          :src="item.content[1].img"
                          alt="图片"
                          class="h-[185px] w-full absolute top-[2px] left-[4px]"
                        >
                        <div
                          class="text-white text-[18px] font-bold relative z-50"
                        >
                          {{ item.content[1].title }}
                        </div>
                        <div
                          class="bg-white h-[3px] mt-2.5 relative w-[30px] z-50"
                        />
                        <div
                          class="w-full word-break-all text-[16px] font-normal text-white relative z-50 mt-5 textbox"
                        >
                          {{ item.content[1].content }}
                        </div>
                      </div>
                      <div
                        class="h-[185px] w-full bg-gradient-to-tr from-blue-700 via-blue-700 to-blue-50 opacity-50 absolute top-[2px] left-[2px] z-10"
                      />
                    </div>
                  </div>
                  <div v-else>
                    <div class="relative">
                      <a-row :gutter="24" class="mb-2">
                        <a-col :span="10" style="padding-right: 0">
                          <div
                            class="relative h-[185px] w-full -webkit-box-orient:vertical -webkit-line-clamp(3) overflow-hidden py-[36px] px-[30px] text-ellipsis word-break-all"
                          >
                            <img
                              :src="item.content[0].img"
                              alt="图片"
                              class="h-[185px] w-full absolute top-[2px] left-[4px]"
                            >
                            <div
                              class="text-white text-[18px] font-bold relative z-50"
                            >
                              {{ item.content[0].title }}
                            </div>
                            <div
                              class="bg-white h-[3px] mt-2.5 relative w-[30px] z-50"
                            />
                            <div
                              class="w-full word-break-all text-[16px] font-normal text-white relative z-50 mt-5 textbox"
                            >
                              {{ item.content[0].content }}
                            </div>
                          </div>
                        </a-col>
                        <a-col :span="14" style="padding-left: 0">
                          <div
                            class="relative h-[185px] w-full py-[36px] px-[30px] text-ellipsis word-break-all"
                          >
                            <img
                              :src="item.content[1].img"
                              alt="图片"
                              class="h-[185px] w-full absolute top-[2px] left-0"
                            >
                            <div
                              class="text-white text-[18px] font-bold relative z-50"
                            >
                              {{ item.content[1].title }}
                            </div>
                            <div
                              class="bg-white h-[3px] mt-2.5 relative w-[30px] z-50"
                            />
                            <div
                              class="w-full word-break-all text-[16px] font-normal text-white relative z-50 mt-5 textbox"
                            >
                              {{ item.content[1].content }}
                            </div>
                          </div>
                        </a-col>
                      </a-row>
                      <div
                        class="h-[185px] w-full bg-gradient-to-tr from-blue-700 via-blue-700 to-blue-50 opacity-50 absolute top-[2px] left-[2px] z-10"
                      />
                    </div>
                    <div class="relative">
                      <a-row :gutter="24">
                        <a-col :span="24">
                          <div
                            class="relative h-[185px] w-full -webkit-box-orient:vertical -webkit-line-clamp(3) overflow-hidden py-[36px] px-[30px] text-ellipsis word-break-all"
                          >
                            <img
                              :src="item.content[2].img"
                              alt="图片"
                              class="h-[185px] w-full absolute top-[2px] left-[4px]"
                            >
                            <div
                              class="text-white text-[18px] font-bold relative z-50"
                            >
                              {{ item.content[2].title }}
                            </div>
                            <div
                              class="bg-white h-[3px] mt-2.5 relative w-[30px] z-50"
                            />
                            <div
                              class="w-full word-break-all text-[16px] font-normal text-white relative z-50 mt-5"
                            >
                              {{ item.content[2].content }}
                            </div>
                          </div>
                        </a-col>
                      </a-row>
                      <div
                        class="h-[185px] w-full bg-gradient-to-tr from-blue-700 via-blue-700 to-blue-50 opacity-50 absolute top-[2px] left-[2px] z-10"
                      />
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<style scoped>
:deep(.arco-tabs-nav) {
  @apply h-[60px];
}

:deep(.arco-tabs-nav::before) {
  @apply hidden;
}

:deep(.arco-tabs-tab) {
  @apply text-[16px];
}

:deep(.arco-tabs-nav-tab-list) {
  @apply w-full text-center !important;
}

:deep(.arco-tabs-nav-ink) {
  @apply bg-[#1890ff];
}

:deep(
    .arco-tabs-nav-type-line .arco-tabs-tab:hover .arco-tabs-tab-title::before
  ) {
  @apply bg-[#f7f7f7];
}

:deep(.arco-tabs-tab:hover) {
  @apply text-[#1890ff];
}

:deep(.arco-tabs-tab .arco-tabs-tab-active) {
  @apply text-[#1890ff];
}

:deep(.arco-tabs-content) {
  @apply bg-[#F0F2F5] p-0;
}

.textbox {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
