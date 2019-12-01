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
                <v-col cols="1"></v-col>
                <v-col cols="5">
                <v-card class="mt-n16 mx-auto" elevation="12" height="600px" max-height="600px">
                    <v-toolbar flat dark>
                        <v-toolbar-title>Untaken Courses</v-toolbar-title>
                    </v-toolbar>
                    <v-list style="max-height: 600px" class="overflow-y-auto">
                        <classComponent v-for="course in yetToTake" :course="course" :key="course.course_ID" @transfer="transfer_course"/> 
                    </v-list>                  
                </v-card>
                </v-col>
                <v-col cols="5">
                <v-card class="mt-n16 mx-auto" elevation="12" height="600px" max-height="600px">
                    <v-toolbar flat dark>
                        <v-toolbar-title>Taken Courses</v-toolbar-title>
                    </v-toolbar>
                    <v-list style="max-height: 600px" class="overflow-y-auto">
                        <classComponent v-for="course in taken" :course="course" :key="course.course_ID" @transfer="transfer_course"/> 
                    </v-list>                  
                </v-card>
                </v-col>
            </v-row>
            <v-btn class="mx-auto mt-12" width="140" dark color="orange" @click="$router.push('/fe/student')">Save</v-btn>
        </div>
    </v-app>
    </div>
</template>


<script>
import { mapState, mapActions } from 'vuex'
import classComponent from './classListComponentCompleted.vue'
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
        taken: JSON,
        yetToTake: JSON,
        id: ""
    }),

    components: {
        classComponent,
    },
    methods: {
        logout(e) {
            axios.get("/auth/logout").then(response =>{
                this.$router.push('/');
            }).catch(err =>{
                console.log(err);
            });
        },
        transfer_course: function(course,grade) {
                course.grade = grade;
                course.dialog = false;
                if (this.yetToTake.indexOf(course)==-1){
                    this.yetToTake.push(course)
                    this.taken.splice(this.taken.indexOf(course),1)
                }
                else if (this.taken.indexOf(course)==-1){
                    this.taken.push(course)
                    this.yetToTake.splice(this.yetToTake.indexOf(course),1)
                };
        },
        update_completed: function() {
            //WIP
            axios.post("/user/student/courses/taken", {
                classes: this.taken,
                student_ID: this.id
          }).then(function (response) {
              console.log(response);
          })
          .catch(function (error) {
              console.log(error);
          });
          
            
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
      });

      axios
      .get('/user/getmyid')
      .then(response => {
        this.id = response.data.user_ID;
      })
      .catch(error => {
        console.log(error)
      });

      axios.get('/user/student/courses/taken')
      .then(response =>{
         var obj = response.data[0]; 
         this.taken = Object.keys(obj).map(key => obj[key]);
         console.info(this.courses);
      })
      .catch(error =>{
          console.log(error)
      })

      axios.get('/user/student/courses/yetToTake')
      .then(response =>{
         var obj = response.data[0]; 
         this.yetToTake = Object.keys(obj).map(key => obj[key]);
         this.$set(this.yetToTake, grade, '')
         console.info(this.selected);
      })
      .catch(error =>{
          console.log(error)
      })
  }
};
</script>

