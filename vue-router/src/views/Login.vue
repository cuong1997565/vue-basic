<template>
  <div class="row">
    <div class="col-md-8 offset-md-2">
      <div class="card">
        <div class="card-body">
        <h3 class="text-center"> Login </h3>
          <form>
            <div class="form-group">
              <label>Email :</label>
              <input type="email" placeholder="Email" class="form-control" />
            </div>
            <div class="form-group">
              <label>Password :</label>
              <input type="password" placeholder="Password" class="form-control" />
            </div>
            <div class="form-group">
                <button class="btn btn-success form-control">Login</button>
            </div>
          </form>
        </div>
      </div>
      
    </div>
  </div>
</template>
<script>
export default {
  name: "Login"
};
</script>

