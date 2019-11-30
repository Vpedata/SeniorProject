<template>
    <v-list-item :class="message{{message.isFromUser ? (message.reciever == this.userID ? ' received' : ' sent') : ' system'}}">
            <v-list-item-content>
                <v-list-item-title>
                    <span :class="classObject">
                        <small>{{message.user}}</small>
                        <div :class="text">
                            :{{message.message}}
                        </div>
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

<style>
.message {
    margin: 10px 0;
    width: 100%;
}

.text {
    max-width: 300px;
    border-radius: 5px;
    padding: 12px;
    display: inline-block;
}

.received {
    text-align: left;
    
    .text {
        background: #602e00;
        color: #ffffff;
    }
}

.sent {
    text-align: right;
    
    .text {
        background: #ffee00;
    }
}

.system {
    text-align: center;
    border-top-style: solid;
    border-bottom-style: solid;
    border-color: #000000;
    border-width: 2px;

    .text {
        background: transparent;
        color: #555555;
    }
}
</style>
