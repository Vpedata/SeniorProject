<template>
<v-app id="inspire">
        <div class="text-center">
            <v-btn class="ma-2" outlined color="indigo" @click="$router.push('/user')" dark>Refresh</v-btn>
        </div>
        <div class="text-center">
            <v-btn class="ma-2" outlined color="indigo" @click="logout" dark>To Login Page</v-btn>
        </div>
    </v-app>
</template>

<script>
export default {
    name: 'Student',
    data () {
    return {
      msg: 'Welcome to THe student Page'
    }
    }
}
</script>