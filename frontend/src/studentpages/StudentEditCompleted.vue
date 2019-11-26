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
                <v-col cols="2"></v-col>
                <v-col cols="10" lg="8">
                <v-card class="mt-n16 mx-auto" elevation="12" height="800px">
                    <v-toolbar flat>
                        <v-toolbar-title class="grey--text">Select Completed Classes</v-toolbar-title>
                    </v-toolbar>
                    <p>List: {{ selected_courses }}</p>
                    <v-list style="max-height: 600px" class="overflow-y-auto">
                        <v-list-item v-for = "course in courses" :key="course.course_ID">
                            
                                <v-checkbox class="ml-4" label= course.name value= "course"></v-checkbox>
                            
                        </v-list-item>
                        <div v-if ="selected_courses.indexOf('IOOP') > -1">
                            <v-item-group v-model="course_grades[0]">
                                <v-item
                                    class="mt-n12"
                                    v-for="n in ['A','A-','B+','B','B-','C+','C','C-','D+','D','D-','F']"
                                    :key="n"
                                    v-slot:default="{ active, toggle }"
                                >
                                    <v-chip label
                                    class="mt-n12 ms-1"
                                    active-class="green--text"
                                    :input-value="active"
                                    @click="toggle"
                                    >
                                    {{ n }}
                                    </v-chip>
                                </v-item>
                            </v-item-group>
                        </div>
            
                        
    </v-app>
    </div>
</template>


<script>
import { mapState, mapActions } from 'vuex'
import axios from 'axios';
export default {
    computed: {
        ...mapState({
            account: state => state.account,
        })
    }, 
    data: () => ({
        dialog: false,
        selected_courses: [],
        course_grades: [],
        name: " ",
        courses: JSON,
    }
  ),

    beforeMount(){
      axios
      .get('/user/getName')
      .then(response => {
        this.name = response.data.firstName + " " + response.data.lastName;
      })
      .catch(error => {
        console.log(error)
      });

      axios.get('/user/student/courses/yetToTake')
      .then(response =>{
          let obj = response.data[0];
          this.courses = Object.keys(obj).map(key => obj[key]);
      }).catch(err =>{
          console.log(err);
      })
  }
};
</script>
