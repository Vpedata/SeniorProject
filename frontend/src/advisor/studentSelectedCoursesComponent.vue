<template>
    <v-dialog v-model="dialog" width="800px" persistent>
      <template v-slot:activator="{ on }">
      <v-btn class="mb-4 mx-auto" outlined color="#FF0000" @click="$emitgetStudentSelectedCourses" dark v-on="on">
        Student Selected Courses
      </v-btn>
      </template>
        <v-list style="max-height: 600px" class="overflow-y-auto">
            <classComponent class="mt-n1" v-for="course in studentSelectedCourses" :course="course" :key="course.course_ID"/>
        </v-list> 
    </v-dialog>
</template>
<script>
import axios from 'axios';
import classComponent from '../studentpages/classListComponent.vue'
export default {
    name: "studentSelectedCoursesComponent" ,
    props: {
        studentSelectedCoursesCredits,
        studentSelectedCourses
    },
    components: {
        classComponent,
    },
    data: () => ({
        dialog: false,
    }),
    method: {
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
    }
}

</script>
   