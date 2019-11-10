<!-- Login page prototype vue code template (builds the login page) -->
<template>
    <div id="login" class = "full-container">
        <h2>Login</h2>
        <div class = "centered-div">
        <form class = "centered-form" action="/auth/login" method="get">
            <div class="form-group centered-div">
                <button class="loginBtn loginBtn--google">Login With Google</button>
            </div>
        </form>
        </div>
    </div>
</template>

<!-- Page Vue Script -->
<script>
//imports vuex state and action mapping functions
import { mapState, mapActions } from 'vuex'

export default {
    //empty default data
    name: 'Login',
    data () {
    return {
      msg: 'Welcome to The login Page'
    }
        /*return {
            email: '',
            password: '',
            submitted: false
        }*/
    }/*,
    computed: {
        ...mapState('account', ['status'])
    },
    created () {
        // reset login status
        this.logout();
    },
    //account login submission handling
    methods: {
        ...mapActions('account', ['login', 'logout']),
        handleSubmit (e) {
            this.submitted = true;
            const { email, password } = this;
            //if email && password exist and are correct, login to this user for user state handling
            if (email && password) {
                this.login({ email, password })
            }
        }
    }*/
};
</script>

<style scoped>

.centered-div{
    justify-content: center;
}

.centered-div{
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.full-container{
    height:100%;
    width: 100%;
}

.loginBtn {
  box-sizing: border-box;
  position: relative;
  justify-content: center;
  /* width: 13em;  - apply for fixed size */
  margin: 0.2em;
  padding: 0 15px 0 15px;
  border: none;
  text-align: center;
  line-height: 50px;
  white-space: nowrap;
  border-radius: 0.2em;
  font-size: 16px;
  color: #FFF;
}

.loginBtn--google {
  /*font-family: "Roboto", Roboto, arial, sans-serif;*/
  background: #DD4B39;
}

.loginBtn:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 34px;
  height: 100%;
}
.loginBtn:focus {
  outline: none;
}
.loginBtn:active {
  box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);
}
/* Google */
.loginBtn--google {
  /*font-family: "Roboto", Roboto, arial, sans-serif;*/
  background: #DD4B39;
}
.loginBtn--google:hover,
.loginBtn--google:focus {
  background: #E74B37;
}

</style>

