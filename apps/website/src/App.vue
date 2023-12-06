<!-- %%=========================== script ===========================%% -->
<script setup lang="ts">
import type { Entry } from 'components'
import { ref } from 'vue'
import { routes } from './config/router'

// %%--------------------------- 标题 ---------------------------%%
const title = import.meta.env.VITE_APP_SYSTEMNAME

// %%--------------------------- 导航栏入口 ---------------------------%%
const entries: Entry[] = [
  routes[0].children!.slice(0, 3).map(
    (x): Entry => ({
      id: x.name,
      label: x.meta.label!,
      pos: 'LEFT'
    })
  ),
  routes[0].children!.slice(3).map(
    (x): Entry => ({
      id: x.name,
      label: x.meta.label!,
      pos: 'RIGHT'
    })
  )
].flat()
const activedEntry = ref<Entry>(entries[0])
</script>

<!-- %%=========================== template ===========================%% -->
<template>
  <g-layout>
    <template #nav>
      <g-nav v-model:actived-entry="activedEntry" :title="title" :entries="entries">
        <template #left>
          <g-weather city="hangzhou"></g-weather>
        </template>
        <template #right>
          <g-user user="管理员"></g-user>
        </template>
      </g-nav>
    </template>
    <template #upper>
      <router-view></router-view>
    </template>
    <template #lower> </template>
  </g-layout>
</template>
