
<template>
        <v-list-item>
            <v-list-item-content>
                <v-dialog v-model="dialog" width="500">
                    <template v-slot:activator="{ on }">
                    <v-row>
                    <v-toolbar color="amber darken-1" dark v-on="on">
                        <v-toolbar-title class="brown--text">{{course.name}}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                        <v-icon>{{ icons.mdiPencil }}</v-icon>
                        <div class="mx-2"></div>
                        <v-icon>{{ icons.mdiDelete}}</v-icon>
                        </v-toolbar-items>
                    </v-toolbar>
                    </v-row>
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