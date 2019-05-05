<template>
  <div class="index">

    <div class="header">
      <HeaderNav></HeaderNav>
    </div>

    <div class="left-nav">
      <LeftMenu></LeftMenu>
    </div>

    <div class="right-content">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import HeaderNav from '../components/nav';
// import HomePage from '../components/home';
import LeftMenu from '../components/leftnav'

export default {
  name: "index",

  components: {
    HeaderNav, LeftMenu
  }
}
</script>

<style>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.header {
  height: 70px;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
}
.left-nav {
  height: calc(100% - 70px);
  overflow: hidden;
  position: absolute;
  width: 180px;
  left: 0;
  top: 0;
}
.right-content {
  height: calc(100% - 70px);
  overflow: hidden;
  position: absolute;
  width: calc(100% - 180px);
  min-width: 600px;
  left: 180px;
  top: 70px;
}
</style>
