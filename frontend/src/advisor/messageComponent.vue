<template>
    <v-list-item>
            <v-list-item-content>
                <v-list-item-title>
                    <span :class="classObject">
                        <p style="font-size:24px;">{{message.user}}:{{message.message}}</p>
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
    data() {
        return {
            userID: -1,
        }
    },
    beforeMount() {
        axios.get('/user/getmyid')
             .then(response => {
                this.userID = response.data;
              });
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
}
</script>


