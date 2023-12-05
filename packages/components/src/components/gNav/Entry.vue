<!-- %%=========================== script ===========================%% -->
<script setup lang="ts">
import { useIsActivedEntry, type Entry } from './nonBusiness'

// %%--------------------------- 组件配置 ---------------------------%%
interface Props {
  entry: Entry
  activedEntry: Entry | undefined
}
const props = defineProps<Props>()

type Emit = (e: 'click-entry', entry: Entry) => void
const emit = defineEmits<Emit>()
const { isActivedEntry } = useIsActivedEntry(() => props.activedEntry)
</script>

<!-- %%=========================== template ===========================%% -->
<template>
  <div :class="{ entry: true, 'entry--actived': isActivedEntry(entry) }" @click.stop="emit('click-entry', entry)">
    {{ entry.label }}
    <div v-if="entry.children" class="child-entries">
      <div
        v-for="(childEntry, i) in entry.children"
        :key="i"
        :class="{ 'child-entry': true, 'child-entry--actived': isActivedEntry(childEntry) }"
        @click.stop="emit('click-entry', childEntry)"
      >
        {{ childEntry.label }}
      </div>
    </div>
  </div>
</template>

<!-- %%=========================== style ===========================%% -->
<style lang="scss" scoped>
/* %%--------------------------- 入口 ---------------------------%% */
.entry {
  position: relative;
  width: 160px;
  height: 45px;
  line-height: 45px;
  cursor: pointer;
  font-size: 22px;
  font-family: HuXiaoBo-NanShen;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  color: #ffffff;
}

.entry--actived,
.entry:hover {
  color: #6ecefe;
  background-image: url('../../assets/images/gNav/entry.png');
  background-size: 100% 100%;
}

/* %%--------------------------- 子入口 ---------------------------%% */
.child-entries {
  position: absolute;
  margin-top: 12px;
  margin-left: calc(100% / 8);
  width: calc(100% * 7 / 8);
  background: linear-gradient(180deg, #01071b 0%, rgba(5, 18, 57, 0.2) 100%);
  visibility: hidden;
  transition: visibility 0.5s;
}

.child-entry {
  height: 36px;
  font-size: 16px;
  line-height: 36px;
  text-align: center;
  color: #ffffff;
}

.child-entry:hover,
.child-entry--actived {
  color: #6ecefe;
  background-color: rgba(80, 171, 255, 0.5);
}

.child-entries:hover,
.entry:hover .child-entries {
  visibility: visible;
}
</style>
