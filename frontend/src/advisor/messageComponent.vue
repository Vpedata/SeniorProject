<template>
    <v-list-item>
            <v-list-item-content>
                <v-list-item-title>
                    <span :class="classObject">
                        <small>{{message.user}}</small>:{{message.message}}
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
    },
    created: function() {
    },
    computed: {
        classObject: function() {
            if(this.message.userType){
                return "float-left"; //student is sending the message
            }
            else{
                return "float-right"; //advisor is sending the message
            }
        }

    },
    data: function() {
        return {
        } 
    }
}
</script>