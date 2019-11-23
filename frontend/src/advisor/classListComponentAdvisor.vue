<template>
    <v-list-item @click.stop="dialog = true">
            <v-list-item-content>
                <v-list-item-title>{{course.name}}</v-list-item-title>
                <v-card>
                    <v-card-title class="headline grey lighten-2" primary-title>
                         {{course.name}}
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        Course Code: {{course.courseCode}}, Credit Hours: {{course.creditHours}}
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue" text @click="dialog = false">Ok</v-btn>
                    </v-card-actions>
                </v-card>
            </v-list-item-content>
             <v-list-item-action>
                <v-btn color="primary" depressed>
                    <v-icon left>{{ icons.mdiDelete }}</v-icon>
                </v-btn>
                 <v-btn color="primary" depressed>
                    <v-icon left>{{ icons.mdiDelete }}</v-icon>
                </v-btn>
        </v-list-item-action>
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