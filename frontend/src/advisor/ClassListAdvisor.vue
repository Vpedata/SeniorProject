<template>
    <div id="app">
    <v-app id="inspire">
        <div class="amber lighten-5 pa-4">
            <v-row>
                <v-toolbar color="amber darken-1" dark>
                <v-toolbar-title class="brown--text">
                    {{name}}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <!--- <v-btn  @click="$router.push('/fe/adv/createcourse')" dark>Create Course</v-btn> --->
                    <v-btn  @click="dialog=true" dark>Create Course</v-btn> 
                    <v-btn  @click="$router.push('/fe/adv/advisor')" dark>Home</v-btn>
                    <v-btn  @click="$router.push('/messages')" dark>Messages</v-btn>
                    <v-btn  @click="logout" dark>Logout</v-btn>
                </v-toolbar-items>
                </v-toolbar>
            </v-row>
            <v-dialog v-model="dialog" width="800px" persistent>
                <v-card width="800px" class="mx-auto">
                <v-card-title>
                <h2>Create Course</h2>
            </v-card-title>
            <v-card-text>
                <v-form class="px=3">
                    <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="10">
                    <v-text-field class = 'ma-12' dense label="Course Name" v-model="course_name" outlined></v-text-field>
                    <v-textarea class = 'mx-12 mt-n12' dense label="Course Description" v-model='course_desc' full-width counter single-line outlined maxlength = '128'></v-textarea>
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
                        <v-text-field class = 'mx-4 mt-n4' readonly v-model = 'class_credits' single-line append-icon="add" @click:append="increment_credits" append-outer-icon="remove" @click:append-outer="decrement_credits"></v-text-field>
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
                        <v-btn @click="prereq_list.pop()" >Undo</v-btn>
                    </v-row>
                    <v-chip 
                        v-for="prereq in prereq_list" 
                        :key="prereq.id" 
                        v-model="prereq.isOpen"
                        >
                        {{prereq}}
                    </v-chip>
                    </v-col>
                    </v-row>
                    
                    <v-btn flat class="success mx-0 mt-3" @click="handleCreateCourse">Create Course </v-btn>
                    <v-btn flat color="red" dark class="mx-0 mt-3" @click="dialog=false">Cancel </v-btn>
                </v-form>
            </v-card-text>
                </v-card>
            </v-dialog>
            <v-row>
                <v-col cols="3"></v-col>
                <v-col cols="9" lg="6">
                <v-card class="mt-n16 mx-auto" elevation="12" height="600px">
                    <v-toolbar flat>
                        <v-toolbar-title class="grey--text">Class List</v-toolbar-title>
                    </v-toolbar>
                    <v-list style="max-height: 600px" class="overflow-y-auto">
                        <classComponent v-for="course in courses" :course="course" :key="course.course_ID"/> 
                    </v-list>                  
                </v-card>
                </v-col>
            </v-row>
        </div>
    </v-app>
    </div>
</template>


<script>
import { mapState, mapActions } from 'vuex'
import classComponent from './classListComponentAdvisor.vue'
import axios from 'axios'
export default {
    computed: {
        ...mapState({
            account: state => state.account,
        }),
    
    }, 
    data: () => ({
        dialog: false,
        prereq_list: [],
        name: " ",
        courses: JSON,
        class_name: '',
        class_desc: '',
        class_credits: 0,
        isCore: false,
        courseCode: null,
    }),

    components: {
        classComponent,
    },
    methods: {
        increment_credits () {
            if (this.class_credits <= 30) {
                this.class_credits = parseInt(this.class_credits,10)+1
            }
        },
        decrement_credits () {
            if (this.class_credits > 0) {
                this.class_credits = parseInt(this.class_credits,10)-1
            }
        },
        logout: function () {
            axios.get("/auth/logout").then(response =>{
                this.$router.push('/');
            }).catch(err =>{
                console.log(err);
            });
        },
        handleCreateCourse: function() {
          this.dialog=false;
          var preReqString = "";
          for (var i = 0; i < prereq_list.length; i++){
                preReqString = preReqString + prereq_list[i] +",";
            }
        preReqString = preReqString.substring(0, preReqString.length - 1);  
          axios.post("/user/advisor/course/", {
                courseCode: this.courseCode,
                name: this.class_name,      
                isRequired: this.isCore,
                creditHours: this.class_credits,
                description: this.class_desc,  
                preReq: preReqString
          }).then(function (response) {
              console.log(response);
          })
          .catch(function (error) {
              console.log(error);
          });
          
        } 
        
    },
    beforeMount(){
      axios
      .get('/user/getName')
      .then(response => {
        this.name = response.data.firstName + " " + response.data.lastName;
      })
      .catch(error => {
        console.log(error)
      });

      axios.get('/course/all')
      .then(response =>{
         var obj = response.data[0]; 
         this.courses = Object.keys(obj).map(key => obj[key]);
         console.info(this.courses);
      })
      .catch(error =>{
          console.log(error)
      })
  }
};
</script>

