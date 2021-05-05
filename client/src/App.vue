<template>
  <div class="h-screen bg-gray-50 flex overflow-hidden">
    <side-bar-nav/>
    <div class="flex-1 flex flex-col overflow-hidden">
      <menu-header/>
      <breadcrumb/>
      <router-view></router-view>
    </div>    
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SideBarNav from './components/SideBarNav.vue'
import MenuHeader from './components/MenuHeader.vue'
import Breadcrumb from './components/Breadcrumb.vue'

export default defineComponent({
  name: 'App',
  components: {
    SideBarNav,
    MenuHeader,
    Breadcrumb
  }
})
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>