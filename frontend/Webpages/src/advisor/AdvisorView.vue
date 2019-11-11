<template>
    <div id="app">
    <v-app id="inspire">
        <div class="grey lighten-5 pa-4">
            <v-row>
                <v-toolbar color="amber darken-1" dark>
                <v-toolbar-title class="brown--text">
                    {{account.user.firstName}} {{account.user.lastName}}
                </v-toolbar-title>
                </v-toolbar>
            </v-row>
            <v-row>
                <v-btn class="ma-4" outlined color="brown" @click="$router.push('/createcourse')" dark>Create New Course</v-btn>
                <v-btn class="ma-4" outlined color="brown" @click="$router.push('/classlist')" dark>View Class List</v-btn>
            </v-row>
            <v-row>
                <v-col cols="3"></v-col>
                <v-col cols="6">
                    <v-text-field class="mb-n12" v-model="search_txt" label="Student Search" outlined shaped></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                
                <v-col cols="3"></v-col>
                <v-col cols="6" lg="6">
                <v-card class="mt-n16 mx-auto" elevation="12" height="350px">
                    <v-toolbar flat>
                        <v-toolbar-title class="grey--text">View Courses for Students (List Students)</v-toolbar-title>
                    </v-toolbar>
                    <v-list style="max-height: 300px" class="overflow-y-auto">
                        <v-list-item>
                            <v-list-item-content>
                                <v-dialog v-model="dialog" width="500">
                                    <template v-slot:activator="{ on }">
                                    <v-btn color="amber darken-1" dark v-on="on">
                                        (Get Student Name)
                                    </v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title
                                            class="headline grey lighten-2"
                                            primary-title
                                        >
                                            (Get Student Name)
                                        </v-card-title>
                                        <v-divider></v-divider>
                                        <v-card-text>
                                            (Get Student's Planned Classes)
                                        </v-card-text>
                                        <v-divider></v-divider>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="blue" text @click="dialog = false">
                                                Ok
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-list-item-content>
                        </v-list-item>
            
                        <!--repeat--> 

                    </v-list>
                    
                </v-card>
                </v-col>
  
            </v-row>
            <v-row>
                <v-col cols="8">
                    <v-btn class="mt-12 ma-12" outlined color="blue" @click="$router.push('/login')" dark>Logout</v-btn>
                </v-col>
                <v-col cols="4">
                    <v-btn class="mt-12" outlined color="blue" @click="$router.push('/messages')" dark>Messages</v-btn>
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
        search_txt: ""
  }),
};
</script>
