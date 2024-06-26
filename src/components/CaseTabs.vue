<script setup>
import { onMounted, ref } from 'vue'
import PocketBase from 'pocketbase'

const tabsList = ref([])
const tabIndex = ref(0)
onMounted(async () => {
  const pb = new PocketBase('https://autoreport.site:8888')
  const data = await pb
    .collection('project')
    .getFullList({ expand: 'cardList.card' })
  tabsList.value = data.map((item) => {
    return {
      tab: item.tab,
      cardList: item.expand.cardList.map((card) => {
        const url = 'https://autoreport.site:8888/api/files/66ahek2wcveg7nl'
        return {
          title: card.title,
          value: card.value,
          img: `${url}/${card.id}/${card.img}`,
          card: card.expand.card,
        }
      }),
    }
  })
  if(window.location.href.includes('?') === true){
    tabIndex.value = +window.location.href.split('?')[1].split("=")[1]
  }
  console.log(tabIndex.value)
})
const changeTab = (index) => {
  tabIndex.value = index
}
</script>

<template>
  <div class="w-full">
    <a-tabs :active-key="tabIndex" :default-active-key="tabIndex" @change="changeTab">
      <a-tab-pane
        v-for="(item, index) in tabsList"
        :key="index"
        :title="item.tab"
      >
        <div
          v-for="(cardItem, cardIndex) in item.cardList"
          :key="cardIndex"
          class="flex my-[30px]"
        >
          <img :src="cardItem.img" style="width: 300px">
          <div class="p-[30px] w-full bg-white">
            <div class="flex items-center mb-4">
              <h2 class="text-[26px] text-[#333]">
                {{ cardItem.title }}
              </h2>
              <h5 class="ml-5 font-normal text-[18px] text-[#747474]">
                {{ cardItem.value }}
              </h5>
            </div>
            <a-row :gutter="[20, 20]">
              <a-col
                v-for="(cardCardItem, cardCardIndex) in cardItem.card"
                :key="cardCardIndex"
                :span="12"
              >
                <div
                  class="border-[1px] border-[#e8e8e8] pt-[14px] pr-5 pb-2.5 pl-2.5 h-[90px]"
                >
                  <span class="overflow-hidden text-ellipsis textbox">
                    <span class="text-[#447bf3] p-1">{{
                      cardCardItem.background
                    }}</span>
                    {{ cardCardItem.data }}
                  </span>
                </div>
              </a-col>
            </a-row>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<style scoped>
:deep(.arco-tabs-nav) {
  @apply h-[80px] mx-[20%];
}

:deep(.arco-tabs-nav::before) {
  @apply hidden;
}

:deep(.arco-tabs-tab) {
  @apply mt-[13px] pb-[25px] text-[20px];
}

:deep(.arco-tabs-nav-ink) {
  @apply bg-[#1890ff];
}

:deep(
    .arco-tabs-nav-type-line .arco-tabs-tab:hover .arco-tabs-tab-title::before
  ) {
  @apply bg-white;
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

:deep(.arco-tabs-content-item) {
  @apply px-[20%] mt-[30px];
}

.textbox {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
