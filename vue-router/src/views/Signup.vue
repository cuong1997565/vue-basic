<template>
  <div class="row">
    <div class="col-md-8 offset-md-2">
      <div class="card">
        <div class="card-body">
          <h3 class="text-center">Signup</h3>
          <div class="form-group">
            <label>Name :</label>
            <input
              v-model="name"
              v-bind:class="{ 'is-invalid' : errors.name, 'is-valid' : !errors.name && this.submitted }"
              type="text"
              placeholder="Name"
              class="form-control"
            />
            <div class="errors" v-if="errors.name">
              <small class="text-danger" :key="error" v-for="error in errors.name">{{ error }}</small>
            </div>
          </div>
          <div class="form-group">
            <label>Email :</label>
            <input
              v-bind:class="{ 'is-invalid' : errors.email, 'is-valid' : !errors.email && this.submitted }"
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
              v-bind:class="{ 'is-invalid' : errors.password, 'is-valid' : !errors.password && this.submitted}"
              v-model="password"
              type="password"
              placeholder="Password"
              class="form-control"
            />
            <div class="errors" v-if="errors.password">
              <small class="text-danger" :key="error" v-for="error in errors.password">{{ error }}</small>
            </div>
          </div>
          <div class="form-group">
            <button @click="registerUser()" :disabled="loading" class="btn btn-success form-control">
              <i class="fa fa-spin fa-spinner" v-if="loading"></i>
                {{ loading ? '' : 'Signup' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import config from "@/config";
export default {
  name: "Signup",
  beforeRouteEnter(to, from, next) {
    if(localStorage.getItem("auth")) {
      return next({path : "/home"});
    }
    next();
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      errors: {},
      submitted: false,
      loading: false
    };
  },
  methods: {
    registerUser() {
      this.loading = true;
      this.submitted = true;
      axios
        .post(`${config.apiUrl}/auth/register`, {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(response => {
          this.submitted = false;
          this.loading = false;
          const { data } = response.data;
          localStorage.setItem("auth", JSON.stringify(data));
          this.$noty.success("Successfully signup in.");
          this.$root.auth = data;
          this.$router.push("home");
        })
        .catch(({ response }) => {
          this.$noty.error("Oops ! something went wrong .");
          this.submitted = false;
          this.loading = false;
          this.errors = response.data;
        });
    }
  }
};
</script>
<style scoped>
  .is-invalid{
    border: 1px solid red;
  }
</style>


