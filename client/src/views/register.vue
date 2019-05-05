<template>
  <div class="register">
    <div class="bg-image"></div>
    <div class="form_container">
      <div class="manage_tip">
        <span class="title">后台管理注册页面</span>
        <!-- form start -->
        <el-form :model="registerUser" label-width="80px" :rules="rules" ref="registerForm" class="registerForm">

          <el-form-item label="用户名" prop="name">
            <el-input v-model="registerUser.name" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerUser.email" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="registerUser.password" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="确认密码" prop="pass2">
            <el-input type="password" v-model="registerUser.password2" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="选择身份" label-width="80px" prop="identity">
            <el-select v-model="registerUser.identity" placeholder="请选择身份">
              <el-option label="管理员" value="administrator"></el-option>
              <el-option label="员工" value="employee"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
          </el-form-item>

          <div>
            <p>已有账号？ 去<router-link to="/login">登陆</router-link>
            </p>
          </div>

        </el-form>
        <!-- form end -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.registerUser.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      registerUser: {
        name: "",
        email: "",
        password: "",
        password2: "",
        identity: ""
      },
      rules: {
        name: [{ required: true, message: "用户名不能为空", trigger: 'input' },
        { min: 3, max: 30, message: "长度在3-30字符之间", trigger: "blur" }
        ],
        email: [{ type: "email", message: "邮箱格式不正确", trigger: 'blur' }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: 'blur' },
        { min: 3, max: 30, message: "长度在6-30字符之间", trigger: "blur" }
        ],
        password2: [{ required: true, message: "确认密码不能为空", trigger: 'blur' },
        { min: 3, max: 30, message: "长度在6-30字符之间", trigger: "blur" },
        { validator: validatePass2, trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(this)
        if (valid) {
          this.$axios.post('/api/users/register', this.registerUser)
            .then(res => {
              this.$message({
                message: "账号注册成功",
                type: "success"
              })
            })

          this.$router.push('/login')
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
  components: {

  }
}
</script>

<style scoped>
.register {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
.bg-image {
  width: 100%;
  height: 100%;
  position: absolute;
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
.registerForm {
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
