<template>
    <div id="app">
    <v-app id="inspire">
        <div class="amber lighten-5 pa-4">
            <v-row>
                <v-toolbar color="amber darken-1" dark>
                <v-toolbar-title class="brown--text">
                    {{name}}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn  @click="$router.push('/fe/adv/advisor')" dark>Home</v-btn>
                    <v-btn  @click="$router.push('/fe/classlistadvisor')" dark>View Class List</v-btn>
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
            <v-row>
                <v-col cols="2"></v-col>
                <v-col cols="8">
                <v-card class="mx-12" elevation="12" max-height="600px">
                    <v-toolbar dark flat>
                    <v-toolbar-title class="white--text">{{student.name}}</v-toolbar-title>
                    </v-toolbar>
                <v-card-text>
                <v-list style="max-height: 500px" class="overflow-y-auto">
                    <messageComponent class="mt-n1" v-for="message in messages" 
                    :message="message" :student="student" :name="name" :key="message"/>
                </v-list>
                </v-card-text>
                <v-card-actions>
                <v-textarea append-outer-icon="mdi-send" @click:append-outer="sendMessage" 
                class="mx-2" v-model="newMessage" filled rows="1" auto-grow>
                </v-textarea>
                </v-card-actions>
                </v-card>
                </v-col>
            </v-row>
        </div>
    </v-app>
    </div>
</template>
                


<script>
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
            this.student = result;
            let studentMessagesUrl = '/user/advisor/messages/'+ result.student_ID;
            axios.get(studentMessagesUrl)
            .then(response =>{
            var obj = response.data[0]; 
            this.messages= Object.keys(obj).map(key => obj[key]);
            for (var i = 0; i < this.messages.length; i++){
                var sendingUser = "";
                var receivingUser= "";
                if(this.message[i].sender === this.student.user_ID){
                    sendingUser=this.student.name;
                }
                else{
                    sendingUser=this.name;
                }
                let previousMessages = {
                    messages =  this.messages[i],
                    user = sendingUser,
                }
                this.messagesList.push(previousMessages);
            }
            })
            .catch(error =>{
                console.log(error)
            });
        },
        sendMessage() {
            axios.post('/user/advisor/messages/new',{
                messageString=this.newMessage,
                student_ID=this.student.student_ID
            }).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
            
            socket.emit('chat', {
                message: this.newMessage,
                user: this.name
            });
            this.newMessage = null;
        },
    },
    created() {
            
        socket.on('chat', (data) => {
            this.messages.push({
            message: data.message,
            type: 1,
            user: data.user,
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
            value ? socket.emit('typing', this.username) : socket.emit('stopTyping');
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