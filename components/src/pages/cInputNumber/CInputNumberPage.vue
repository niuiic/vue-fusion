<!-- % script % -->
<script setup lang="ts">
import { ref } from 'vue'
import { CInputNumber } from '@/components/cInputNumber'

const number = ref(1)
const inputNumberRef = ref()
</script>

<!-- % template % -->
<template>
  <div class="c-input-number-page">
    <p>
      props、emits和slots的使用方式与ElInputNumber完全一致，仅调用方法时需要使用cInputNumberRef.value.getInstance()来获取ElInputNumber实例。
    </p>
    <CInputNumber ref="inputNumberRef" v-model="number" :min="1" :max="10" placeholder="请输入数字" />
    <iframe class="doc" src="https://element-plus.org/en-US/component/input-number.html" />
  </div>
</template>

<!-- % style % -->
<style lang="scss" scoped>
.c-input-number-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fff;
}

.doc {
  flex: 1;
}
</style>