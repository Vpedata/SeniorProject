<template>
  <div id="app">
    <v-app id="inspire">
      <div class="amber lighten-5 pa-4 full-screen">
        <v-row>
          <v-toolbar color="amber darken-1" dark>
            <v-toolbar-title class="brown--text">{{name}}</v-toolbar-title>
          <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn  @click="$router.push('/fe/classlist')" dark>Class List</v-btn>
                    <v-btn  @click="$router.push('/messages')" dark>Messages</v-btn>
                    <v-btn  @click="logout" dark>Logout</v-btn>
                </v-toolbar-items>
                </v-toolbar>
        </v-row>
        <v-row>
          <v-btn
            class="ma-4"
            outlined
            color="brown"
            @click="$router.push('/fe/editcompleted')"
            dark
          >Edit Completed Courses</v-btn>
          <v-spacer></v-spacer>
              <v-btn
                class="ma-4"
                outlined
                color="brown"
                @click="$router.push('/fe/studentaddclass')"
                dark
              >Add Class</v-btn>
           <v-spacer></v-spacer>
          <v-btn
            class="ma-4"
            outlined
            color="amber darken-1"
            @click="generateDefaults"
            dark
            >Generate Default Classes</v-btn>

        </v-row>
        <v-row>
          <v-col cols="3">
            <v-row>
            </v-row>
            <v-row>
            </v-row>
          </v-col>
          <v-col cols="9" lg="6">
            <v-card class="mt-n16 mx-auto" elevation="12" height="350px">
              <v-toolbar flat>
                <v-toolbar-title class="grey--text">Selected Classes</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-title class="grey--text" :key="totalCredits">Total Credits: {{credits}}</v-toolbar-title>
              </v-toolbar>
                    <v-list style="max-height: 600px" class="overflow-y-auto">
                        <classComponent v-for="course in generatedClasses" :course="course" :key="course.course_ID"/> 
                    </v-list> 
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-app>
  </div>
</template>


<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";
import router from "../router/index.js";
import studentGeneratedComponent from "./studentGeneratedListComponent.vue";
import classComponent from './classListComponent.vue'
export default {
  computed: {
    ...mapState({
      account: state => state.account
    }),
    generatedClasses: function(){
        return this.courses;
    },
    credits: function (){
        return this.totalCredits;
    }
  },
  data: () => ({
    dialog: false,
    name: " ",
    courses: JSON,
    totalCredits: 0
  }),
    components: {
        classComponent
    },
  methods: {
    logout: function() {
      axios
        .get("/auth/logout")
        .then(respone => {
          this.$router.push("/");
        })
        .catch(err => {
          console.log(err);
        });
    },
    getLastRecommended: function(){
        axios.get("/user/student/courses/getUserRecommend")
        .then(response =>{
            var obj = response.data[0];
            var allCourses = Object.keys(obj).map(key => obj[key]);
            let credits = 0;

            for (var i = 0; i < allCourses.length; i++){
                credits = credits + allCourses[i].creditHours;
            }
            this.totalCredits = credits;
            this.courses = allCourses;
        })
        .catch(err =>{
            console.log(err);
        });
    },
    generateDefaults: async function() {
        var classCode = "";
        var grades = "";

        await axios
        .get("/user/student/courses/deleteNegOnes")
        .then(response =>{
            console.log(response);
        })
        .catch(err =>{
            console.log(err);
        });
      await axios
        .get("/user/student/courses/recommended")
        .then(response => {
          var creditCount = 0;
          var obj = response.data[0];
          var allCourses = Object.keys(obj).map(key => obj[key]);
          var selectedCourses = [];
          var i = 0;
          while (creditCount < 17) {
            creditCount = creditCount + allCourses[i].creditHours;
            console.info(allCourses[i]);
            selectedCourses.push(allCourses[i]);
            classCode = classCode + allCourses[i].courseCode + ",";
            grades = grades + "-1,";
            
            console.info(selectedCourses);
            i++;
          }

          this.courses = selectedCourses;
          this.totalCredits = creditCount;
          console.info(this.courses)
        })
        .catch(err => {
          console.log(err);
        });
        classCode = classCode.substring(0, classCode.length - 1);
        grades = grades.substring(0, grades.length - 1);
        //array of coursecodes, grades
        axios.post("/user/student/courses/taken",{
            classes: classCode,
            grades: grades
        }).then(response =>{
            console.log(response);
        }).catch(err =>{
            console.log(err);
        })
    }
  },

  beforeMount() {
    axios
      .get("/user/getName")
      .then(response => {
        this.name = response.data.firstName + " " + response.data.lastName;
      })
      .catch(error => {
        console.log(error);
      });

      this.getLastRecommended();
  }
};
</script>
