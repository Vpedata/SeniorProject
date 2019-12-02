<template>
    <div>
    <v-btn class="mb-4 mx-auto" outlined color="#FF0000" v-on:click.native="getStudentSelectedCourses" dark >
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
        studentSelectedCourses:JSON,
        studentSelectedCoursesCredits:Number
    },
    data: () => ({
        dialog: false,
    }),
    method: {
        getStudentSelectedCourses: function() { 
            dialog=true;
            console.info(dialog);
            this.$emit('getStudentSelectedCourses');
        },
    }
}

</script>
   