<!-- % script % -->
<script setup lang="ts">
import { userModule } from '@/module/user'
import { UserService } from '@/module/user/service'

const userService = userModule.get(UserService)
const { users } = userService
userService.setup().catch(() => {})
</script>

<!-- % template % -->
<template>
  <div class="example">
    <h1>这是一个简单的删除用户的案例</h1>
    <div v-for="user in users" :key="user.id">
      <span>{{ user.name }}</span>
      <el-button @click="userService.deleteUser({ id: user.id })">删除</el-button>
    </div>
  </div>
</template>
