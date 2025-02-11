<!-- % script % -->
<script setup lang="ts">
import { ref } from 'vue'
import { CInput } from '@/components/cInput'

const name = ref()
const inputRef = ref()
</script>

<!-- % template % -->
<template>
  <div class="c-input-page">
    <p>
      props、emits和slots的使用方式与ElInput完全一致，仅调用方法时需要使用cInputRef.value.getInstance()来获取ElInput实例。
    </p>
    <CInput ref="inputRef" v-model="name" placeholder="请输入姓名" />
    <iframe class="doc" src="https://element-plus.org/en-US/component/input.html" />
  </div>
</template>

<!-- % style % -->
<style lang="scss" scoped>
.c-input-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fff;
}

.doc {
  flex: 1;
}
</style>
