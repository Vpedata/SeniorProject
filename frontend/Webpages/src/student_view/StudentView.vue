<template>
    <div class="view">
        <h1>{{account.user.firstName}} {{account.user.lastName}}</h1>
        <h2>{{account.user.email}}</h2>
        <router-link to="/login">Logout</router-link>
        <v-app id="inspire">
            <div class="text-center">
            <v-btn class="ma-2" outlined color="indigo" @click="$router.push('/studentview')" dark>Do Nothing Yet</v-btn>
            </div>
        </v-app>
    </div>
</template>


<script>
import { mapState, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState({
            account: state => state.account,
        })
    }
};
</script>