<script setup>
import { onMounted, ref } from 'vue'

const culture = ref([])
onMounted(async () => {
  const s = await fetch(
    'https://autoreport.site:8888/api/collections/culture/records',
  )
  const { items } = await s.json()
  culture.value = items
})
</script>

<template>
  <div class="w-full bg-[#f7f7f7]">
    <a-tabs class="border-b border-[#e8e8e8] outline-none">
      <a-tab-pane title="企业文化">
        <div class="px-[20%]">
          <a-row :gutter="24">
            <a-col :span="10" class="pl-2.5 pr-2.5">
              <div class="relative bg-white h-[180px]">
                <div
                  class="text-[#f0f7ff] text-[80px] font-[700] absolute top-0 z-1"
                >
                  01
                </div>
                <div
                  class="text-[#294dce] text-[26px] mt-10 ml-[47px] pt-[20px] z-10 relative"
                >
                  {{ culture[0]?.ent }}
                </div>
                <div
                  class="text-[#000] text-[20px] my-[10px] mx-14 z-10 relative"
                >
                  {{ culture[0]?.title }}
                </div>
                <div
                  class="text-[#999] text-[16px] font-normal mx-14 "
                >
                  {{ culture[0]?.content }}
                </div>
              </div>
            </a-col>
            <a-col :span="10">
              <div class="relative bg-white h-[180px]">
                <div
                  class="text-[#f0f7ff] text-[80px] font-[700] absolute top-0 z-1"
                >
                  02
                </div>
                <div
                  class="text-[#294dce] text-[26px] mt-10 ml-[47px] pt-[20px] z-10 relative"
                >
                  {{ culture[1]?.ent }}
                </div>
                <div
                  class="text-[#000] text-[20px] my-[10px] mx-14 z-10 relative"
                >
                  {{ culture[1]?.title }}
                </div>
                <div
                  class="text-[#999] text-[16px] font-normal mx-14 "
                >
                  {{ culture[1]?.content }}
                </div>
              </div>
            </a-col>
            <a-col :span="4" class="pl-2.5 pr-2.5">
              <img
                alt="图片"
                class="bg-[#294dce] h-[180px] mt-10 pt-5 w-full"
                src="/JTKJ.png"
              >
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24" class="pl-2.5 pr-2.5">
              <div class="mb-10 bg-white relative h-[180px]">
                <div
                  class="text-[#f0f7ff] text-[80px] font-[700] absolute top-0 z-1"
                >
                  03
                </div>
                <div
                  class="text-[#294dce] text-[26px] mt-10 ml-[47px] pt-[20px] z-10 relative"
                >
                  {{ culture[2]?.ent }}
                </div>
                <div
                  class="text-[#000] text-[20px] my-[10px] mx-14 z-10 relative"
                >
                  {{ culture[2]?.title }}
                </div>
                <div
                  class="text-[#999] text-[16px] font-normal mx-14"
                >
                  {{ culture[2]?.content }}
                </div>
              </div>
            </a-col>
          </a-row>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<style scoped>
:deep(.arco-tabs-nav) {
  @apply h-[45px] mx-[20%];
}

:deep(.arco-tabs-tab) {
  @apply m-0 p-0;
}

:deep(.arco-tabs-tab-title) {
  @apply py-3 px-4 text-[14px] text-[#1890ff];
}

:deep(.arco-tabs-nav-tab-list) {
  @apply w-[88px] h-[45px];
}

:deep(.arco-tabs-nav-ink) {
  @apply bg-[#1890ff] w-[88px] absolute left-0 !important;
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
</style>
