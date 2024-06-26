<script setup>
import { ref } from 'vue'
import { Message } from '@arco-design/web-vue'
import PocketBase from 'pocketbase';
const pb = new PocketBase('https://autoreport.site:8888')
const messageValue = ref({
  name: '',
  content: '',
  phone: '',
})

const submitClick = async() =>  {
  if (messageValue.value.name === '')
    Message.info('请输入姓名')

  if (messageValue.value.phone === '')
    Message.info('请输入电话')

  if (messageValue.value.name !== '' && messageValue.value.phone !== '') {
    await pb.collection('message').create(messageValue.value).then((res) => {
      Message.success('您的留言我们已经收到')
      messageValue.value = {
        name: '',
        content: '',
        phone: '',
      }
    })
  }
}
</script>

<template>
  <div class="w-full h-[570px] bg-[#1f242b] relative">
    <div class="py-[60px] px-[20%] h-[480px]">
      <div class="text-[40px] text-white mb-[0.5em]">
        联系我们
      </div>

      <div class="text-[26px] text-[#ccc] mb-[0.5em]">
        Contact Us
      </div>

      <a-row :gutter="24">
        <a-col :span="16">
          <a-row>
            <a-col :span="12">
              <input
                v-model="messageValue.name"
                class="w-[90%] h-[50px] bg-[#2f3640] list-none border-0 outline-none p-[10px] text-white" name="name"
                placeholder="请输入姓名"
              >
              <input
                v-model="messageValue.phone"
                class="w-[90%] h-[50px] bg-[#2f3640] list-none border-0 outline-none mt-[20px] p-[10px] text-white"
                name="phone" placeholder="请输入手机号"
              >
            </a-col>
            <a-col :span="12">
              <textarea
                v-model="messageValue.content"
                class="w-[90%] h-[120px] bg-[#2f3640] list-none border-0 outline-none p-[20px] text-white align-top"
                name="message" placeholder="请输入留言内容"
              />
            </a-col>
            <a-button class="text-white mt-[54px] text-[18px] w-[140px] h-[46px]" type="primary" @click="submitClick">
              提交
            </a-button>
          </a-row>
        </a-col>
        <a-col :span="8" style="color: white; padding-left: 0; padding-right: 0">
          <div class="text-[16px] text-white font-[500] mb-[0.5em] mt-0">
            上海疆通科技有限公司
          </div>
          <div class="text-[#ccc] text-[16px] font-[500] mb-[0.5em] mt-0">
            邮箱：sales@jungt.com
          </div>
          <div>
            <img alt="二维码" src="/WeChat-official-account.png" style="width: 110px; height: 110px">
            <div
              style="
                text-align: center;
                width: 110px;
                margin-top: 6px;
                color: #ffffff;
              "
            >
              官方公众号
            </div>
          </div>
        </a-col>
      </a-row>
    </div>

    <footer
      class="w-full flex justify-center items-center mt-[30px] bg-[#1f242b] text-white h-[60px] leading-[60px] border-t-[1px] border-[#292d34]"
    >
      上海疆通科技有限公司版权所有
      <a href="https://beian.miit.gov.cn/" style="list-style: none; text-decoration: none; color: purple">沪ICP备</a>
      18029365号
    </footer>
  </div>
</template>

<style scoped>
:deep(.arco-btn-size-medium) {
  @apply text-white mt-[54px] text-[18px] w-[140px] h-[46px];
}
</style>
