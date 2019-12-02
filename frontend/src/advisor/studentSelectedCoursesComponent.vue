<template>
    <div>
    <v-btn class="mb-4 mx-auto" outlined color="#FF0000" v-on:click="dialog=true" dark >
        Student Selected Courses
    </v-btn>
    <v-dialog v-model="dialog" width="600px" >
      <v-card class="mx-12" elevation="12" height="600px" max-height="600px">
        <v-toolbar dark flat>
        <v-toolbar-title class="white--text">Student Selected Courses</v-toolbar-title>    
        </v-toolbar>
        <v-list style="max-height: 600px" class="overflow-y-auto">
            <classComponent class="mt-n1" v-for="course in studentSelectedCourses" :course="course" :key="course.course_ID"/>
        </v-list>       
      </v-card>
    </v-dialog>
    </div>
</template>
<script>
import axios from 'axios';
import classComponent from '../studentpages/classListComponent.vue'
export default {
    name: "studentSelectedCoursesComponent",
    components: {
        classComponent,
    },
    props: {
        student_ID : Number
    },
    data: () => ({
        dialog: false,
        studentSelectedCourses:JSON,
        studentSelectedCoursesCredits:""
    }),
    method: {
        getStudentSelectedCourses: function(){
            dialog = true; 
            let studentSelectedCoursesUrl = '/user/advisor/student/'+this.student_ID+'/studentRecommended';
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
    }
}

</script>
   