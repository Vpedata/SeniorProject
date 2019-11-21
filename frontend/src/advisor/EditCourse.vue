<template>
    <v-dialog max-width="1000px">
        <v-btn flat slot="activator" class="success">Edit Course</v-btn>
        <v-card>
            <v-card-title>
                <h2>Edit Course</h2>
            </v-card-title>
            
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
   