<template>
  <div class="page404">

    <div id="main">
      <div id="msg">Page not found</div>
      <div id="error">
        <div id="f1">4</div>
        <div id="circle">
          <div id="smalldot"></div>
        </div>
        <div id="f2">4</div>
      </div>

      <div id="info">We can't seem to find the page<br>you're looking for.</div>
      <router-link style="text-decoration:none" to="/home">
        <div id="btn" >Back to site</div>
      </router-link>

    </div>

    <div id="ring"></div>

    <div class="dusk" id="d1"></div>
    <div class="dusk" id="d2"></div>
    <div class="dusk" id="d3"></div>
    <div class="dusk" id="d4"></div>
    <div class="dusk" id="d5"></div>
    <div class="dusk" id="d6"></div>
    <div class="dusk" id="d7"></div>
    <div class="dusk" id="d8"></div>
    <div class="dusk" id="d9"></div>

  </div>
</template>

<script>

</script>

<style scoped>
.page404 {
  width: 100%;
  height: 100%;
  background: url(../assets/pattern.png),
    radial-gradient(circle, #158ab2 0%, #1f2a77 20%, #111742 35%, #0d071a 80%);
}

#main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(2);
}
#msg {
  font-family: cursive;
  font-size: 25px;
  color: #fff;
  text-align: center;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}
#error {
  display: table;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
#f1,
#f2 {
  font-family: cursive;
  font-size: 100px;
  color: white;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
  display: table-cell;
}
#circle {
  height: 100px;
  width: 100px;
  border-radius: 50%;
  background: radial-gradient(circle, #fff1e0, #f4c661);
  box-shadow: 0 0 15px rgba(255, 211, 150, 1);
  position: relative;
  top: 10px;
  animation: move 4s linear infinite;
}
@-webkit-keyframes move {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
#smalldot {
  height: 5px;
  width: 5px;
  background-color: #111742;
  border-radius: 50%;
  position: relative;
  top: 75%;
  left: 65%;
  transform: translate(-50%, -50%);
}
#info {
  font-family: cursive;
  font-size: 13px;
  color: #fff;
  text-align: center;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}
#btn {
  height: 30px;
  width: 120px;
  color: white;
  background-color: #e94674;
  font-family: monospace;
  font-size: 13px;
  text-align: center;
  line-height: 30px;
  border-radius: 15px;
  position: relative;
  margin-top: 10px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 10px rgba(233, 68, 114, 0.8);
}
#btn:hover {
  cursor: pointer;
}
#ring {
  height: 140px;
  width: 50px;
  border-top: 4px solid #fffffd;
  border-right: 4px solid #ffffff;
  border-bottom: 4px solid #fffffd;
  border-left: 1px solid transparent;
  border-radius: 50%;
  position: absolute;
  top: 47%;
  left: 50%;
  transform: translate(-50%, -50%) rotateZ(45deg);
}
.dusk {
  height: 5px;
  width: 5px;
  background-color: white;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  position: absolute;
}
#d1 {
  top: 33%;
  left: 35%;
  -webkit-filter: blur(3px);
}
#d2 {
  top: 53%;
  left: 55%;
  -webkit-filter: blur(1px);
}
#d3 {
  top: 53%;
  left: 75%;
  -webkit-filter: blur(4px);
}
#d4 {
  top: 53%;
  left: 40%;
  -webkit-filter: blur(1px);
}
#d5 {
  top: 65%;
  left: 37%;
  -webkit-filter: blur(2px);
}
#d6 {
  top: 70%;
  left: 30%;
  -webkit-filter: blur(4px);
}
#d7 {
  top: 77%;
  left: 53%;
  -webkit-filter: blur(2px);
}
#d8 {
  top: 59%;
  left: 64%;
  -webkit-filter: blur(2px);
}
#d9 {
  top: 44%;
  left: 61%;
  -webkit-filter: blur(1px);
}
</style>