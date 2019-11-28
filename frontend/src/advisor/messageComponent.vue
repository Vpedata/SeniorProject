<template>
    <v-list-item>
            <v-list-item-content>
                <v-list-item-title><span :class="{'float-left':message.sender === student.user_ID}">
                                {{message.message}}
                                <small>:{{student.name}}</small>
                </span>
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item> 
</template>

<script>
import axios from 'axios';
export default {
    name: "messageComponent",
    props: {
        message: Object,
        student: Object,
    },
    data: () => ({
    }),
}
</script>