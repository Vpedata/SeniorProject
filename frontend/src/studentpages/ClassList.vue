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
                    <v-btn  @click="$router.push('/fe/student')" dark>Home</v-btn>
                    <v-btn  @click="$router.push('/fe/messages')" dark>Messages</v-btn>
                    <v-btn  @click="logout" dark>Logout</v-btn>
                </v-toolbar-items>
                </v-toolbar>
            </v-row>
            <v-row>
            </v-row>
            <v-row>
                <v-col cols="3"></v-col>
                <v-col cols="9" lg="6">
                <v-card class="mt-n16 mx-auto" elevation="12" height="600px">
                    <v-toolbar flat dark>
                        <v-toolbar-title>Course List</v-toolbar-title>
                    </v-toolbar>
                    <v-list style="max-height: 600px" class="overflow-y-auto">
                        <classComponent v-for="course in courses" :course="course" :key="course.course_ID"/> 
                    </v-list>                  
                </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="8">
                    <v-btn class="mt-12 ma-12" outlined color="blue" @click="$router.push('/fe/student')" dark>Back</v-btn>
                </v-col>
            </v-row>
        </div>
    </v-app>
    <div class="mt-12"></div>
    </div>
</template>


<script>
import { mapState, mapActions } from 'vuex'
import classComponent from './classListComponent.vue'
import axios from 'axios'
export default {
    computed: {
        ...mapState({
            account: state => state.account,
        })
    }, 
    data: () => ({
        dialog: false,
        name: " ",
        courses: JSON
    }),

    components: {
        classComponent
    },

    beforeMount(){
      axios
      .get('/user/getName')
      .then(response => {
        this.name = response.data.firstName + " " + response.data.lastName;
      })
      .catch(error => {
        console.log(error)
      });

      axios.get('/course/all')
      .then(response =>{
         var obj = response.data[0]; 
         this.courses = Object.keys(obj).map(key => obj[key]);
         console.info(this.courses);
      })
      .catch(error =>{
          console.log(error)
      })
  }
};
</script>
