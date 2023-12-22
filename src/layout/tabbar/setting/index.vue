<template>
  <div
    class="settings"
    :class="{ mydark: LauOutSettingStore.dark ? true : false }"
  >
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
    <el-button size="default" circle @click="setTheme">
      <el-icon>
        <Setting />
      </el-icon>
    </el-button>
    <el-avatar icon="UserFilled" :size="40" :src="userStore.avatar" />
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userStore.username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <el-button @click="loginOut">退出登录</el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <!-- 主题设置的抽屉 -->
  <el-drawer v-model="drawer" append-to-body size="250">
    <template #header>
      <h4>主题设置</h4>
    </template>
    <template #default>
      <el-form>
        <el-form-item label="主题颜色"
          ><el-color-picker v-model="themeColor" show-alpha @change="setColor"
        /></el-form-item>
        <el-form-item label="模式切换">
          <el-switch
            ref="switchThme"
            v-model="value1"
            class="mt-2"
            size="large"
            style="margin-left: 24px"
            inline-prompt
            active-icon="Sunny"
            inactive-icon="Moon"
            @change="changeTheme"
          />
        </el-form-item>
      </el-form>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import useLayOutSettingStore from "@/store/modules/setting/setting";
import useUserStore from "@/store/modules/user";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
let LauOutSettingStore = useLayOutSettingStore();
let userStore = useUserStore();
let $router = useRouter();
let $route = useRoute();
// switch的组件实例
let switchThme = ref();
// 控制暗黑模式
let value1 = ref<boolean>(false);
// 主题颜色
let themeColor = ref();
// 控制设置主题的抽屉
let drawer = ref<boolean>(false);
// theme改变的回调
const changeTheme = () => {
  LauOutSettingStore.dark = !LauOutSettingStore.dark;
  let html = document.documentElement;
  value1.value ? (html.className = "dark mydark") : (html.className = "");
};
// 刷新按钮点击的回调
const settingRefresh = () => {
  LauOutSettingStore.refresh = !LauOutSettingStore.refresh;
};
// 全屏按钮点击的回调函数
const fullScreen = () => {
  let full = document.fullscreenElement;
  if (!full) {
    //如果不是全屏，调用文档根节点方法requestFullScreen方法
    document.documentElement.requestFullscreen();
  } else {
    //如果是全面，调用exitFullScreen方法，退出全面
    document.exitFullscreen();
  }
};
// 切换主题按钮的回调
const setTheme = () => {
  drawer.value = true;
};
// 当主题颜色发生改变时的回调
const setColor = () => {
  const el = document.documentElement;
  // const el = document.getElementById('xxx')
  console.log(el);

  // 获取 css 变量
  getComputedStyle(el).getPropertyValue(`--el-color-primary`);

  // 设置 css 变量
  el.style.setProperty("--el-color-primary", themeColor.value);
};
//退出登录的回调
const loginOut = async () => {
  //第一步：向服务器发送退出登录请求
  //第二步：仓库中与用户相关的数据清空
  //第三步：跳转login路由
  await userStore.userLoginOut();
  $router.push({
    path: "/login",
    query: {
      redirect: $route.path,
    },
  });
};
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
  // margin-right: 20px;
  // border: 1px solid red;
  border-radius: 10px;
  padding: 5px 10px;
  margin-top: 20px;
  background-color: #fff;
  box-shadow: 1px 1px 2px 1px rgba($color: #000000, $alpha: 0.2);

}
.el-avatar {
  margin: 0 15px;
}
</style>
