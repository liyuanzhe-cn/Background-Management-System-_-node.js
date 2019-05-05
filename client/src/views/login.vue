<template>
  <div class="login">
    <div class="bg-image"></div>
    <div class="form_container">
      <div class="manage_tip">
        <span class="title">后台管理登录页面</span>
        <!-- form start -->
        <el-form :model="loginUser" label-width="80px" :rules="rules" ref="loginForm" class="loginForm">

          <el-form-item label="邮箱" prop="email">
            <el-input v-model="loginUser.email" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="loginUser.password" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">登陆</el-button>
          </el-form-item>

          <div>
            <p>还没有账号？点击<router-link to="/register">注册</router-link>
            </p>
          </div>

        </el-form>
        <!-- form end -->
      </div>
    </div>
  </div>
</template>

<script>
// 引入token解码插件
import jwtDecode from 'jwt-decode'
window.jwtDecode = jwtDecode;
export default {
  name: "login",
  /* */
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.loginUser.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      loginUser: {
        email: "",
        password: ""
      },
      rules: {
        email: [{ type: "email", message: "邮箱格式不正确", trigger: 'blur' }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: 'blur' },
        { min: 3, max: 30, message: "长度在6-30字符之间", trigger: "blur" }
        ]
      }
    }
  },
  /* */
  methods: {
    //提交表单登陆
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(this.$refs[formName])
        
        if (valid) {
          //rules检测后合法执行
          this.$axios.post('/api/users/login', this.loginUser)
            .then(res => {
              const { token } = res.data;
              //保存token到localstorage中，路由跳转vueX会返回到初始状态
              localStorage.setItem('eleToken', token);
              //解析token数据
              console.log(token)
              const decode = jwtDecode(token)

              console.log(decode)

              this.$message({
                message: "登陆成功",
                type: "success"
              })

              this.$store.dispatch("setAuthenticated", !this.isEmpty(decode));

              this.$store.dispatch("setUser", decode);

              this.$router.push('/index')

            }).catch(err => {
              this.$message({
                message: "账号或密码错误",
                type: "error"
              })
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    isEmpty(value) {
      return (
        value == undefined || (typeof value == 'object' && Object.keys(value).length == 0) || (typeof value == 'string' && value.trim().length == 0)
      )
    }
  },

  /* */
  components: {

  },
  /* */
}
</script>

<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
.bg-image {
  width: 100%;
  height: 100%;
  position:absolute;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: cover;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
</style>
