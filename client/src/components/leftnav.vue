<template>
  <div class="leftnav">

    <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#324057" text-color="#fff" active-text-color="#409eff">
      <router-link to="./home">
        <el-menu-item index="0">
          <i class="el-icon-setting"></i>
          <span slot="title">首页</span>
        </el-menu-item>
      </router-link>

      <template v-for="(v,i) in items">

        <el-submenu :index="(i+1)+''"  :key="v.path">
          <template slot="title">
            <i :class="'el-icon'+ v.icon"></i>
            <span>{{v.name}}</span>
          </template>

          <el-menu-item-group>
            <template v-for="(citem,cindex) in v.children" v-if="v.children" :index='cindex'>
              <router-link :to="citem.path">
                <el-menu-item :index="(i+1)+''+(cindex+1)">
                  <i :class="'el-icon'+ citem.icon"></i>
                  <span slot="title">{{citem.name}}</span>
                </el-menu-item>
              </router-link>
            </template>
          </el-menu-item-group>

        </el-submenu>
      </template>

    </el-menu>
  </div>
</template>


<script>
export default {
  name: 'leftnav',
  data() {
    return {
      items: [
        { icon: "-s-finance", name: "资金管理", path: '/fund', children: [{ icon: '-s-data', path: "/fundlist", name: "资金流水" }] },
        { icon: "-info", name: "信息管理", path: '/info', children: [{ icon: '-s-custom', path: "/infoshow", name: "账号信息" }] }
      ]
    }
  },
 
}
</script>


<style scoped>
.leftnav {
  position: fixed;
  top: 71px;
  left: 0;
  min-height: 100%;
  background-color: #324057;
  z-index: 99;
}
.el-menu {
  border: none;
}
.fa-margin {
  margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}

.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>