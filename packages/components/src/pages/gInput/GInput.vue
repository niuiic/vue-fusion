<!-- # script -->
<script setup lang="ts">
import { XInput } from '@/components/xInput'
import { ref } from 'vue'

const data = ref()
</script>

<!-- # template -->
<template>
  <div class="x-input-page">
    <XInput v-model="data" type="number"></XInput>
    {{ data }}
  </div>
</template>
