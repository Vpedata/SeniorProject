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
                <v-col cols="6">
                <v-card class="mx-12" elevation="12" height="600px" max-height="600px">
                    <v-toolbar dark flat>
                    <v-toolbar-title class="white--text">Messages</v-toolbar-title>
                    </v-toolbar>
                </v-card>
                <v-list style="max-height: 600px" class="overflow-y-auto">
                    <messageComponent class="mt-n1" v-for="message in messages" :message="message" :key="message"/>
                </v-list>
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
            messages: JSON,
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
            let studentMessagesUrl = '/user/advisor/messages/'+ result.student_ID;
            axios.get(studentMessagesUrl)
            .then(response =>{
            var obj = response.data[0]; 
            this.messages= Object.keys(obj).map(key => obj[key]);
            console.info(this.messages);
            })
            .catch(error =>{
                console.log(error)
            });
        },
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