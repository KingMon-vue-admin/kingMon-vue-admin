<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <img style="width: 75%;margin: auto;display: block;padding: 28px 0px;" src="../../../../assets/images/logoIndex.png" alt="">
    <el-menu mode="vertical" :show-timeout="200" :default-active="$route.path" :collapse="isCollapse" background-color="#304156"
      text-color="#bfcbd9" active-text-color="#409EFF">
      <sidebar-item :routes="routers_menus"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import SidebarItem from './SidebarItem'

  export default {
    components: {
      SidebarItem
    },
    created() {
      this.$store.dispatch('loadsMenus')
    },
    computed: {
      ...mapGetters([
        'routers_menus',
        'sidebar'
      ]),
      isCollapse() {
        return !this.sidebar.opened
      }
    }
  }

</script>
