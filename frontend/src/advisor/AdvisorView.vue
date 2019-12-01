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
                    <v-btn  @click="$router.push('/fe/classlistadvisor')" dark>View Course List</v-btn>
                    <v-btn  @click="$router.push('/fe/adv/messages')" dark>Messages</v-btn>
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
                    <v-toolbar dark flat dense class="mx-auto" width="300px">
                        <v-toolbar-title dense class="white--text">Current Semester: {{this.currSem.currSemester}}</v-toolbar-title>    
                    </v-toolbar>
                </v-col>
                <v-col cols="6">
                    <studentSelectedCoursesComponent :studentSelectedCoursesCredits="studentSelectedCoursesCredits" :studentSelectedCourses="studentSelectedCourses"/>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <v-card class="mx-12" elevation="12" height="600px" max-height="600px">
                        <v-toolbar dark flat>
                            <v-toolbar-title class="white--text">Courses Taken</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-toolbar-title class="white--text">Credits: {{this.creditsTaken.Credits}}</v-toolbar-title>
                        </v-toolbar>
                        <v-list style="max-height: 600px" class="overflow-y-auto">
                            <classComponent class="mt-n1" v-for="course in coursesTaken" :course="course" :key="course.course_ID"/>
                        </v-list>                  
                    </v-card>
                </v-col>
                <v-col cols="6">
                    <v-card class="mx-12" elevation="12" height="600px" max-height="600px">
                        <v-toolbar dark flat>
                            <v-toolbar-title class="white--text">Recommended Courses</v-toolbar-title>    
                        </v-toolbar>
                        <v-list style="max-height: 600px" class="overflow-y-auto">
                            <classComponent class="mt-n1" v-for="course in coursesRecommended" :course="course" :key="course.course_ID"/>
                        </v-list>       
              
                    </v-card>
                </v-col>

            </v-row>
        </div>
    </v-app>
    <div class="mt-12"></div>
    </div>
</template>


<script>
import { mapState, mapActions } from 'vuex'
import axios from 'axios';
import router from '../router/index.js'
import classComponent from '../studentpages/classListComponent.vue'
import studentSelectedCoursesComponent from "./studentSelectedCoursesComponent"


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
        student_ID:"",
        currSem: " ",
        creditsTaken: " ",
        coursesTaken:JSON,
        coursesRecommended:JSON,
        studentSelectedCourses:JSON,
        studentSelectedCoursesCredits:" "

  }),
  components: {
        classComponent
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
            let coursesTakenUrl = '/user/advisor/student/'+ result.student_ID +'/taken';
            axios.get(coursesTakenUrl)
            .then(response =>{
            var obj = response.data[0]; 
            this.coursesTaken= Object.keys(obj).map(key => obj[key]);
            console.info(this.coursesTaken);
            })
            .catch(error =>{
                console.log(error)
            });
            let coursesRecommendedUrl = '/user/advisor/student/'+ result.student_ID +'/recommended';
            axios.get(coursesRecommendedUrl)
            .then(response =>{
            var obj = response.data[0]; 
            this.coursesRecommended= Object.keys(obj).map(key => obj[key]);
            console.info(this.coursesRecommended)
            })
            
            .catch(error =>{
                console.log(error)
            });

            let currSemUrl = '/user/advisor/student/curSem/'+result.student_ID;
             axios.get(currSemUrl)
            .then(response =>{
            this.currSem= response.data[0][0];
            })
            .catch(error =>{
                console.log(error)
            });
            
             let creditsTakenUrl = '/user/advisor/student/takenCredits/'+result.student_ID;
             axios.get(creditsTakenUrl)
            .then(response =>{
            this.creditsTaken= response.data[0][0];
            console.info(this.creditsTaken);
            })
            .catch(error =>{
                console.log(error)
            });
        },
        getStudentSelectedCourses: function(){
            let studentSelectedCoursesUrl = '/user/advisor/student/'+result.student_ID+'/studentRecommended';
            axios.get(studentSelectedCoursesUrl).then(response =>{
            var obj = response.data[0];
            var allCourses = Object.keys(obj).map(key => obj[key]);
            let credits = 0;

            for (var i = 0; i < allCourses.length; i++){
                credits = credits + allCourses[i].creditHours;
            }
            this.studentSelectedCoursesCredits = credits;
            this.studentSelectedCourses = allCourses;
        })
        .catch(err =>{
            console.log(err);
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
      })
  }
};
</script>
