<template>
    <div id="app">
    <v-app id="inspire">
        <div class="grey lighten-5 pa-4">
            <v-row>
                <v-toolbar color="amber darken-1" dark>
                <v-toolbar-title class="brown--text">
                    {{name}}
                </v-toolbar-title>
                </v-toolbar>
            </v-row>
            <v-row>
                <v-col cols="3"></v-col>
                <v-col cols="9" lg="6">
                <v-card class="mt-n16 mx-auto" elevation="12" height="600px">
                    <v-toolbar flat>
                        <v-toolbar-title class="grey--text">Add Classes (Only Available Classes List)</v-toolbar-title>
                    </v-toolbar>
                    <p>List: {{ listed_courses }}</p>
                    <v-list style="max-height: 600px" class="overflow-y-auto">
                        <v-list-item>
                            <v-list-item-content>
                                <v-checkbox class="ml-4" v-model="listed_courses" label="Intro to Object-Oriented Programming" value="IOOP"></v-checkbox>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-content>
                                <v-checkbox class="ml-4" v-model="listed_courses" label="Object-Oriented Programming and Data Abstraction" value="OOPDA"></v-checkbox>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-content>
                                <v-checkbox class="ml-4" v-model="listed_courses" label="Data Structures and Algorithms" value="DSA"></v-checkbox>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-content>
                                <v-checkbox class="ml-4" v-model="listed_courses" label="Design and Analysis of Algorithms" value="DAA"></v-checkbox>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-content>
                                <v-checkbox class="ml-4" v-model="listed_courses" label="Computer Lab Techniques" value="CLT"></v-checkbox>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-content>
                                <v-checkbox class="ml-4" v-model="listed_courses" label="Foundations of Computer Science" value="Foundations"></v-checkbox>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-content>
                                <v-checkbox class="ml-4" v-model="listed_courses" label="Computer Organization" value="Comp Org"></v-checkbox>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-content>
                                <v-checkbox class="ml-4" v-model="listed_courses" label="Cyber Security" value="Cyber Security"></v-checkbox>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-content>
                                <v-checkbox class="ml-4" v-model="listed_courses" label="Operating Systems" value="OS"></v-checkbox>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-content>
                                <v-checkbox class="ml-4" v-model="listed_courses" label="Programming Languages" value="PL"></v-checkbox>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-content>
                                <v-checkbox class="ml-4" v-model="listed_courses" label="Software Engineering" value="SWENG"></v-checkbox>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-content>
                                <v-checkbox class="ml-4" v-model="listed_courses" label="Computers and Society" value="Comp and Soc"></v-checkbox>
                            </v-list-item-content>
                        </v-list-item>


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
        listed_courses: [],
        name: " "
  }),
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
