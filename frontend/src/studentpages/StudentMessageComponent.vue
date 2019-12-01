<template>
    <v-list-item>
            <v-list-item-content>
                <v-list-item-title>
                    <span :class="['classObject', 'message', this.messageType]">
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
            messageType: '',
        }
    },
    beforeMount() {
      axios.get('/user/getmyid')
           .then(response => {
              this.userID = response.data;
              if(message.isFromUser) {
                  if(this.userID == message.reciever) {
                      this.messageType = 'received';
                  } else {
                      this.messageType = 'sent';
                  }
               } else {
                  this.messageType = 'system';
               }
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

<style scoped>
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
}

.received .text {
    background: #602e00;
    color: #ffffff;
}

.sent {
    text-align: right;
}

.sent .text {
     background: #ffee00;
 }

.system {
    text-align: center;
    border-top-style: solid;
    border-bottom-style: solid;
    border-color: #000000;
    border-width: 2px;  
}

.system .text {
    background: transparent;
    color: #555555;
}
</style>
