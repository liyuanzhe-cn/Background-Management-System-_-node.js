import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


const state = {
  isAuthenticated: false,  // 是否存有token数据
  user: {}   // 存储用户信息
};

const getters = {
  isAuthenticated: state => state.isAuthenticated,
  user: state => state.user
};



const types = {
  SET_AUTHENTICATED: "SET_AUTHENTICATED",
  SET_USER: "SET_USER"
}

const mutations = {
  //对象中写函数名可以使用['字符串'], 
  // 会转成字符串，不可直接使用变量名types.SET_USER 
  //会被认为是 "types.SET_USER" 
  // {
  //   ['sasa']() { console.log(1) },['sasa']() { console.log(1) }
  // } 
  // { sasa: ƒ }

  [types.SET_AUTHENTICATED](state, isAuthenticated) {
    if (isAuthenticated) state.isAuthenticated = isAuthenticated;
    else state.isAuthenticated = false;
  },
  [types.SET_USER](state, user) {
    if (user) state.user = user;
    else state.user = {};
  }
};

const actions = {
  setAuthenticated: ({ commit }, isAuthenticated) => {
    commit(types.SET_AUTHENTICATED, isAuthenticated);
  },
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user);
  },
  clearState: ({ commit }) => {
    commit(types.SET_AUTHENTICATED, false);
    commit(types.SET_USER, {});
  },
};

export default new Vuex.Store({
  state, mutations, getters, actions
})
