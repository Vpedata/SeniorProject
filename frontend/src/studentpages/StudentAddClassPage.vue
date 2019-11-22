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
                <v-col cols="3"></v-col>
                <v-col cols="9" lg="6">
                <v-card class="mt-n16 mx-auto" elevation="12" height="600px">
                    <v-toolbar flat>                                <!--header of list box-->
                        <v-toolbar-title class="grey--text">Add Classes (Only Available Classes List)</v-toolbar-title>
                    </v-toolbar>                                    <!---->
                    <p>List: {{ initial_courses }}</p>              <!--What i want to send when finished-->
                    <v-list style="max-height: 600px" class="overflow-y-auto">
                        
                    <v-list style="max-height: 600px" class="overflow-y-auto">
                        <classComponent v-for="course in currentReccSemester" :course="course" :key="course.course_ID"/> 
                    </v-list> 

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
                    
                </v-card>
                </v-col>
  
            </v-row>
            <v-row>
                <v-col cols="8">
                    <v-btn class="mt-12 ma-12" outlined color="blue" @click="$router.push('/fe/student')" dark>Back</v-btn>
                </v-col>
            </v-row>
        </div>
    </v-app>
    </div>
</template>


<script>
import { mapState, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState({
            account: state => state.account,
        })
    }, 
    data: () => ({
        dialog: false,
        initial_courses: [],
        final_courses: [],
        currentReccSemester: JSON,
        name: " "
  }),
  
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
    generateDefaults: function() {
      axios
        .get("/user/student/courses/recommendedCourses")
        .then(response => {
          var obj = response.data[0];                               
          var allCourses = Object.keys(obj).map(key => obj[key]);   //literally all courses
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

    beforeMount(){
      axios
      .get('/user/getName')
      .then(response => {
        this.name = response.data.firstName + " " + response.data.lastName;
      }).bind(this)
      .catch(error => {
        console.log(error)
      })
  }
};
</script>
