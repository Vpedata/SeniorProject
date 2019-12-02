<template>
    <div id="app" class="amber lighten-5">
    <v-app id="inspire">
        <div class="amber lighten-5 pa-4 full-screen">
            <v-row>
                <v-toolbar color="amber darken-1" dark>
                <v-toolbar-title class="brown--text">
                    {{name}}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn  @click="$router.push('/fe/student')" dark>Home</v-btn>
                    <v-btn  @click="$router.push('/fe/messages')" dark>Messages</v-btn>
                    <v-btn  @click="logout" dark>Logout</v-btn>
                </v-toolbar-items>
                </v-toolbar>
            </v-row>
            <v-row>
                <v-col cols="1"></v-col>
                <v-col cols="5">
                <v-card class="mt-n16 mx-auto" elevation="12" height="500px" max-height="500px">
                    <v-toolbar flat dark>
                        <v-toolbar-title>Selected Courses</v-toolbar-title>
                    </v-toolbar>
<<<<<<< HEAD
                    <v-list style="max-height: 600px" class="overflow-y-auto">
<<<<<<< HEAD
                        <classComponent v-for="course in currentReccSemester" :course="course" :key="course.course_ID"/> 
                    </v-list> 

                    <v-list>
                        <v-list-item>
                            <v-list-item-content>
                                <v-dialog v-model="dialog" width="500">
                                    <template v-slot:activator="{ on }">
                                    <v-btn color="amber darken-1" dark v-on="on">
                                        GetClassName
                                    </v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title
                                            class="headline grey lighten-2"
                                            primary-title
                                        >
                                            GetClassName
                                        </v-card-title>
                                        <v-divider></v-divider>
                                        <v-card-text>
                                            GetClassSummary
                                        </v-card-text>
                                        <v-divider></v-divider>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="blue" text @click="dialog = false">
                                                Add Class
                                            </v-btn>
                                            <v-btn color="red" text @click="dialog = false">
                                                Cancel
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-list-item-content>
                        </v-list-item>

                        
            
                        <v-list-item @click="$router.push('/classlist')">
                            <v-list-item-content>
                            <v-list-item-title>Repeat...</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                    
=======
                        <classComponent v-for="course in courses" :course="course" :key="course.course_ID"/> 
=======
                    <v-list style="max-height: 436px" class="overflow-y-auto">
                        <classComponent v-for="course in selected" :course="course" :key="course.course_ID" @transfer="transfer_course"/> 
                    </v-list>                  
                </v-card>
                </v-col>
                <v-col cols="5">
                <v-card class="mt-n16 mx-auto" elevation="12" height="500px" max-height="500px">
                    <v-toolbar flat dark>
                        <v-toolbar-title>Recommended Courses</v-toolbar-title>
                    </v-toolbar>
                    <v-list style="max-height: 436px" class="overflow-y-auto">
                        <classComponent v-for="course in courses" :course="course" :key="course.course_ID" @transfer="transfer_course"/> 
>>>>>>> d3835611327299157a5a89e78a37ebff6c6a7b03
                    </v-list>                  
>>>>>>> 96cb5524bad73605da65579cb16f1d436074e52f
                </v-card>
                </v-col>
            </v-row>
            <v-btn class="mx-auto mt-12" width="140" dark color="orange" @click="save_selected">Save</v-btn>
        </div>
    </v-app>
    <div class="mt-12"></div>
    </div>
</template>


<script>
import { mapState, mapActions } from 'vuex'
import classComponent from './classListComponentAdd.vue'
import axios from 'axios'
export default {
    computed: {
        ...mapState({
            account: state => state.account,
        })
    }, 
    
    data: () => ({
        dialog: false,
        name: " ",
        courses: JSON,
        selected: JSON
    }),

    components: {
        classComponent,
    },
    methods: {
        logout(e) {
            axios.get("/auth/logout").then(response =>{
                this.$router.push('/');
            }).catch(err =>{
                console.log(err);
            });
        },
        transfer_course: function(course) {
            if (this.selected.indexOf(course)==-1){
                this.selected.push(course)
                this.courses.splice(this.courses.indexOf(course),1)
            } else {
                this.courses.push(course)
                this.selected.splice(this.selected.indexOf(course),1)

            }
        },
        save_selected: function() {
            let class_str = ""
            let grade_str = ""

            console.info(this.selected)
            for (var i=0; i<this.selected.length; i++){
                class_str = class_str + this.selected[i].courseCode + ","
                grade_str = grade_str + "-1,"
            }
            class_str = class_str.substring(0, class_str.length - 1);
            grade_str = grade_str.substring(0, grade_str.length - 1);

            console.info(class_str)
            console.info(grade_str)

            
            axios.post("/user/student/courses/taken", {
                classes: class_str,
                grades: grade_str
            }).then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            })
        }
    },
<<<<<<< HEAD
    generateDefaults: function() {
      axios
        .get("/user/student/courses/recommendedCourses")
        .then(response => {
          var obj = response.data[0];                               
          this.currentReccSemester = Object.keys(obj).map(key => obj[key]);   //literally all courses
          var selectedCourses = [];
          var numOfReccCourses = allCourses.length;                               
          var i = 0;
          while (i < numOfReccCourses) {
            console.info(allCourses[i]);
            selectedCourses.push(allCourses[i]);                    
            console.info(selectedCourses);
            i++;
          }

          this.courses = selectedCourses;
          console.info(this.courses)
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

=======
>>>>>>> 96cb5524bad73605da65579cb16f1d436074e52f
    beforeMount(){
      axios
      .get('/user/getName')
      .then(response => {
        this.name = response.data.firstName + " " + response.data.lastName;
      })
      .catch(error => {
        console.log(error)
      });

      axios.get('/user/student/courses/getUserRecommend')
      .then(response =>{
         var obj = response.data[0]; 
         this.selected = Object.keys(obj).map(key => obj[key]);
         console.info(this.selected);
      })
      .catch(error =>{
          console.log(error)
      })

      axios.get('/user/student/courses/recommended')
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

