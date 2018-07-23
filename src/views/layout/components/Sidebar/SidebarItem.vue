<template>
  <div class="menu-wrapper">
    <template v-for="item in routes" v-if="!item.hidden&&item.items">
      <router-link v-if="hasOneShowingChildren(item.items) && !item.items[0].items&&!item.alwaysShow" :to="item.url+'/'+item.items[0].url"
        :key="item.items[0].title">
        <el-menu-item :index="item.url+'/'+item.items[0].url" :class="{'submenu-title-noDropdown':!isNest}">
          <svg-icon v-if="item.items[0].icon&&item.items[0].icon" :icon-class="item.items[0].icon"></svg-icon>
          <span v-if="item.items[0].title&&item.items[0].title" slot="title">{{generateTitle(item.items[0].title)}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.title||item.url" :key="item.title">
        <template slot="title">
          <svg-icon v-if="item.icon&&item.icon" :icon-class="item.icon"></svg-icon>
          <span v-if="item.title&&item.title" slot="title">{{generateTitle(item.title)}}</span>
        </template>

        <template v-for="child in item.items" v-if="!child.hidden">
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.items&&child.items.length>0" :routes="[child]" :key="child.url"></sidebar-item>

          <router-link v-else :to="child.url" :key="child.title">
            <el-menu-item :index="child.url">
              <svg-icon v-if="child.icon&&child.icon" :icon-class="child.icon"></svg-icon>
              <span v-if="child.title&&child.title" slot="title">{{generateTitle(child.title)}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>

    </template>
  </div>
</template>

<script>
  import {
    generateTitle
  } from '@/utils/i18n'

  export default {
    name: 'SidebarItem',
    props: {
      routes: {
        type: Array
      },
      isNest: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      hasOneShowingChildren(children) {
        const showingChildren = children.filter(item => {
          return !item.hidden
        })
        if (showingChildren.length === 1) {
          return true
        }
        return false
      },
      generateTitle
    }
  }

</script>
