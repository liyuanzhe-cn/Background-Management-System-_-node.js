<template>
  <div class="header-nav">
    <el-row>

      <el-col :span="6" class="nav-left">
        <img src="../assets/logo1.png" height="60" alt="管理系统">
        <span class="title">后台管理系统</span>
      </el-col>

      <el-col :span="6" class="nav-right">
        <div class="user-info">

          <img class="avatar" :src="user.avatar" alt="">

          <div class="welcome">
            <span class="name welcome">欢迎</span>
            <span class="name">{{user.name}}</span>
          </div>

          <span class=" name username">
            <!-- 下拉箭头 -->
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="userInfo">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

          </span>

        </div>

      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
  name: 'header-nav',
  methods: {
    // 自定义指令
    handleCommand(command) {
      switch (command) {
        case 'logout':
          this.logout()
          break;
        case 'userInfo':
          this.showUserInfo();
          break;
      }
    },
    //登出
    logout() {
      //登出清楚token数据， localstorge中的状态数据， 跳转刀登陆页面
      localStorage.removeItem('eleToken');
      this.$store.dispatch('clearState');
      this.$router.push('/login')

    },
    //跳转到个人信息页面
    showUserInfo() {
        this.$router.push("/infoshow");
    }
  },
  computed: {
    // ...mapGetters(['user']),
    user() {
      return this.$store.getters.user;
    }
  }
}

</script>

<style scoped>
.header-nav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px 0;
  background: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
  position:fixed;
  z-index:100;
}
.nav-left {
  margin-left: 20px;
  line-height: 60px;
  min-width: 300px;
  display: flex;
}
.logo {
  height: 50px;
  width: 50px;
  margin-right: 5px;
  display: inline-block;
}
.title {
  vertical-align: middle;
  font-size: 22px;
  font-family: "Microsoft YaHei";
  letter-spacing: 10px;
  text-indent: 10px;
}

.nav-right {
  line-height: 60px;
  text-align: right;
  min-width: 300px;
  position: absolute;
  right: 0;
}
.user-info {
  line-height: 60px;
  text-align: right;
  padding-right: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}
.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.comename {
  font-size: 12px;
}
.avatarname {
  color: #409eff;
  font-weight: bolder;
}
.username {
  cursor: pointer;
  margin-right: 5px;
  margin-left: 10px;
}
.el-dropdown {
  color: #fff;
}
i {
  margin-right: 9px;
  margin-bottom: 25px;
}
</style>