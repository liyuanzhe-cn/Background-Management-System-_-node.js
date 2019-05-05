<template>
  <div class="home">
    <img :src="pic" alt="">
    <marquee behavior="scroll" onmouseover=this.stop() onmouseout=this.start()>欢迎进入后台管理系统！</marquee>
  </div>
</template>

<script>
import pic1 from '../assets/home1.jpg';
export default {
  name: "home",
  data() {
    return {
      pic: pic1

    }
  }
}

</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  position: absolute;
  /* padding-left: 70px; */
  box-sizing: border-box;
}
.home img {
  width: 100%;
  height: 100%;
}
marquee {
  font-size: 30px;
  color: aliceblue;
  text-shadow: 1px 1px 1px black;
  position: absolute;
  z-index: 100;
  top: 30%;
  left: 0px;
}
</style>