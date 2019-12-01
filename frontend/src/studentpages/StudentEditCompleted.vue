<template>
    <div id="app">
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
                <v-card class="mt-n16 mx-auto" width="800px" elevation="12" height="500px" max-height="500px">
                    <v-toolbar flat dark>
                        <v-toolbar-title>Courses</v-toolbar-title>
                    </v-toolbar>
                    <v-list style="max-height: 600px" class="overflow-y-auto">
                        <classComponent v-for="course in avail_courses" :course="course" :key="course.course_ID" :taken="false" @transfer="transfer_course"/> 
                    </v-list>                  
                </v-card>
            </v-row>
            <v-btn class="mx-auto mt-12" width="140" dark color="orange" @click="update_completed">Save</v-btn>
        </div>
    </v-app>
    <div class="mt-12"></div>
    </div>
</template>


<script>
import { mapState, mapActions } from 'vuex'
import classComponent from './classListComponentCompleted.vue'
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
        taken: JSON,
        avail_courses: JSON,
        id: "",
        update_courses: "",
        update_grades: ""
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
        transfer_course: function(course,grade) {
                course.dialog = false
                course.grade = grade;
        },
        update_completed: function() {
            let temp_index = 0
            let avail_parse = JSON.parse(JSON.stringify(this.avail_courses))
            for (let i=0;i<avail_courses.length;i++){
                let check_course = avail_parse[i].name
                let check_grade = avail_parse[i].grade
                if (check_grade != '') {
                    if (temp_index > 0) {
                        this.update_courses.concat(",")
                        this.update_grades.concat(",")
                    }
                    this.update_courses.concat(toString(check_course))
                    this.update_grades.concat(toString(check_grade))
                    temp_index ++
                }
            }
            axios.post("/user/student/courses/taken", {
                classes: this.update_courses,
                student_ID: this.id,
                grades: this.update_grades
          }).then(function (response) {
              console.log(response);
          })
          .catch(function (error) {
              console.log(error);
          })
            $router.push('/fe/student')
            
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

      axios
      .get('/user/getmyid')
      .then(response => {
        this.id = response.data.user_ID;
      })
      .catch(error => {
        console.log(error)
      });

      axios.get('/user/student/courses/taken')
      .then(response =>{
         var obj = response.data[0]; 
         this.taken = Object.keys(obj).map(key => obj[key]);
         console.info(this.taken);
      })
      .catch(error =>{
          console.log(error)
      })

      axios.get('/user/student/courses/yetToTake')
      .then(response =>{
         var obj = response.data[0]; 
         this.avail_courses = Object.keys(obj).map(key => obj[key]);
         console.info(this.avail_courses);
      })
      .catch(error =>{
          console.log(error)
      })
  }
};
</script>

