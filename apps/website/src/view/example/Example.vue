<!-- % script % -->
<script setup lang="ts">
import { userModule } from '@/module/user'
import { notify } from 'components'
import { onMounted, ref } from 'vue'

// %% 表单数据 %%
const userId = '1'
const userName = ref<string>()
const userDAO = userModule.resolve('UserDAO')

onMounted(() =>
  userDAO
    .queryUser({ id: userId })
    .then((x) => (userName.value = x.name))
    .catch(() => notify('error', '查询用户信息失败'))
)

// %% 提交表单 %%
const onSubmit = () => {
  if (!userName.value) {
    notify('error', '用户名不能为空')
    return
  }

  userDAO
    .updateUser({
      id: userId,
      name: userName.value
    })
    .then(() => notify('success', '用户信息更新成功'))
    .catch(() => notify('error', '用户信息更新失败'))
}
</script>

<!-- % template % -->
<template>
  <div class="example">
    <h1>这是一个简单的修改用户名称的案例</h1>
    <el-input v-model="userName" />
    <el-button @click="onSubmit">提交</el-button>
  </div>
</template>
