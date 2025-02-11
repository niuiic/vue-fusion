<!-- % script % -->
<script setup lang="ts">
import { ref } from 'vue'
import { CSelect } from '@/components/cSelect'
import { ElOption } from 'element-plus'

const selected = ref()
const selectRef = ref()
</script>

<!-- % template % -->
<template>
  <div class="c-select-page">
    <p>
      props、emits和slots的使用方式与ElSelect完全一致，仅调用方法时需要使用cSelectRef.value.getInstance()来获取ElSelect实例。
    </p>
    <CSelect ref="selectRef" v-model="selected" placeholder="请选择选项">
      <ElOption label="选项1" value="1" />
      <ElOption label="选项2" value="2" />
      <ElOption label="选项3" value="3" />
    </CSelect>
    <iframe class="doc" src="https://element-plus.org/en-US/component/select.html" />
  </div>
</template>

<!-- % style % -->
<style lang="scss" scoped>
.c-select-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fff;
}

.doc {
  flex: 1;
}
</style>
