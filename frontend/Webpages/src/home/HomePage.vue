<template>
    <div>
        <h1>Hi {{account.user.firstName}}</h1>
        <p>You're logged in!</p>
        <h3>User List:</h3>
        <em v-if="users.loading">Loading users...</em>
        <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span>
        <ul v-if="users.items">
            <li v-for="user in users.items" :key="user.id">
                {{user.firstName + ' ' + user.lastName}}
                <span v-if="user.deleting"><em> - Deleting...</em></span>
                <span v-else-if="user.deleteError" class="text-danger"> - ERROR: {{user.deleteError}}</span>
                <span v-else> - <a @click="deleteUser(user.id)" class="text-danger">Delete</a></span>
            </li>
        </ul>
        <p>
            <router-link to="/login">Logout</router-link>
        </p>
        <v-app id="inspire">
            <div class="text-center">
                <v-btn class="ma-2" outlined color="indigo" @click="$router.push('/studentview')" dark>Student View</v-btn>
                <v-btn class="ma-2" outlined color="indigo" @click="$router.push('/advisorview')" dark>Advisor View</v-btn>
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
            users: state => state.users.all
        })
    },
    created () {
        this.getAllUsers();
    },
    methods: {
        ...mapActions('users', {
            getAllUsers: 'getAll',
            deleteUser: 'delete'
        })
    }
};
</script>