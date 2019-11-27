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
                    <v-btn  @click="$router.push('/fe/student')" dark>Home</v-btn>
                    <v-btn  @click="$router.push('/messages')" dark>Messages</v-btn>
                    <v-btn  @click="logout" dark>Logout</v-btn>
                </v-toolbar-items>
                </v-toolbar>
            </v-row>
            <v-row>
                <v-col cols="1"></v-col>
                <v-col cols="5">
                <v-card class="mt-n16 mx-auto" elevation="12" height="600px">
                    <v-toolbar flat dark>
                        <v-toolbar-title>Selected Courses</v-toolbar-title>
                    </v-toolbar>
                    <v-list style="max-height: 600px" class="overflow-y-auto">
                        <classComponent v-for="course in selected" :course="course" :key="course.course_ID"/> 
                    </v-list>                  
                </v-card>
                </v-col>
                <v-col cols="5">
                <v-card class="mt-n16 mx-auto" elevation="12" height="600px">
                    <v-toolbar flat dark>
                        <v-toolbar-title>Add Course</v-toolbar-title>
                    </v-toolbar>
                    <v-list style="max-height: 600px" class="overflow-y-auto">
                        <classComponent v-for="course in courses" :course="course" :key="course.course_ID" @transfer="transfer_course"/> 
                    </v-list>                  
                </v-card>
                </v-col>
            </v-row>
            <v-btn class="mx-auto mt-12" width="140" dark color="orange">Save</v-btn>
        </div>
    </v-app>
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
            if (this.selected.indexOF(course)!=-1){
                this.selected.push(course)
                this.courses.splice(this.courses.indexOF(course),1)
            } else {
                this.courses.push(course)
                this.selected.splice(this.selected.indexOF(course),1)

            }
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

      axios.get('/user/student/courses/recommended')
      .then(response =>{
         var obj = response.data[0]; 
         this.courses = Object.keys(obj).map(key => obj[key]);
         console.info(this.courses);
      })
      .catch(error =>{
          console.log(error)
      })

      axios.get('/user/student/courses/getUserRecommend')
      .then(response =>{
         var obj = response.data[0]; 
         this.selected = Object.keys(obj).map(key => obj[key]);
         console.info(this.selected);
      })
      .catch(error =>{
          console.log(error)
      })
  }
};
</script>

