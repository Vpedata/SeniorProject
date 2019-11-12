<template>
    <div id="app">
    <v-app id="inspire">
        <div class="amber lighten-5 pa-4">
            <v-row>
                <v-toolbar color="amber darken-1" dark>
                <v-toolbar-title class="brown--text">
                    {{name}}
                </v-toolbar-title>
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
                        <v-list-item>
                            <v-list-item-content>
                                <v-checkbox class="ml-4" v-model="selected_courses" label="Intro to Object-Oriented Programming" value="IOOP"></v-checkbox>
                            </v-list-item-content>
                        </v-list-item>
            
                        <v-list-item>
                            <v-list-item-content>
                                <v-checkbox class="ml-4" v-model="selected_courses" label="Object-Oriented Programming and Data Abstraction" value="OOPDA"></v-checkbox>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-content>
                                <v-checkbox class="ml-4" v-model="selected_courses" label="Data Structures and Algorithms" value="DSA"></v-checkbox>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-content>
                                <v-checkbox class="ml-4" v-model="selected_courses" label="Design and Analysis of Algorithms" value="DAA"></v-checkbox>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-content>
                                <v-checkbox class="ml-4" v-model="selected_courses" label="Computer Lab Techniques" value="CLT"></v-checkbox>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-content>
                                <v-checkbox class="ml-4" v-model="selected_courses" label="Foundations of Computer Science" value="Foundations"></v-checkbox>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-content>
                                <v-checkbox class="ml-4" v-model="selected_courses" label="Computer Organization" value="Comp Org"></v-checkbox>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-content>
                                <v-checkbox class="ml-4" v-model="selected_courses" label="Cyber Security" value="Cyber Security"></v-checkbox>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-content>
                                <v-checkbox class="ml-4" v-model="selected_courses" label="Operating Systems" value="OS"></v-checkbox>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-content>
                                <v-checkbox class="ml-4" v-model="selected_courses" label="Programming Languages" value="PL"></v-checkbox>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-content>
                                <v-checkbox class="ml-4" v-model="selected_courses" label="Software Engineering" value="SWENG"></v-checkbox>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-content>
                                <v-checkbox class="ml-4" v-model="selected_courses" label="Computers and Society" value="Comp and Soc"></v-checkbox>
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
                <v-col cols="4">
                    <v-btn class="mt-12 ma-12" outlined color="red" dark>Save Changes</v-btn>
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
        selected_courses: [],
        name: " "
    }
  ),

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
