<template>
  <div class="row">
    <div class="col-md-8 offset-md-2">
      <div class="card">
        <div class="card-body">
          <h3 class="text-center">Login</h3>
          <form>
            <div class="form-group">
              <label>Email :</label>
              <input
                v-bind:class="{'is-invalid' : errors.email}"
                v-model="email"
                type="email"
                placeholder="Email"
                class="form-control"
              />
              <div class="errors" v-if="errors.email">
                <small class="text-danger" :key="error" v-for="error in errors.email">{{ error }}</small>
              </div>
            </div>
            <div class="form-group">
              <label>Password :</label>
              <input
                v-bind:class="{'is-invalid' : errors.password}"
                v-model="password"
                type="password"
                placeholder="Password"
                class="form-control"
              />
              <div class="errors" v-if="errors.password">
                <small class="text-danger" v-for="error in errors.password" :key="error">{{ error }}</small>
              </div>
            </div>
            <div class="form-group">
              <button @click="loginUser()" :disabled="loading" class="btn btn-success form-control">
                  <i class="fa fa-spin fa-spinner" v-if="loading"></i>
                  {{ loading ? '' : 'Login' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import config from '@/config';
export default {
  name: "Login",
  beforeRouteEnter(to, from, next) {
      if(localStorage.getItem("auth")) {
        return next({path : "/home"});
      }
      next();
  },
  data() {
    return {
      email: "",
      password: "",
      errors: {},
      loading : false
    };
  },
  methods: {
    loginUser() {
      this.loading = true;
      axios
        .post(`${config.apiUrl}/auth/login`, {
          email: this.email,
          password: this.password
        })
        .then(response => {
            this.loading = false;
            this.$root.auth = response.data.data;
            localStorage.setItem("auth", JSON.stringify(response.data.data));
            this.$noty.success("Successfully logged in.");
            this.$router.push("home");
        })
        .catch(({response}) => {
          this.loading = false;
          this.$noty.error("Oops ! something went wrong .");
          if (response.status === 401) {
            this.errors = {
              email: ["These credentials do not match our records"]
            };
          } else {
            this.errors = response.data;
          }
        });
    }
  }
};
</script>
<style scoped>
.is-invalid {
  border: 1px solid red;
}
</style>


