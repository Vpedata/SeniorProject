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
                <v-btn class="ma-2" outlined color="red" @click="$router.push('/login')" dark>Edit Completed Courses</v-btn>
            </v-row>
            <v-row>
                <v-col cols="3">
                    <v-row>
                        <v-btn class="ms-12 mt-12" outlined color="red" @click="$router.push('/login')" dark>Generate</v-btn>
                    </v-row>
                    <v-row>
                        <v-btn class="ms-12 mt-4" outlined color="indigo" @click="$router.push('/studentaddclass')" dark>Add Class</v-btn>
                    </v-row>
                </v-col>
                <v-col cols="9" lg="6">
                <v-card class="mt-n16 mx-auto" elevation="12" height="350px">
                    <v-toolbar flat>
                        <v-toolbar-title class="grey--text">Selected Classes</v-toolbar-title>
                    </v-toolbar>
                    <v-list style="max-height: 300px" class="overflow-y-auto">
                        <v-list-item @click="$router.push('/login')">
                            <v-list-item-content>
                            <v-list-item-title>Class1</v-list-item-title>
                            
                            </v-list-item-content>
                        </v-list-item>
            
                        <v-list-item @click="$router.push('/login')">
                            <v-list-item-content>
                            <v-list-item-title>Class2</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
            
                        <v-list-item @click="$router.push('/login')">
                            <v-list-item-content>
                            <v-list-item-title>Class3</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item @click="$router.push('/login')">
                            <v-list-item-content>
                            <v-list-item-title>Class4</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item @click="$router.push('/login')">
                            <v-list-item-content>
                            <v-list-item-title>Class5</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item @click="$router.push('/login')">
                            <v-list-item-content>
                            <v-list-item-title>Class6</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item @click="$router.push('/login')">
                            <v-list-item-content>
                            <v-list-item-title>Class7</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item @click="$router.push('/login')">
                            <v-list-item-content>
                            <v-list-item-title>Class8</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                    
                </v-card>
                </v-col>
  
            </v-row>
            <v-row>
                <v-col cols="8">
                    <v-btn class="mt-12 ma-12" outlined color="indigo" @click="$router.push('/login')" dark>Logout</v-btn>
                </v-col>
                <v-col cols="4">
                    <v-btn class="mt-12" outlined color="indigo" @click="$router.push('/messages')" dark>Messages</v-btn>
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
    }
};
</script>