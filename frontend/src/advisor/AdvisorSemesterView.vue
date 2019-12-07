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
                    <v-btn  class ="success"  @click="$router.push('/fe/adv/advisor')"  dark>Back</v-btn>
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
                <v-col cols="3"></v-col>
                <v-col cols="6">
                    <v-toolbar dark flat dense class="mx-auto" width="300px">
                        <v-toolbar-title dense class="white--text">Current Semester: {{this.currSem.currSemester}}</v-toolbar-title>    
                    </v-toolbar>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="3"></v-col>
                <v-col cols="6">
                    <v-card class="ms-2" elevation="12" height="600px" max-height="600px" width="500px">
                        <v-toolbar dark flat>
                            <v-toolbar-title class="white--text">Courses Yet To Take</v-toolbar-title>    
                        </v-toolbar>
                        <v-list style="max-height: 600px" class="overflow-y-auto">
                            <classComponent class="mt-n1" v-for="course in coursesYetToTake" :course="course" :key="course.course_ID"/>
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
        coursesYetToTake:JSON,
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
            this.student_ID= result.student_ID;
            let currSemUrl = '/user/advisor/student/curSem/'+result.student_ID;
             axios.get(currSemUrl)
            .then(response =>{
            this.currSem= response.data[0][0];
            })
            .catch(error =>{
                console.log(error)
            });

            let coursesYetToTakeUrl = '/user/advisor/student/'+ result.student_ID +'/yetToTake';
            axios.get(coursesYetToTakeUrl)
            .then(response =>{
                var obj = response.data[0]; 
                var allCourses = Object.keys(obj).map(key => obj[key]);
                this.coursesYetToTake= Object.keys(obj).map(key => obj[key]);
                while(allCourses.length){
                    var i = 0; 
                    var creditCount = 0;
                    var courses = []    
                    while (creditCount <= 17 ) {
                        console.info(allCourses[i]);
                        creditCount = creditCount + allCourses[i].creditHours;
                        courses.push(allCourses[i]);
                        delete allCourses[i];
                        i++;
                    }
                    semesterView.push(courses);
                    console.info(courses);
                }
                console.info(semseterView);
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
      })
  }
};
</script>
