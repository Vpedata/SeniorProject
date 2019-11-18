<!-- Login page prototype vue code template (builds the login page) -->
<template>
    <div id="login" class = "full-container">
        <div class = "centered-div">
          <v-card class="mt-n16 mx-auto vCard" elevation="12" height="100%" width="100%">
            <v-card-title class="v-card-title">Online Advisor</v-card-title>
            <form class = "centered-form" action="/auth/login" method="get">
                <div class="form-group">
                    <button class="loginBtn loginBtn--google">Login With Google</button>
                </div>
            </form>
        </v-card>
        </div>
    </div>
</template>

<!-- Page Vue Script -->
<script>
//imports vuex state and action mapping functions
import { mapState, mapActions } from 'vuex'
const backgroundImg = require("../assets/login_background.png");
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
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -200px;
  height: 220px;
  width: 400px;

}

.v-card-title{
    justify-content: center;
    font-size: 36px;
    color: #FFCC00;
}

.vCard{
    background-color: rgba(81, 80, 80, 0.90);
}

.centered-form{
    position: center;
  top: 50%;
  transform: translateY(100%);
}

.full-container{
    height:100%;
    width: 100%;
    background-image: url('~@/assets/login_background.png');
    background-size: cover;
}

.loginBtn {
  box-sizing: border-box;
  position: relative;
  justify-content: center;
  /* width: 13em;  - apply for fixed size */
  border: none;
  width: 250px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  white-space: nowrap;
  border-radius: 20px;
  font-size: 24px;
  color: #FFCC00;
}

.loginBtn--google {
  /*font-family: "Roboto", Roboto, arial, sans-serif;*/
  background: #57150B;
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
  background: #57150B;
}
.loginBtn--google:hover,
.loginBtn--google:focus {
  background: #57150B;
}

</style>

