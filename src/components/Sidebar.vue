<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="1">
      <i class="el-icon-s-home"></i>
      <span>首页</span>
    </el-menu-item>
    <el-menu-item index="2">
      <i class="el-icon-connection"></i>
      <span>人物关系</span>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-time"></i>
      <span>时间线</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-data-line"></i>
      <span>影响力</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  methods: {
    handleSelect(index) {
      if (index === '1') {
        this.$router.push('/'); // 跳转到首页
      } else if (index === '2') {
        this.$router.push('/relationship'); // 跳转到人物关系页
      } else if (index === '3') {
        this.$router.push('/timeline'); // 跳转到时间线页
      } else if (index === '4') {
        this.$router.push('/influence'); // 跳转到影响力页
      }
    }
  }
};
</script>

<style scoped>
.el-menu-vertical-demo {
  height: 100vh;
  border-right: none;
}

.el-menu-item {
  font-size: 16px;
  height: 56px;
  line-height: 56px;
}

.el-menu-item i {
  margin-right: 8px;
  font-size: 18px;
}
</style>