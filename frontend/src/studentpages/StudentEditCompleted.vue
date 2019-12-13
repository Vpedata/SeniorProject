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
                <v-card class=" mx-auto" width="800px" elevation="12" height="500px" max-height="500px">
                    <v-toolbar flat dark>
                        <v-toolbar-title>Core Courses</v-toolbar-title>
                    </v-toolbar>
                    <v-list style="max-height: 436px" class="overflow-y-auto">
                        <classComponent v-for="course in avail_courses.filter(avail_iscore)" :course="course" :key="course.course_ID" :taken="false" @transfer="transfer_course"/> 
                    </v-list>                  
                </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                <v-card class=" mx-auto" width="800px" elevation="12" height="500px" max-height="500px">
                    <v-toolbar flat dark>
                        <v-toolbar-title>Non-Core Courses</v-toolbar-title>
                    </v-toolbar>
                    <v-list style="max-height: 436px" class="overflow-y-auto">
                        <classComponent v-for="course in avail_courses.filter(!avail_iscore)" :course="course" :key="course.course_ID" :taken="false" @transfer="transfer_course"/> 
                    </v-list>                  
                </v-card>
                </v-col>
            </v-row>
            <v-spacer></v-spacer>
            <v-btn class="mx-auto mt-12" width="140" dark color="orange" @click="update_completed">Save</v-btn>
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
        }),
        avail_iscore: function(c) {
            return c.isCore
        }
    }, 
    data: () => ({
        dialog: false,
        name: " ",
        taken: JSON,
        avail_courses: JSON,
        id: "",

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
                course.dialog = false
                course.grade = grade;
        },
        update_completed: function() {
            let temp_index = 0
            let update_courses = ""
            let update_grades = ""
            for (var i=0 ;i<this.avail_courses.length; i++){
                let check_course = this.avail_courses[i].courseCode
                let check_grade = this.avail_courses[i].grade
                if (check_grade) {
                    update_courses = update_courses + check_course + ","
                    update_grades = update_grades + check_grade + ","
                    temp_index ++
                }
            }
            if (temp_index > 0) {
                update_courses = update_courses.substring(0, update_courses.length - 1);
                update_grades = update_grades.substring(0, update_grades.length - 1);
            }
            
            console.info(update_courses);
            console.info(update_grades);          
            
            axios.post("/user/student/courses/taken", {
                classes: update_courses,
                grades: update_grades
            }).then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            })
            
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
         console.info(this.taken);
      })
      .catch(error =>{
          console.log(error)
      })

      axios.get('/user/student/courses/yetToTake')
      .then(response =>{
         var obj = response.data[0]; 
         this.avail_courses = Object.keys(obj).map(key => obj[key]);
         console.info(this.avail_courses);
      })
      .catch(error =>{
          console.log(error)
      })
  }
};
</script>

