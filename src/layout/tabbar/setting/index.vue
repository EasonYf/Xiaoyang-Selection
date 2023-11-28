<template>
  <div class="settings">
    <!-- 刷新按钮 -->
    <el-button size="default" circle @click="settingRefresh">
      <el-icon>
        <Refresh />
      </el-icon>
    </el-button>
    <el-button size="default" circle @click="fullScreen">
      <el-icon>
        <FullScreen />
      </el-icon>
    </el-button>
    <el-button size="default" circle>
      <el-icon>
        <Setting />
      </el-icon>
    </el-button>
    <el-avatar icon="UserFilled" :size="40" />
    <el-dropdown>
      <span class="el-dropdown-link">
        Dropdown List
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>Action 1</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
          <el-dropdown-item>Action 3</el-dropdown-item>
          <el-dropdown-item disabled>Action 4</el-dropdown-item>
          <el-dropdown-item divided>Action 5</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting/setting'

let LauOutSettingStore = useLayOutSettingStore()

// 刷新按钮点击的回调
const settingRefresh = () => {
  LauOutSettingStore.refresh = !LauOutSettingStore.refresh
}
// 全屏按钮点击的回调函数
const fullScreen = () => {
  let full = document.fullscreenElement
  if(!full){
    //如果不是全屏，调用文档根节点方法requestFullScreen方法
    document.documentElement.requestFullscreen()
  }else{
    //如果是全面，调用exitFullScreen方法，退出全面
    document.exitFullscreen()
  }
}
</script>
<script lang="ts">
export default {
  name: "Settings",
};
</script>
<style scoped lang="scss">
.settings {
  display: flex;
  align-items: center;
  margin-right: 20px;
}
.el-avatar {
  margin: 0 15px;
}
</style>
