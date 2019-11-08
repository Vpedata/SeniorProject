<template>
    <div id="app">
    <v-app id="inspire">
        <div class="grey lighten-5 pa-4">
            <v-row>
                <v-toolbar dark>
                <v-toolbar-title>
                    {{account.user.firstName}} {{account.user.lastName}}
                </v-toolbar-title>
                </v-toolbar>
            </v-row>
            <v-row>
                <v-col cols="2"></v-col>
                <v-col cols="10" lg="8">
                <v-card class="mt-n16 mx-auto" elevation="12" height="600px">
                    <v-toolbar flat>
                        <v-toolbar-title class="grey--text">Select Completed Classes</v-toolbar-title>
                    </v-toolbar>
                    <p>Debug List: {{ selected_courses }}</p>
                    <v-list style="max-height: 600px" class="overflow-y-auto">
                        <v-list-item>
                            <v-list-item-content>
                                <v-checkbox class="ml-4" v-model="selected_courses" label="Class1" value="Class1"></v-checkbox>
                            </v-list-item-content>
                        </v-list-item>
            
                        <v-list-item>
                            <v-list-item-content>
                                <v-checkbox class="ml-4" v-model="selected_courses" label="Class2" value="Class2"></v-checkbox>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                    
                </v-card>
                </v-col>
  
            </v-row>
            <v-row>
                <v-col cols="8">
                    <v-btn class="mt-12 ma-12" outlined color="blue" @click="$router.push('/studentview')" dark>Back</v-btn>
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
        selected_courses: []
    }
  ),
};
</script>