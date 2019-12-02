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
                    <v-btn  @click="$router.push('/fe/classlistadvisor')" dark>Back</v-btn>
                    <v-btn  @click="$router.push('/fe/adv/advisor')" dark>Home</v-btn>
                    <v-btn  @click="$router.push('/messages')" dark>Messages</v-btn>
                    <v-btn  @click="logout" dark>Logout</v-btn>
                </v-toolbar-items>
                </v-toolbar>
            </v-row>
            <v-card class = "mx-auto mt-8" width="1200px">
                    <v-toolbar dark flat>
                        <v-toolbar-title class="white--text">Course Creation</v-toolbar-title>
                    </v-toolbar>
            <v-row>
                <v-col cols=3></v-col>
                <v-col cols=5>
                    <v-text-field class = 'ma-12' v-model = 'class_name' label = 'Class Name' outlined></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-textarea class = 'mx-12 mt-n12' v-model = 'class_desc' full-width counter single-line label = 'Class Description' outlined maxlength = '600'></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="3"></v-col>
                <v-col cols="5">
                <v-text-field class='mx-12 mt-n8' width="200px" v-model = 'courseCode' label = 'Course Code (ex CS01001)' single-line type="number" hide-details></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-checkbox
                    v-model="isCore"
                    class = 'mx-auto mt-12'
                    :label="`Core Course`"
                ></v-checkbox>
            </v-row>
            <v-row>
                <v-subheader class="mx-auto mt-4">Credit Hours</v-subheader>
            </v-row>
            <v-row>
                 <v-col cols="5"></v-col>
                 <v-col cols="2">
                    <v-text-field class = 'mx-4 mt-n4' v-model = 'class_credits' single-line type="number" append-outer-icon="add" @click:append-outer="increment_credits" prepend-icon="remove" @click:prepend="decrement_credits"></v-text-field>
                 </v-col>
            </v-row>
            
            <v-row>
                <v-col cols="2"></v-col>
                <v-col cols="4">
                <v-text-field label="Prereq. Course Code (Ex. CS04113)" v-model="prereq_current"></v-text-field>
                </v-col>
                <v-btn @click="prereq_list.push(prereq_current)" >Add PreReq Course Code</v-btn>
                <v-btn @click="prereq_list.pop()" >Undo</v-btn>
            </v-row>
            <v-chip 
                v-for="prereq in prereq_list" 
                :key="prereq.id" 
                v-model="prereq.isOpen"
                close
                @click:close="prereq_list.splice(prereq_list.indexOf(prereq))"
                >
                {{prereq}}
                </v-chip>
            <v-row>
                <v-col cols="4">
                    <v-btn class="mt-12" outlined color="blue" @click="$router.push('/fe/classlistadvisor')" dark>Create</v-btn>
                </v-col>
            </v-row>
            </v-card>
        </div>
    </v-app>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import axios from 'axios';
import router from '../router/index.js'

export default {
    computed: {
        ...mapState({
            account: state => state.account,
        })
    }, 
    data: () => ({
        class_name: '',
        class_desc: '',
        class_credits: 0,
        prereq_list: [],
        isCore: false,
        courseCode: null,
        name: " "
  }),

   methods: {
       increment_credits () {
           this.class_credits = parseInt(this.class_credits,10)+1
       },
       decrement_credits () {
           this.class_credits = parseInt(this.class_credits,10)-1
       },
        logout: function () {
            axios.get("/auth/logout").then(response =>{
                this.$router.push('/');
            }).catch(err =>{
                console.log(err);
            });
        },
    addCourse: function() {
          axios.post("/user/advisor/course/addCourse", {
                courseCode: this.courseCode,
                name: this.class_name,      
                isRequired: this.isCore,
                creditHours: this.class_credits,
                description: this.class_desc,  
                preReq: this.prereq_list
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
      }).bind(this)
      .catch(error => {
        console.log(error)
      })
  }
};
</script>
