<template>
    <div id="app">
    <v-app id="inspire">
        <div class="amber lighten-5 pa-4 full-screen">
            <v-row>
                <v-toolbar color="amber darken-1" dark>
                <v-toolbar-title class="brown--text">
                    {{name}}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn  @click="$router.push('/fe/adv/advisor')" dark>Home</v-btn>
                    <v-btn  @click="$router.push('/fe/classlistadvisor')" dark>View Course List</v-btn>
                    <v-btn  @click="logout" dark>Logout</v-btn>
                </v-toolbar-items>
                </v-toolbar>
            </v-row>
            <v-row>
                <v-col cols="3"></v-col>
                <v-col cols="6">
                    <autocomplete :search="search" placeholder="Search Student" aria-label="Search Student" 
                    :get-result-value="getResultValue" @submit="handleSubmit" ></autocomplete>
                </v-col>
            </v-row>
            <div v-if="this.userFound">
                <v-row>
                    <v-col cols="2"></v-col>
                    <v-col cols="8">
                    <v-card class="mx-12" elevation="12" max-height="600px">
                        <v-toolbar dark flat>
                        <v-toolbar-title class="white--text">{{student.name}}</v-toolbar-title>
                        </v-toolbar>
                    <v-card-text>
                    <v-list style="max-height: 500px" class="overflow-y-auto">
                        <messageComponent class="mt-n1" v-for="message in messagesList" 
                        :message="message" :key="message"/>
                        <small v-if="typing" >{{typing}} is typing</small>
                    </v-list>
                    </v-card-text>
                    </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="2"></v-col>
                    <v-col cols="8">
                    <v-textarea append-outer-icon="mdi-send" @click:append-outer="sendMessage" 
                    class="mx-2" v-model="newMessage" filled rows="1" auto-grow>
                    </v-textarea>
                    </v-col>
                </v-row>
            </div>
        </div>
    </v-app>
    </div>
</template>
                


<script>
var socket = io();
import axios from 'axios';
import router from '../router/index.js';
import messageComponent from './messageComponent'
export default {
    components: {
        messageComponent
    },
    data() {
        return {
            name: '',
            students: JSON,
            student: JSON,
            messages: JSON,
            newMessage: "",
            messagesList:[],
            userFound: false,
            typing: false

        }
    },
    methods: {
        logout: function () {
            axios.get("/auth/logout").then(response =>{
                this.$router.push('/');
            }).catch(err =>{
                console.log(err);
            });
        },
        search(input) {
            
            if (input.length < 1) { return [] }
            return this.students.filter(student => {
            return student.name.toLowerCase()
            .startsWith(input.toLowerCase())
            })
        },
        getResultValue(result) {
            return result.name + " ("  + result.email  + ")"; 
        },
        handleSubmit(result) {
            this.userFound = true;
            this.student = result;
            this.messagesList=[];
            let studentMessagesUrl = '/user/advisor/messages/'+ result.student_ID;
            axios.get(studentMessagesUrl)
            .then(response =>{
            var obj = response.data[0]; 
            this.messages= Object.keys(obj).map(key => obj[key]);
            for (var i = 0; i < this.messages.length; i++){
                var sendingUser = this.name;
                var userType = 0; //Advisor is sending the message
                if(this.messages[i].sender === this.student.user_ID){
                    sendingUser=this.student.name;
                    userType = 1; //Student is sending the message
                }
                let previousMessage = {
                    message:  this.messages[i].content,
                    user: sendingUser,
                    userType: userType
                }
                this.messagesList.push(previousMessage);
            }
            console.info(this.messagesList);
            })
            .catch(error =>{
                console.log(error)
            });
        },
        sendMessage() {
            axios.post('/user/advisor/messages/new',{
                messageString:this.newMessage,
                student_ID:this.student.student_ID
            }).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
            
            socket.emit('chat', {
                message: this.newMessage,
                user: this.name,
                userType: 0 //advisor is sending the message
            });
            this.newMessage = null;
        },
    },
    created() {
            
        socket.on('chat', (data) => {
            this.messagesList.push({
            message: data.message,
            user: data.user,
            userType:data.userType
            });
        });
        
        socket.on('typing', (data) => {
            this.typing = data;
        });
        
        socket.on('stopTyping', () => {
            this.typing = false;
        });

    },

    watch: {
        newMessage(value) {
            value ? socket.emit('typing', this.name) : socket.emit('stopTyping');
        }
    },
    beforeMount(){
      axios
      .get('/user/getName')
      .then(response => {
        this.name = response.data.firstName + " " + response.data.lastName;
      })
      .catch(error => {
        console.log(error)
      })
    },
    mounted() {
        axios.get('/user/advisor/student/all')
      .then(response =>{
         var obj = response.data[0]; 
         this.students = Object.keys(obj).map(key => obj[key]);
      })
      .catch(error =>{
          console.log(error)   
      });
    },
}

</script>