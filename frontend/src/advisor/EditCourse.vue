<template>
    <v-dialog max-width="1000px">
        <template v-slot:activator="{ on }">
        <v-btn flat class="success">Edit Course</v-btn>
        </template>
        <v-card>
            <v-card-title>
                <h2>Edit Course</h2>
            </v-card-title>
            <v-card-text>
                <v-form class="px=3">
                    <v-text-field label="Course Name" v-model='course_name'></v-text-field>
                    <v-text-field label="Course Description" v-model='course_desc'></v-text-field>
                    <v-checkbox v-model='isCore' label="Core Course"></v-checkbox>
                    <v-text-field  v-model = 'courseCode' label = 'Course Code' single-line type="number" hide-details></v-text-field>
                    <v-text-field  v-model = 'class_credit' label = 'Credits' single-line type="number" hide-details></v-text-field>
                    <v-btn flat class="success mx-0 mt-3">Create Course </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog> 
</template>
<script>

export default {
    data: () => ({
        course_name: '',
        course_desc: '',
        cousre_credit: null,
        prereq_list: [],
        isCore: false,
        courseCode: null,
  }),
    
}
</script>
   