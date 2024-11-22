<template>
  <div class="aside relative">
    <!-- <el-radio-group v-model="isCollapse" class="arrows">
      <el-radio-button :value="false"><el-icon :size="20" class="rotate-180"><Back /></el-icon></el-radio-button>
      <el-radio-button :value="true"><el-icon :size="20"><Back /></el-icon></el-radio-button>
    </el-radio-group> -->
    <el-radio-button  class="arrows" @click="handleToggleSideBar" >
          <el-icon :size="20"  :class="isCollapse && 'rotate-180'" ><Back /></el-icon>
    </el-radio-button>

      <el-menu
        default-active="2"
        class="h-screen border-none"
        active-text-color="#ffd04b"
        background-color="rgb(42, 89, 137.5)"
        text-color="#fff"
        :collapse="isCollapse"
      >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group>
          <template #title><span>Group One</span></template>
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title><span>item four</span></template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <template #title>Navigator Two</template>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <el-icon><document /></el-icon>
        <template #title>Navigator Three</template>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <template #title>Navigator Four</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

const isCollapse = ref(JSON.parse(localStorage.getItem('openSideBar') || 'true'))

const handleToggleSideBar = () => {
      isCollapse.value = !isCollapse.value
      localStorage.setItem('openSideBar', JSON.stringify(isCollapse.value));
}

</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.arrows{
  position: absolute;
  top: 70px;
  right: -70px;
  z-index: 20;
}
</style>