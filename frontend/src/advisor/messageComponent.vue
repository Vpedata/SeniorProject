<template>
    <v-list-item dense :elevated="15" two-line >
            <v-list-item-content>
                <v-list-item-title>
                    <span :class="classObject">
                        <p style="font-size:20px; border:2px; border-radius:25px;"><span style="color:blue">{{message.user}}: </span>{{message.message}}</p>
                    </span>
                </v-list-item-title>
            </v-list-item-content>
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


