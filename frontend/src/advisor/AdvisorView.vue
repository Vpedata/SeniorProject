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
                    <v-btn  @click="$router.push('/fe/adv/createcourse')" dark>Create New Course</v-btn>
                    <v-btn  @click="$router.push('/fe/classlist')" dark>View Class List</v-btn>
                    <v-btn  @click="$router.push('/messages')" dark>Messages</v-btn>
                    <v-btn  @click="logout" dark>Logout</v-btn>
                </v-toolbar-items>
                </v-toolbar>
            </v-row>
            <v-row>
                <v-col cols="3"></v-col>
                <v-col cols="6">
                    <autocomplete :search="search" placeholder="Search Student" aria-label="Search Student" 
                    :get-result-value="getResultValue" ></autocomplete>
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
        students:JSON
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
            return result.name + "("  + result.email  + ")"; 
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
