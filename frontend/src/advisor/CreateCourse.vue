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
                <v-text-field class = 'ma-12' v-model = 'class_name' label = 'Class Name' outlined></v-text-field>
            </v-row>
            <v-row>
                <v-textarea class = 'ma-3' v-model = 'class_desc' label = 'Class Description' outlined maxlength = '120'></v-textarea>
            </v-row>
            <v-row>
                
            </v-row>
            <v-row>
                <v-col cols="8">
                    <v-btn class="mt-12 ma-12" outlined color="blue" @click="$router.push('/advisorview')" dark>Back</v-btn>
                </v-col>
                <v-col cols="4">
                    <v-btn class="mt-12" outlined color="blue" @click="$router.push('/advisorview')" dark>Create</v-btn>
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
        class_name: '',
        class_desc: ''
  }),
};
</script>
