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
                <v-col cols="3"></v-col>
                <v-col cols="9" lg="6">
                <v-card class="mt-n16 mx-auto" elevation="12" height="600px">
                    <v-toolbar flat>
                        <v-toolbar-title class="grey--text">Add Classes</v-toolbar-title>
                    </v-toolbar>
                    <v-list style="max-height: 600px" class="overflow-y-auto">
                        <v-list-item>
                            <v-list-item-content>
                                <v-dialog v-model="dialog" width="500">
                                    <template v-slot:activator="{ on }">
                                    <v-btn color="indigo lighten-2" dark v-on="on">
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
                    <v-btn class="mt-12 ma-12" outlined color="blue" @click="$router.push('/studentview')" dark>Back</v-btn>
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
        dialog: false
  }),
};
</script>