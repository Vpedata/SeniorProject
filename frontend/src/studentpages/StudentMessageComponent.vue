<template>
    <v-list-item dense :elevated="15" two-line >
            <v-list-item-content>
                <v-list-item-title>
                    <span :class="classObject">
                        <span style="font-size:20px;"><p style="color:blue">{{message.user}}</p>{{message.message}}</span>
                    </span>
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item> 
</template>

<script>

import axios from 'axios';
export default { 
    name: "StudentMessageComponent",
    props: {
        message: Object,
    },
 
    computed: {
        classObject: function() {
            if(!this.message.userType){
                return "float-left"; //student is sending the message
            }
            else{
                return "float-right"; //advisor is sending the message
            }
        }

    },

}
</script>
