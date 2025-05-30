<template>
  <el-container style="height: 100vh;">
    <!-- 左侧菜单 -->
    <el-aside width="200px">
      <Sidebar />
    </el-aside>

    <el-container>
      <!-- 顶部导航栏 -->
      <el-header style="padding: 0;">
        <TopNav />
      </el-header>

      <!-- 主内容区 -->
      <el-main style="padding: 20px; background-color: #f0f2f5;">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Sidebar from './components/Sidebar.vue';
import TopNav from './components/TopNav.vue';

export default {
  components: {
    Sidebar,
    TopNav
  }
};
</script>

<style>
.el-aside {
  background-color: #545c64;  /* 与侧边栏背景色一致 */
}
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden; /* 彻底禁止滚动条出现 */
  background-color: #f0f2f5;
}

</style>