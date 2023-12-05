<!-- %%=========================== template ===========================%% -->
<template>
  <div class="g-layout">
    <div class="nav">
      <slot name="nav"> </slot>
    </div>
    <div class="main">
      <div class="lower">
        <slot name="lower"> </slot>
      </div>
      <div class="upper">
        <slot name="upper"> </slot>
      </div>
    </div>
  </div>
</template>

<!-- %%=========================== style ===========================%% -->
<style lang="scss" scoped>
.g-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.main {
  flex: 1;
  overflow: hidden;
}

.lower {
  height: 100%;
}

.upper {
  position: relative;
  top: -100%;
  height: 100%;
  pointer-events: none;
}
</style>
