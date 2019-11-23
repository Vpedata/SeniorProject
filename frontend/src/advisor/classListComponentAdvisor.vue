<template>
    <v-list-item @click.stop="dialog = true">
            <v-list-item-content>
                <v-list-item-title>{{course.name}}</v-list-item-title>
                <v-dialog v-model="dialog" width="500">
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
                </v-dialog>
            </v-list-item-content>
             <v-list-item-action>
                <editCourse/>
                <v-btn class="mx-2" fab dark large color="purple" >
                    <v-icon dark>mdi-delete</v-icon>
                </v-btn>
        </v-list-item-action>
        </v-list-item> 
</template>

<script>
import axios from 'axios';
import editCourse from'./EditCourse.vue'
export default {
    name: "classComponent",
    props: {
        course: Object,
    },
    components: {
        editCourse
    },
    data: () => ({
        dialog: false
    }),
}
</script>