<template>
  <div class="infoshow">
    <el-row type="flex" class="row-bg" justify='center'>
      <el-col :span="8">
        <div class="user">
          <img :src="user.avatar" alt="">
        </div>
      </el-col>
      <el-col :span="16">
        <div class="userinfo">
          <div class="user-item">
            <div class="user-name">
              <i class="el-icon-s-custom"></i>
              <span>{{user.name}}</span>
            </div>
            <div class="user-identity">
              <i class="el-icon-s-tools"></i>
              <span>{{user.identity == 'administrator'? '管理员':'员工'}}</span>
            </div>
          </div>

        </div>

      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'infoshow',
  computed: {
    user() {
      console.log(this.$store.getters.user)
      return this.$store.getters.user
    }
  }
}


</script>

<style scoped>
.infoshow {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-left: 180px;
  /* padding: 16px; */
}
.row-bg {
  width: 100%;
  height: 100%;
}
.user {
  text-align: center;
  position: relative;
  top: 30%;
}
.user img {
  width: 150px;
  border-radius: 50%;
}
.user span {
  display: block;
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}
.userinfo {
  height: 100%;
  background-color: #eee;
  display: flex;
}
.user-item {
  position: relative;
  top: 30%;
  padding: 26px;
  font-size: 28px;
  color: #333;
}
.user-name{
    margin-bottom:30px;
}
</style>