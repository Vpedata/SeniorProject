<template>
<v-app id="inspire">
        <div class="text-center">
            <v-btn class="ma-2" outlined color="indigo" @click="$router.push('/user')" dark>Refresh</v-btn>
        </div>
        <div class="text-center">
            <b-btn @click="logout()">To Login Page</b-btn>
        </div>
    </v-app>
</template>

<script>
export default {
    name: 'Student',
  methods: {
    logout(){
        $http.get("http://onlineadvisor.tk:3000/auth/logout");
        $router.push('/');
    }
},
    data () {
    return {
      msg: 'Welcome to THe student Page'
    }
    }
}
</script>
