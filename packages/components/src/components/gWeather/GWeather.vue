<!-- %%=========================== script ===========================%% -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'

// %%--------------------------- 组件配置 ---------------------------%%
interface Props {
  city: string
}
defineProps<Props>()

// %%--------------------------- 当前时间 ---------------------------%%
const dateTime = ref('')
const calcTime = () => {
  const date = new Date()
  const Y = date.getFullYear() + '/'
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/'
  const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  dateTime.value = Y + M + D + h + m + s
}
onMounted(() => {
  calcTime()
  setInterval(() => {
    calcTime()
  }, 1000)
})
</script>

<!-- %%=========================== template ===========================%% -->
<template>
  <div class="g-weather">
    <div class="g-weather__inner">
      <iframe
        width="200"
        height="25"
        scrolling="no"
        frameborder="0"
        allowtransparency="true"
        :src="`https://i.tianqi.com/?c=code&id=26&color=%23FFFFFF&icon=1&site=12&py=${city}`"
      ></iframe>
      <p class="time">{{ dateTime }}</p>
    </div>
  </div>
</template>

<!-- %%=========================== style ===========================%% -->
<style lang="scss" scoped>
.g-weather {
  overflow: hidden;
  width: 100px;
  pointer-events: none;
}

@keyframes slide {
  0% {
    transform: translateX(20%);
  }

  100% {
    transform: translateX(-100%);
  }
}

.g-weather__inner {
  z-index: 10;
  animation: slide 3s linear infinite;
}

iframe {
  transform: scale(1.2) translateX(10%) translateY(10%);

  @media (min-height: 1440opx) {
    transform: scale(1.5) translateX(16%) translateY(10%);
  }

  @media (min-height: 2160opx) {
    transform: scale(2) translateX(25%) translateY(10%);
  }
}

.time {
  margin-top: 5px;
  font-size: 14px;
  font-family: Helvetica;
  white-space: nowrap;
  color: #ffffff;
}
</style>
