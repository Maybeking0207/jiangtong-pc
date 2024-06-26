<script setup>
import { onMounted, ref } from 'vue'
import PocketBase from 'pocketbase'

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
})
const dataList = ref({})
onMounted(async () => {
  const pb = new PocketBase('https://autoreport.site:8888')
  const record = await pb.collection('content').getOne(props.id, {
    expand: 'prescriptionList.prescriptionDescList',
  })
  const data = record.expand.prescriptionList.map((item) => {
    return {
      title: item.title,
      titleEn: item.titleEn,
      prescriptionDescList: item.expand.prescriptionDescList.map((pres) => {
        const url = 'https://autoreport.site:8888/api/files/d3yhb0cn81chf8q'
        return {
          icon: `${url}/${pres.id}/${pres.icon}`,
          descTitle: pres.descTitle,
          msg: pres.msg,
          tab:pres.tab,
        }
      }),
    }
  })
  dataList.value = {
    title: record.title,
    content: record.content,
    prescriptionList: data,
  }
})
const getParams = (id) =>{
  return `/case?id=${id}`
}
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
          {{ dataList?.title }}
        </h5>
        <div class="bg-white h-[4px] w-[34px]" />
        <h6 class="text-white text-[18px] font-normal mt-[23px] w-[850px]">
          {{ dataList?.content }}
        </h6>
      </div>
    </div>
    <div
      v-if="dataList.prescriptionList"
      class="bg-white px-[20%] h-[480px] pt-[40px]"
    >
      <div class="text-[40px] text-[#333] font-[500]">
        {{ dataList.prescriptionList[0].title }}
      </div>
      <div class="text-[26px] text-[#ccc] font-[300] mb-[40px]">
        {{ dataList.prescriptionList[0].titleEn }}
      </div>
      <div class="flex relative -ml-1 -mr-1">
        <div
          v-for="(list, listIndex) in dataList.prescriptionList[0]
            .prescriptionDescList"
          :key="listIndex"
          class="amini pl-1 pr-1 w-1/3"
        >
          <div
            class="bg-white border-[1px] border-[#ededed] flex h-[180px] w-full"
          >
            <img
              :src="list.icon"
              alt="图片"
              class="h-full pt-10 pr-[10px] pb-[50px] pl-[10px]"
            >
            <div>
              <h2
                class="text-[#333] text-[18px] mt-[14px] overflow-hidden text-ellipsis pr-[10px] word-break-break-all -webkit-box-orient:vertical -webkit-line-clamp:1"
              >
                {{ list.descTitle }}
              </h2>
              <h5
                class="text-[#999] textbox leading-[22px] font-normal text-[16px] pr-[20px]"
              >
                {{ list.msg }}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="dataList.prescriptionList"
      class="bg-[#f5f5f5] px-[20%] py-[40px] h-[480px]"
    >
      <div class="text-[40px] text-[#333] font-[500]">
        {{ dataList.prescriptionList[1].title }}
      </div>
      <div class="text-[26px] text-[#ccc] font-[300] mb-[60px]">
        {{ dataList.prescriptionList[1].titleEn }}
      </div>
      <div class="flex relative -ml-1 -mr-1">
        <div
          v-for="(list, listIndex) in dataList.prescriptionList[1]
            .prescriptionDescList"
          :key="listIndex"
          class="amini pl-1 pr-1 w-1/3"
        >
          <div
            class="bg-white border-[1px] border-[#ededed] flex h-[180px] w-full"
          >
            <img
              :src="list.icon"
              alt="图片"
              class="h-full pt-10 pr-[10px] pb-[50px] pl-[10px]"
            >
            <div>
              <h2
                class="text-[#333] text-[18px] mt-[14px] overflow-hidden text-ellipsis pr-[10px] word-break-break-all -webkit-box-orient:vertical -webkit-line-clamp:1"
              >
                {{ list.descTitle }}
              </h2>
              <h5
                class="text-[#999] textbox leading-[22px] font-normal text-[16px] overflow-hidden text-ellipsis pr-[20px] word-break-break-all -webkit-box-orient:vertical -webkit-line-clamp:5"
              >
                {{ list.msg }}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="dataList.prescriptionList"
      class="bg-white px-[20%] py-[40px] h-[480px]"
    >
      <div class="text-[40px] text-[#333] font-[500]">
        {{ dataList.prescriptionList[2].title }}
      </div>
      <div class="text-[26px] text-[#ccc] font-[300] mb-[60px]">
        {{ dataList.prescriptionList[2].titleEn }}
      </div>
      <div class="flex relative -ml-1 -mr-1">
        <div
          v-for="(list, listIndex) in dataList.prescriptionList[2]
            .prescriptionDescList"
          :key="listIndex"
          class="amini pl-1 pr-1 w-1/3"
        >
          <div
            class="bg-white border-[1px] border-[#ededed] flex h-[180px] w-full"
          >
            <img
              :src="list.icon"
              alt="图片"
              class="h-full pt-10 pr-[10px] pb-[50px] pl-[10px]"
            >
            <div>
              <h2
                class="text-[#333] text-[18px] mt-[14px] overflow-hidden text-ellipsis pr-[10px] word-break-break-all -webkit-box-orient:vertical -webkit-line-clamp:1"
              >
                {{ list.descTitle }}
              </h2>
              <h5
                class="text-[#999] textbox leading-[22px] font-normal text-[16px] overflow-hidden text-ellipsis pr-[20px] word-break-break-all -webkit-box-orient:vertical -webkit-line-clamp:5"
              >
                {{ list.msg }}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="dataList.prescriptionList && dataList.prescriptionList.length === 4"
      class="bg-white px-[20%] py-[40px]"
    >
      <div class="text-[40px] text-[#333] font-[500]">
        {{ dataList.prescriptionList[3].title }}
      </div>
      <div class="text-[26px] text-[#ccc] font-[300] mb-[60px]">
        {{ dataList.prescriptionList[3].titleEn }}
      </div>
      <div class="flex flex-wrap relative -ml-1 -mr-1">
        <div
          v-for="(list, listIndex) in dataList.prescriptionList[3]
            .prescriptionDescList"
          :key="listIndex"
          class=" pl-1 pr-1 mb-10 w-1/3 h-[220px]"
        >
        <a :href="getParams(list.tab)">
          <div
            class="bg-white border-[1px] border-[#ededed] w-full"
          >
            <img
              :src="list.icon"
              alt="图片"
              class="w-full h-[180px]"
            >
            <div class="flex justify-between bg-gray-100 px-4 py-2">
              <h2
                class="text-[#333] text-[16px] mt-[14px] truncate"
              >
                {{ list.descTitle }}
              </h2>
            </div>
          </div>
        </a>
        </div>
      </div>
    </div>
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
  @apply bg-white p-0;
}

:deep(.arco-tabs-content-item) {
  @apply mt-[30px];
}

.textbox {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
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
