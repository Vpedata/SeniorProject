<template>
    <v-dialog v-model="dialog" width="800px" persistent>
      <template v-slot:activator="{ on }">
      <v-btn class="mb-4 mx-auto" outlined color="#FF0000" @click="getStudentSelectedCourses" dark v-on="on">
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
}

</script>
   