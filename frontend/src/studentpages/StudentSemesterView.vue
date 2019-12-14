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
                    <v-btn  @click="$router.push('/fe/editcompleted')" dark>Edit Completed</v-btn>
                    <v-btn  @click="$router.push('/fe/studentaddclasspage')" dark>Add Class</v-btn>
                    <v-btn  @click="$router.push('/fe/classlist')" dark>Class List</v-btn>
                    <v-btn  @click="$router.push('/fe/messages')" dark>Messages</v-btn>
                    <v-btn  @click="logout" dark>Logout</v-btn>
                </v-toolbar-items>
                </v-toolbar>
            </v-row>
            <v-row>
                <v-col cols="3"></v-col>
                <v-col cols="6">
                    <v-toolbar dark flat dense class="mx-auto" width="300px">
                        <v-toolbar-title dense class="white--text">Current Semester: {{this.currSem.currSemester}}</v-toolbar-title>    
                    </v-toolbar>
                </v-col>
            </v-row>

            <v-row v-if="this.currSem !== ' '">
                <v-col cols="4" v-for="(semester,index) in semesterView" :key="semester" >
                    <v-card class="ms-2" elevation="12" max-height="350px" width="500px">
                        <v-toolbar dark flat>
                            <v-toolbar-title class="white--text">Semester {{index}}</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-toolbar-title class="white--text" >Credits: {{semester.semCredits}}  </v-toolbar-title>    
                        </v-toolbar>
                        <v-list style="max-height: 600px" class="overflow-y-auto">
                            <classComponent class="mt-n1" v-for="course in semester.semCourses" :course="course" :key="course.course_ID"/>
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
        semesterView : [[]],


  }),
  components: {
        classComponent,
    },
    methods: {
        logout: function () {
            axios.get("/auth/logout").then(response =>{
                this.$router.push('/');
            }).catch(err =>{
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
        let currSemUrl = '/user/student/getmyCurrSem';
        axios.get(currSemUrl)
        .then(response =>{
            this.currSem= response.data[0][0];
        })
        .catch(error =>{
                console.log(error)
        });


        let coursesYetToTakeUrl = '/user/student/courses/yetToTakePreReqs';
        axios.get(coursesYetToTakeUrl)
        .then(response =>{
            var obj = response.data[0]; 
            var allCourses = Object.keys(obj).map(key => obj[key]);
            var courses = []; 
            var totalCredits = 0;
            var creditCount = 0;
            for (var i = 0; i < allCourses.length; i++){
                totalCredits = totalCredits + allCourses[i].creditHours;
            }
            for (var i = 0; i < allCourses.length; i++){
                creditCount = creditCount + allCourses[i].creditHours;
                if(creditCount<=17){
                    courses.push(allCourses[i]);
                    totalCredits = totalCredits - allCourses[i].creditHours;
                    delete allCourses[i];
                }
                else {
                    var semester = {
                        semCourses : courses, 
                        semCredits: creditCount-allCourses[i].creditHours
                    }
                    this.semesterView.push(semester);
                    courses=[];
                    if(totalCredits <= 17){
                        creditCount = 0;
                        break;
                    }
                    creditCount=allCourses[i].creditHours;
                    courses.push(allCourses[i]);
                    totalCredits = totalCredits - allCourses[i].creditHours;
                    delete allCourses[i];
                }
                    
            }
            console.info(allCourses);
            for ( var course in allCourses){
                console.info(allCourses[course])
                creditCount = creditCount + allCourses[course].creditHours;
                courses.push(allCourses[course]);
            }
            var semester = {
                semCourses : courses, 
                semCredits: creditCount
            }
            this.semesterView.push(semester);
        })
        .catch(error =>{
            console.log(error)
        });
    }
};
</script>
