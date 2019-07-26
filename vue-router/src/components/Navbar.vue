<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand" href="#">
          <img src="./../assets/logo.png" width="34px" alt srcset />
        </a>
      </div>
      <ul class="nav navbar-nav">
        <li class="nav-item"  v-if="!authUser">
          <router-link to="/login">Login</router-link>
        </li>
        <li  v-if="!authUser">
          <router-link to="/signup">Signup</router-link>
        </li>
        <li class="dropdown" v-if="authUser">
          <a class="dropdown-toggle" data-toggle="dropdown" href="#">
           Hey {{authUser.name}}
            <span class="caret"></span>
          </a>
          <ul class="dropdown-menu">
            
            <li>
              <a href="#">Logout</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    authUser() {
      return this.$root.auth.user;
    }
  }
};
</script>
<style scoped>
</style>
