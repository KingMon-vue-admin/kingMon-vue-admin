import Vue from "vue";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import "@/styles/index.scss"; // global css

import App from "./App";
import router from "./router";
import store from "./store";

import i18n from "./lang"; // Internationalization
import "./icons"; // icon
import "./errorLog"; // error log
import "./permission"; // permission control
import "./mock"; // simulation data

import * as filters from "./filters"; // global filters

Vue.use(Element, {
  size: "medium", // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
});

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;
window.attributeCount = function(obj) {
  var count = 0;
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      // 建议加上判断,如果没有扩展对象属性可以不加
      count++;
    }
  }
  return count;
};
new Vue({
  el: "#app",
  router,
  store,
  i18n,
  template: "<App/>",
  components: { App }
});
Vue.directive("dirAuth", {
  bind: function() {
    if (!window._auth) {
      window._auth = JSON.parse(sessionStorage.getItem("Auth"));
    }
    let nowAuth = arguments[0].dataset.auth.split(",");
    nowAuth.map(Auth =>{
      if(window._auth[Auth] == undefined || window._auth[Auth] == ''){
        arguments[0].style.display = 'none'
      }
    })
  }
});
