<!-- # script -->
<script setup lang="ts">
import { GInput } from '@/components/gInput'
import { ref } from 'vue'

const data = ref()
</script>

<!-- # template -->
<template>
  <div class="g-input-page">
    <GInput v-model="data" type="number"></GInput>
    {{ data }}
  </div>
</template>
