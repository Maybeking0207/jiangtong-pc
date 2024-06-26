<script setup>
import { onMounted, ref } from 'vue'
import PocketBase from 'pocketbase'

const activeKeyList = ref(0)
const projectList = ref([])
onMounted(async () => {
  const pb = new PocketBase('https://autoreport.site:8888')
  const data = await pb
    .collection('project')
    .getFullList({ expand: 'cardList.card' })
  projectList.value = data.map((item) => {
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
})
</script>

<template>
  <div class="relative w-full h-[700px] overflow-hidden bg-project">
    <div class="pt-[60px] px-[20%] font-[900] text-[40px] text-white">
      项目案例
    </div>
    <div class="px-[20%] text-[26px] text-[#cccccc]">
      Project Cases
    </div>
    <a-tabs v-model:activeKey="activeKeyList" position="left">
      <a-tab-pane
        v-for="(projectItem, projectIndex) in projectList"
        :key="projectIndex"
        :title="projectItem.tab"
      >
        <h2 class="text-[#fff] font-[700] mb-[0.5em] mt-0 text-[24px]">
          {{ projectItem.cardList[0].title }}
        </h2>
        <h3 class="text-[#fff] font-[300] mb-[0.5em] mt-0 text-[18px]">
          {{ projectItem.cardList[0].value }}
        </h3>
        <a-row :gutter="[30, 30]" style="margin-top: 47px; color: #ffffff">
          <a-col
            v-for="(projectItemSon, projectItemSonIndex) in projectItem
              .cardList[0].card"
            :key="projectItemSonIndex"
            :span="12"
          >
            <div
              class="h-[130px] pt-[15px] pr-[15px] pb-[20px] pl-[17px] border border-[#ffffff]"
            >
              <div>
                {{ projectItemSon.background }}
              </div>
              <div class="textbox">
                {{ projectItemSon.data }}
              </div>
            </div>
          </a-col>
        </a-row>
      </a-tab-pane>
    </a-tabs>
    <button
      class="w-[120px] h-[40px] absolute top-[90%] left-[24%] bg-[#4a515e] outline-0 border-0 border-radius-unset text-[#fff]"
    >
      <a href="/case">查看更多 →</a>
    </button>
  </div>
</template>

<style scoped>
:deep(.arco-tabs) {
  @apply my-[40px] mx-[20%] h-full bg-[#191f2c] opacity-[0.8];
}

:deep(.arco-tabs-nav-tab) {
  @apply text-[#fff] mb-[10px] w-[280px] pt-[28px] pr-[30px] pl-[20px];
}

:deep(.arco-tabs .arco-tabs-tab) {
  @apply text-left text-[#fff] px-[24px] py-[8px] mb-[16px];
}

:deep(.arco-tabs-tab:hover) {
  @apply text-[#294dce];
}

:deep(.arco-tabs-tab-active) {
  @apply bg-[#294dce] text-[#fff] h-[50px] leading-[50px] !important;
}

:deep(.arco-tabs-pane) {
  @apply pl-[48px];
}

:deep(.arco-tabs-content) {
  @apply h-full py-[41px] px-[64px] bg-right !important;
}

.bg-project {
  @apply bg-[url('/projectCases-background.png')];
}

.textbox {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
</style>
