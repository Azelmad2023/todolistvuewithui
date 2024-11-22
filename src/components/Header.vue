<template>
  <el-menu
    :default-active="activeIndex"
    text-color="#fff"
    active-text-color="#ffd04b"
    background-color="rgb(42, 89, 137.5)"
    mode="horizontal"
    :ellipsis="false"
    router
    @select="handleSelect"
  >
    <el-menu-item index="/"> 
      Home
    </el-menu-item>
    <el-menu-item index="/about">
      About
    </el-menu-item>
  </el-menu>
</template>

<script setup>
  import { onMounted, ref, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

  // Use Vue Router's hooks
  const route = useRoute();
  const router = useRouter();

  // Reactive active index based on route
  const activeIndex = ref(route.path);

  // Watch for route changes to update activeIndex
  watch(
    () => route.path,
    (newPath) => {
      activeIndex.value = newPath;
    }
  );

  const handleSelect = (key, keyPath) => {
    router.push(key);
  };

  onMounted(() => {
    activeIndex.value = route.path;
  });
</script>
<style scoped>
.el-menu {
  margin: 0;
}
</style>