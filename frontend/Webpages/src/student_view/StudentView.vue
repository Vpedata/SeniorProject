<template>
    <div id="app">
    <v-app id="inspire">
        <v-content>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Student View</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-tooltip bottom>
                    <v-btn
                        icon
                        large
                        :href="source"
                        target="_blank"
                        slot="activator"
                    >
                    </v-btn>
                    <span>Source</span>
                    </v-tooltip>
                </v-toolbar>
                </v-card>
            </v-flex>
            </v-layout>
        </v-container>
        </v-content>
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