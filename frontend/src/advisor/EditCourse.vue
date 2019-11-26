<template>
    <v-dialog max-width="1000px">
        <template v-slot:activator="{ on }">
             <v-btn class="mx-2" fab dark small color="cyan" v-on="on">
                <v-icon dark>mdi-pencil</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <h2>Edit Course</h2>
            </v-card-title>
            <v-card-text>
                <v-form class="px=3">
                    <v-text-field class = 'ma-12' label="Course Name" v-model="course_name" outlined></v-text-field>
                    <v-textarea class = 'mx-12 mt-n12' label="Course Description" v-model='course_desc' full-width counter single-line outlined maxlength = '128'></v-textarea>
                    <v-text-field  v-model = 'courseCode' label = 'Course Code' single-line type="number" hide-details></v-text-field>
                    <v-checkbox v-model="isCore" class = 'mx-auto mt-12' :label="`Core Course`"></v-checkbox>
                    <v-subheader class="mx-auto mt-4">Credit Hours</v-subheader>
                    <v-text-field  v-model = 'course_credits' label = 'Credits' single-line type="number" hide-details></v-text-field>
                    <v-text-field label="Ex. CS04.113" v-model="prereq_current"></v-text-field>
                    <v-btn @click="prereq_list.push(prereq_current)" >Add PreReq Course Code</v-btn>
                    <v-btn @click="prereq_list.pop()" >Undo</v-btn>
                    <v-chip v-for="prereq in prereq_list" :key="prereq.id" v-model="prereq.isOpen">{{prereq}}</v-chip>
                    <v-btn flat class="success mx-0 mt-3">Update Course </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog> 
</template>
<script>

export default {
     methods: {
       increment_credits () {
           this.course_credits = parseInt(this.course_credits,10)+1
       },
       decrement_credits () {
           this.course_credits = parseInt(this.course_credits,10)-1
       },
     },
    props: {
        course: Object,
    },
    data: () => ({
        course_name: course.name,
        course_desc: course.description,
        course_credits: course.creditHours,
        prereq_list: [],
        isCore: course.isCore,
        courseCode: course.courseCode,
  }),
    
}
</script>
   