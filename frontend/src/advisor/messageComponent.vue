<template>
    <v-list-item>
            <v-list-item-content>
                <v-list-item-title>{{message.content}}</v-list-item-title>
            </v-list-item-content>
        </v-list-item> 
</template>

<script>
import axios from 'axios';
export default {
    name: "classComponent",
    props: {
        message: Object,
    },
    data: () => ({
        dialog: false
    }),
}
</script>