<template>
<v-app id="inspire">
        <div class="text-center">
            <v-btn class="ma-2" outlined color="indigo" @click="$router.push('/messages')" dark>Refresh</v-btn>
        </div>
        <div class="text-center">
            <v-btn class="ma-2" outlined color="indigo" @click="$router.push('/login')" dark>To Login Page</v-btn>
        </div>
    </v-app>
</template>

<script>
export default {
    
}
</script>