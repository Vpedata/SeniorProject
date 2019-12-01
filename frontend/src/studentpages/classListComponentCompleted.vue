<template>
    <v-list-item>
            <v-list-item-content @click.stop="dialog = true">
                <v-list-item-title>{{course.name}}</v-list-item-title>
                <v-dialog v-model="dialog" width="720">
                <v-card>
                    <v-card-title class="headline grey lighten-2" primary-title>
                        {{course.courseCode}}
                        <v-spacer></v-spacer>
                        Credits: {{course.creditHours}}
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <div class="my-4 subtitle-1 black--text">{{course.name}}</div>
                        <div class="grey-text">{{course.description}}</div>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-row>
                            <v-col>
                            <v-row><v-btn color="green" text v-on:click="$emit('transfer',course,'A+'); dialog=false; grade='A+'">A+</v-btn></v-row>
                            <v-row><v-btn color="green" text v-on:click="$emit('transfer',course,'A'); dialog=false; grade='A'">A</v-btn></v-row>
                            <v-row><v-btn color="green" text v-on:click="$emit('transfer',course,'A-'); dialog=false; grade='A-'">A-</v-btn></v-row>
                            </v-col>
                            <v-col>
                            <v-row><v-btn color="green" text v-on:click="$emit('transfer',course,'B+'); dialog=false; grade='B+'">B+</v-btn></v-row>
                            <v-row><v-btn color="green" text v-on:click="$emit('transfer',course,'B'); dialog=false; grade='B'">B</v-btn></v-row>
                            <v-row><v-btn color="green" text v-on:click="$emit('transfer',course,'B-'); dialog=false; grade='B-'">B-</v-btn></v-row>
                            </v-col>
                            <v-col>
                            <v-row><v-btn color="green" text v-on:click="$emit('transfer',course,'C+'); dialog=false; grade='C+'">C+</v-btn></v-row>
                            <v-row><v-btn color="green" text v-on:click="$emit('transfer',course,'C'); dialog=false; grade='C'">C</v-btn></v-row>
                            <v-row><v-btn color="green" text v-on:click="$emit('transfer',course,'C-'); dialog=false; grade='C-'">C-</v-btn></v-row>
                            </v-col>
                            <v-col>
                            <v-row><v-btn color="orange" text v-on:click="$emit('transfer',course,'D+'); dialog=false; grade='D+'">D+</v-btn></v-row>
                            <v-row><v-btn color="orange" text v-on:click="$emit('transfer',course,'D'); dialog=false; grade='D'">D</v-btn></v-row>
                            <v-row><v-btn color="orange" text v-on:click="$emit('transfer',course,'D-'); dialog=false;grade='D-'">D-</v-btn></v-row>
                            </v-col>
                            <v-col>
                            <v-row><v-btn color="orange" text v-on:click="$emit('transfer',course,'F'); dialog=false; grade='F'">F</v-btn></v-row>
                            <v-row><v-btn v-if="taken==true" color="red" text v-on:click="$emit('transfer',course,''); dialog=false; grade=''">Remove</v-btn></v-row>
                            <v-row><v-btn color="blue" text @click="dialog = false">Ok</v-btn></v-row>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-list-item-content>
            <v-list-item-action>
                    <v-row>
                        <div>{{this.grade}}</div>
                    </v-row>
            </v-list-item-action>
            <div class="mt-12"></div>
        </v-list-item> 
        
</template>

<script>
import axios from 'axios';
export default {
    name: "classComponent",
    props: {
        course: Object,
    },
    data: () => ({
        dialog: false,
        name: "",
        grade: '',
        taken: true
    }),
    methods: {
      addRecCourse: function() {
          /*
        axios.post("/user/student/course/addRecCourse", {
                ??
          }).then(function (response) {
              console.log(response);
          })
          .catch(function (error) {
              console.log(error);
          });
          */
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
      })
  }
}
</script>