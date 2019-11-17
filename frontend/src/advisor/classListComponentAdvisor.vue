
<template>
        <v-list-item>
            <v-list-item-content>
                <v-dialog v-model="dialog" width="500">
                    <template v-slot:activator="{ on }">
                    <v-toolbar :color="bar.class" :dark="bar.dark">
                        <v-app-bar-nav-icon></v-app-bar-nav-icon>
                        <v-btn v-on="on"> {{course.name}} </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn>
                        Edit
                        </v-btn>
                        <v-btn>
                         Remove   
                        </v-btn>
                    </v-toolbar>
                    </template>
                    <v-card>
                        <v-card-title
                            class="headline grey lighten-2"
                            primary-title
                        >
                         {{course.name}}
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            Course Code: {{course.courseCode}}, Credit Hours: {{course.creditHours}}
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
</template>

<script>
import axios from 'axios';

export default {
    name: "classComponent",
    props: {
        course: Object,
    },
    data: () => ({
        dialog: false
    }),
}
</script>