<script setup>
import Header from "./components/Header.vue";
import { ref } from 'vue'
import SidebarElement from "./components/SidebarElement.vue";


const activeIndex = ref('1')
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}

</script>

<template>
  <el-container class="layout-container-demo" >
      <SidebarElement />
    <el-container>
      <!-- <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px">
              <setting />
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>View</el-dropdown-item>
                <el-dropdown-item>Add</el-dropdown-item>
                <el-dropdown-item>Delete</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>Tom</span>
        </div>
      </el-header> -->
      <el-header>
          <Header />
      </el-header>
      <router-view />
    </el-container>
  </el-container>
</template>
<style scoped>
.el-header {
  padding: 0;
}
</style>