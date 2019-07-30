<template>
  <nav class="navbar navbar-expand-sm bg-secondary navbar-dark">
    <!-- Brand -->
    <router-link class="navbar-brand" to="/home">
      <img src="./../assets/logo.png" width="34px" alt srcset />
    </router-link>
    <!-- Links -->
    <ul class="navbar-nav">
      <li class="nav-item pad-right15" v-if="!authUser">
        <router-link to="/login">Login</router-link>
      </li>
      <li class="nav-item pad-right15" v-if="!authUser">
        <router-link to="/signup">Signup</router-link>
      </li>
      <li class="pad-right15 nav-item" v-if="authUser">
        <router-link to="/article-create">Create</router-link>
      </li>
      <li class="dropdown" v-if="authUser">
        <a class="dropdown-toggle" data-toggle="dropdown" href="#">
          Hey {{authUser.name}}
          <span class="caret"></span>
        </a>
        <ul class="dropdown-menu">
          <li>
            <a href="#" @click="logout()">Logout</a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: "Navbar",
  computed: {
    authUser() {
      return this.$root.auth.user;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("auth");
      this.$root.auth = {};
      this.$noty.success("Successfully logout.");
    }
  }
};
</script>
<style scoped>
.pad-right15 {
  padding-right: 15px;
}
</style>
