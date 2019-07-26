<template>
  <div id="app">
    <div class="container" style="margin-top:15px">
      <Navbar></Navbar>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue';
export default {
  name: "app",
  components : {
    Navbar
  },
  data() {
    return {};
  }
};
</script>
<style>
* {
  font-family: 'Poppins';
  border-radius: 0px !important;
}
body {
  background-color: #f5f3ef;
}
</style>
