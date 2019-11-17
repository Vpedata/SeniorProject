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
                    <v-btn  @click="$router.push('/fe/classlistadvisor')" dark>View Class List</v-btn>
                    <v-btn  @click="$router.push('/messages')" dark>Messages</v-btn>
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
                <v-col cols="1"></v-col>
                <v-col cols="4">
                    <v-card class="mx-auto" elevation="12" height="600px">
                        <v-toolbar flat>
                            <v-toolbar-title class="grey--text">Courses Taken</v-toolbar-title>
                        </v-toolbar>
                        <v-list style="max-height: 600px" class="overflow-y-auto">
                            <v-toolbar dark>
                                <v-toolbar-title class="white--text">Class1</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-btn class="ma-1">Edit</v-btn>
                                <v-btn class="ma-1">Remove</v-btn>
                            </v-toolbar>
                        </v-list>                  
                    </v-card>
                </v-col>
                <v-col cols="1"></v-col>
                <v-col cols="4">
                    <v-card class="mx-auto" elevation="12" height="600px">
                        <v-toolbar flat>
                            <v-toolbar-title class="grey--text">Recommended Courses</v-toolbar-title>
                        </v-toolbar>
                        <v-list style="max-height: 600px" class="overflow-y-auto">
                        
                        </v-list>                  
                    </v-card>
                </v-col>

            </v-row>
        </div>
    </v-app>
    </div>
</template>


<script>
import { mapState, mapActions } from 'vuex'
import axios from 'axios';
import router from '../router/index.js'


export default {
    computed: {
        ...mapState({
            account: state => state.account,
        })
    }, 
    data: () => ({
        dialog: false,
        name: " ",
        students:JSON,
        student_ID:-1,
        coursesTaken:JSON,
        coursesRecommended:JSON
  }),
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
            axios.get("/user/advisor/student/${result.student_ID}/taken")
            .then(response =>{
            var obj = response.data[0]; 
            this. coursesTaken= Object.keys(obj).map(key => obj[key]);
            })
            .catch(error =>{
                console.log(error)
            }),

            axios.get("/user/advisor/student/${result.student_ID}/recommended")
            .then(response =>{
            var obj = response.data[0]; 
            this. coursesRecommended= Object.keys(obj).map(key => obj[key]);
            })
            .catch(error =>{
                console.log(error)
            })
        }
        
    },

    beforeMount(){
      axios
      .get('/user/getName')
      .then(response => {
        this.name = response.data.firstName + " " + response.data.lastName;
      }).bind(this)
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
      })
  }
};
</script>
