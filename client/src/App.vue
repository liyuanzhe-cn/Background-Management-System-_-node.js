<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'


export default {
  name: "app",
  created() {
    /*JavaScript代码是运行在内存中的，代码运行时的所有变量，函数，也都是保存在内存中的。
    刷新页面，以前申请的内存被释放，重新加载脚本代码，变量重新赋值，所以这些数据要想储存就必须储存在外部，
    例如：Local Storage, Session Storage, IndexDB等。*/
    if (localStorage.eleToken) {
      const decode = jwtDecode(localStorage.eleToken)
      this.$store.dispatch("setAuthenticated", !this.isEmpty(decode));
      this.$store.dispatch("setUser", decode);

    }
  },
  /* */
  /* */
  methods: {
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



<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  position: relative;
  margin:0;
  padding:0;
}
/* #app {
  width: 100%;
  height: 100%;
} */
</style>
