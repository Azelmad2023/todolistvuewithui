<template>
    <el-aside :class="open ? 'w-72' : 'w-20'" class="h-screen duration-300 relative cursor-pointer" @click="handleToggleSideBar">
      <div class="p-2 flex items-center justify-center bg-white absolute top-4 right-4 rounded">
        <el-icon :size="20"  :class="!open && 'rotate-180'" ><Back /></el-icon>
      </div>
    </el-aside>
</template>
  
<script setup>
    import { Back } from '@element-plus/icons-vue';
    import {  ref } from 'vue';

    const open = ref(JSON.parse(localStorage.getItem('openSideBar') || 'true'))

    const handleToggleSideBar = () => {
      open.value = !open.value
      localStorage.setItem('openSideBar', JSON.stringify(open.value));
    }
</script>

<style scoped>
  .layout-container-demo .el-aside {
    background: rgb(28.8, 47.6, 67);
  }
  
</style>



