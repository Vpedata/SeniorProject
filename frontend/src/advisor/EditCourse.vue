<template>
    <v-dialog v-model="dialog" width="800px" persistent>
      <template v-slot:activator="{ on }">
       <v-btn class="mx-2" fab dark small color="cyan" v-on="on">
            <v-icon dark>mdi-pencil</v-icon>
        </v-btn>
      </template>
                <v-card width="800px" class="mx-auto">
                <v-card-title>
                <h2>Edit Course</h2>
            </v-card-title>
            <v-card-text>
                <v-form class="px=3">
                    <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="10">
                    <v-text-field class = 'ma-12' dense label='Course Name' v-model='course_name' outlined></v-text-field>
                    <v-textarea class = 'mx-12 mt-n12' dense label="Course Description" v-model='course_desc' full-width counter single-line outlined maxlength = '600'></v-textarea>
                    </v-col>
                    <v-col cols="1"></v-col>
                    <v-col cols="3"></v-col>
                    <v-col cols="3">
                    <v-text-field class="mt-n4" v-model = 'courseCode' label = 'Code (Ex. CS04113)' single-line hide-details></v-text-field>
                    </v-col>
                    <v-col>
                        <v-checkbox v-model="isCore" class = 'mx-auto mt-n4 ml-12' :label="`Core Course`"></v-checkbox>
                    </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4"></v-col>
                        <v-col cols="4">
                        <v-subheader> Credits </v-subheader>
                        <v-text-field class = 'mx-4 mt-n4' readonly v-model = 'course_credits' single-line append-outer-icon="add" @click:append-outer="increment_credits" append-icon="remove" @click:append="decrement_credits"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="12">
                    <v-row>
                        <v-col cols="1"></v-col>
                        <v-col cols="5">
                        <v-text-field class="mt-n4" label="Prereq. Course Code (Ex. CS04113)" v-model="prereq_current"></v-text-field>
                        </v-col>
                        <v-btn @click="prereq_list.push(prereq_current)" >Add PreReq Course Code</v-btn>
                    </v-row>
                    <v-chip 
                        v-for="prereq in prereq_list" 
                        :key="prereq.id" 
                        v-model="prereq.isOpen"
                        close
                        @click:close="prereq_list.splice(prereq_list.indexOf(prereq),1)"
                        >
                        {{prereq}}
                    </v-chip>
                    </v-col>
                    </v-row>
                    
                    <v-btn  class="success mx-0 mt-3"  v-on:click="handleEditCourse">Update Course </v-btn>
                    <v-btn  color="red" dark class="mx-0 mt-3" @click="dialog=false">Cancel </v-btn>
                </v-form>
            </v-card-text>
                </v-card>
            </v-dialog>
</template>
<script>

export default {
    created: function() {
        if(this.course.PREREQCODES){
            var temp_prereq_list= this.course.PREREQCODES.split(",");
            for (var i = 0; i < temp_prereq_list.length; i++){
                this.prereq_list.push(temp_prereq_list[i]);
            }
        }
    },
     methods: {
       increment_credits () {
            if (this.course_credits <= 30) {
                this.course_credits = parseInt(this.course_credits,10)+1
            }
        },
        decrement_credits () {
            if (this.course_credits > 0) {
                this.course_credits = parseInt(this.course_credits,10)-1
            }
        },
        handleEditCourse() {
            this.dialog=false;
            var preReqString = "";
            for (var i = 0; i < this.prereq_list.length; i++){
                preReqString = preReqString + this.prereq_list[i] +",";
            }
            preReqString = preReqString.substring(0, preReqString.length - 1);
            let editedCourse = {
                course_ID :this.course.course_ID,
                courseCode: this.courseCode,
                name: this.course_name,      
                isRequired: this.isCore,
                creditHours: this.course_credits,
                description: this.course_desc,  
                preReq: preReqString
            };
            this.$emit('handleEditCourse',editedCourse);
        }

     },
    props: {
        course: Object,
    },
    data: function() {
        return {
            dialog:false,
            course_name: this.course.name,
            course_desc: this.course.description,
            course_credits: this.course.creditHours,
            isCore: this.course.isCore,
            prereq_list: [],
            courseCode: this.course.courseCode,
        } 
    }
}
</script>
   