import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // getToken from cookie
import {
  loadAuthKey,
  loadAuthCodes,
  loadSysOrganizationDataSetStore,
  loadBaseMajorsDataSetStore
} from "@/api/login";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

// permission judge function
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf("admin") >= 0) return true; // admin permission passed directly
  if (!permissionRoles) return true;
  return roles.some(role => permissionRoles.indexOf(role) >= 0);
}

const whiteList = ["/login", "/authredirect"]; // no redirect whitelist

router.beforeEach((to, from, next) => {
  if (!sessionStorage.getItem("Student") && sessionStorage.getItem("InCode")) {
    loadSysOrganizationDataSetStore({
      page: 1,
      rows: 1000
    }).then(req => {
      let parent = {};
      req.data.data.dataSet.rows.map(s => {
        let cas = s.id;
        parent[s.id] = {
          name: s.name,
          children: {}
        };
        loadBaseMajorsDataSetStore({ collegeId: s.id }).then(s => {
          s.data.data.dataSet.rows.map(sv => {
            console.log(parent[cas],sv.id)
            parent[cas].children[sv.id] = sv.name;
          });
      sessionStorage.setItem("Student", JSON.stringify(parent));
        });
      });
    });
  }
  if (!sessionStorage.getItem("Auth") && sessionStorage.getItem("InCode")) {
    loadAuthCodes({ page: 1, rows: 1000 }).then(res => {
      let auts = {};
      res.data.recordRows.map(s => {
        auts[s.permCode] = s.url;
      });
      sessionStorage.setItem("Auth", JSON.stringify(auts));
    });
  }
  if (
    !sessionStorage.getItem("KeysSchool") &&
    sessionStorage.getItem("InCode")
  ) {
    let keys = {};
    loadAuthKey({
      rows: 1000,
      page: 1
    }).then(res => {
      function reload(now) {
        if (keys[now.parentId] == undefined) {
          keys[now.id] = {
            children: {}
          };
        } else {
          keys[now.parentId].children[now.dicNum] = now.dicAliasName;
        }
        return;
      }
      res.data.data.dataSet.rows.map(s => {
        reload(s);
      });
      let realoads = {};
      // 重构格式
      for (var key in keys) {
        for (let i = 0; i < res.data.data.dataSet.rows.length; i++) {
          key;
          if (res.data.data.dataSet.rows[i].id == key) {
            realoads[res.data.data.dataSet.rows[i].dicNum] = keys[key];
          }
        }
      }
      sessionStorage.setItem("KeysSchool", JSON.stringify(realoads));
    });
  }
  NProgress.start(); // start progress bar
  if (getToken()) {
    // determine if there has token
    /* has token*/
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done(); // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) {
        // 判断当前用户是否已拉取完user_info信息
        store
          .dispatch("GetUserInfo")
          .then(res => {
            // 拉取user_info
            const roles = res.data.roles; // note: roles must be a array! such as: ['editor','develop']
            store.dispatch("GenerateRoutes", { roles }).then(() => {
              // 根据roles权限生成可访问的路由表
              router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
              next({ ...to, replace: true }); // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            });
          })
          .catch(err => {
            store.dispatch("FedLogOut").then(() => {
              Message.error(err || "Verification failed, please login again");
              next({ path: "/" });
            });
          });
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next(); //
        } else {
          next({ path: "/401", replace: true, query: { noGoBack: true } });
        }
        // 可删 ↑
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next("/login"); // 否则全部重定向到登录页
      NProgress.done(); // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // finish progress bar
});
