<template>
  <div class="row">
    <div class="col-md-8 offset-md-2">
      <div class="card">
        <div class="card-body">
          <h3 class="text-center">Signup</h3>
          <div class="form-group">
            <label>Name :</label>
            <input v-model="name" v-bind:class="{ 'is-invalid' : errors.name, 'is-valid' : !errors.name && this.submitted }"  type="text" placeholder="Name" class="form-control" />
            <div class="errors" v-if="errors.name">
              <small class="text-danger" :key="error" v-for="error in errors.name">{{ error }}</small>
            </div>
          </div>
          <div class="form-group">
            <label>Email :</label>
            <input  v-bind:class="{ 'is-invalid' : errors.email, 'is-valid' : !errors.email && this.submitted }"  v-model="email" type="email" placeholder="Email" class="form-control" />
            <div class="errors" v-if="errors.email">
              <small class="text-danger" :key="error" v-for="error in errors.email">{{ error }}</small>
            </div>
          </div>
          <div class="form-group">
            <label>Password :</label>
            <input  v-bind:class="{ 'is-invalid' : errors.password, 'is-valid' : !errors.password && this.submitted}"  v-model="password" type="password" placeholder="Password" class="form-control" />
            <div class="errors" v-if="errors.password">
              <small class="text-danger" :key="error" v-for="error in errors.password">{{ error }}</small>
            </div>
          </div>
          <div class="form-group">
            <button @click="registerUser()" class="btn btn-success form-control">Signup</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Signup",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      errors: {},
      submitted : false
    };
  },
  methods: {
    registerUser() {
      axios
        .post("https://react-blog-api.bahdcasts.com/api/auth/register", {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(response => {
          this.submitted = true;
          const { data } = response.data;
          localStorage.setItem("auth", JSON.stringify(data));
          this.$root.auth = data;
          this.$router.push("home");
        })
        .catch(({ response }) => {
        this.submitted = false;
          this.errors = response.data;
        });
    }
  }
};
</script>

