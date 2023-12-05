<!-- %%=========================== script ===========================%% -->
<script setup lang="ts">
import { computed } from 'vue'
import type { Entry } from './nonBusiness'
import EntryVue from './Entry.vue'

// %%--------------------------- 组件配置 ---------------------------%%
interface Props {
  title: string
  entries: Entry[]
  activedEntry: Entry | undefined
}
const props = defineProps<Props>()

type Emits = (e: 'update:activedEntry', entry: Entry) => void
const emit = defineEmits<Emits>()

// %%--------------------------- 入口 ---------------------------%%
const leftEntries = computed(() => props.entries.filter((v) => [undefined, 'LEFT'].includes(v.pos)))
const rightEntries = computed(() => props.entries.filter((v) => v.pos === 'RIGHT'))
</script>

<!-- %%=========================== template ===========================%% -->
<template>
  <div class="g-nav">
    <!-- %%--------------------------- 左 ---------------------------%% -->
    <div class="left-panel">
      <slot name="left"> </slot>
      <EntryVue
        v-for="(entry, i) in leftEntries"
        :key="i"
        :entry="entry"
        :actived-entry="activedEntry"
        @click-entry="(x) => emit('update:activedEntry', x)"
      ></EntryVue>
    </div>
    <!-- %%--------------------------- 中 ---------------------------%% -->
    <div class="title">
      <span class="title__text">{{ title }}</span>
    </div>
    <!-- %%--------------------------- 右 ---------------------------%% -->
    <div class="right-panel">
      <EntryVue
        v-for="(entry, i) in rightEntries"
        :key="i"
        :entry="entry"
        :actived-entry="activedEntry"
        @click-entry="(x) => emit('update:activedEntry', x)"
      ></EntryVue>
      <slot name="right"> </slot>
    </div>
  </div>
</template>

<!-- %%=========================== style ===========================%% -->
<style lang="scss" scoped>
.g-nav {
  display: grid;
  grid-template-columns: 1.25fr 1fr 1.25fr;
  align-items: center;
  padding-top: 5px;
  width: 100%;
  height: 85px;
  background-image: url('../../assets/images/gNav/bg.png');
  background-size: 100% 100%;
  user-select: none;
}

/* %%--------------------------- 标题 ---------------------------%% */
.title {
  margin-bottom: 24px;
  text-align: center;
}

.title__text {
  font-size: 32px;
  font-family: HuXiaoBo-NanShen;
  color: transparent;
  background: linear-gradient(180deg, #ffffff 40%, #377ddd 90%);
  background-clip: text;
}

/* %%--------------------------- 两侧 ---------------------------%% */
.left-panel,
.right-panel {
  display: flex;
  justify-content: space-evenly;
}
</style>
