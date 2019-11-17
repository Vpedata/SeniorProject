<template>
    <div id="app">
    <v-app id="inspire">
        <div class="amber lighten-5 pa-4">
            <v-row>
                <v-toolbar color="amber darken-1" dark>
                <v-toolbar-title class="brown--text">
                    {{name}}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn  @click="$router.push('/fe/classlistadvisor')" dark>Back</v-btn>
                    <v-btn  @click="$router.push('/fe/adv/advisor')" dark>Home</v-btn>
                    <v-btn  @click="$router.push('/messages')" dark>Messages</v-btn>
                    <v-btn  @click="logout" dark>Logout</v-btn>
                </v-toolbar-items>
                </v-toolbar>
            </v-row>
            <v-row>
                <v-col cols=4></v-col>
                <v-col cols=3>
                    <v-text-field class = 'ma-12' v-model = 'class_name' label = 'Class Name' outlined></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols=3></v-col>
                <v-col cols=5>
                    <v-textarea class = 'ma-3 mt-n8' v-model = 'class_desc' label = 'Class Description' outlined maxlength = '120'></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols=5></v-col>
                <v-checkbox
                    v-model="isCore"
                    class = 'ma-3 mt-n8'
                    :label="`Core Course`"
                ></v-checkbox>
            </v-row>
            <v-row>
                 <v-col cols="4"></v-col>
                 <v-col cols="3">
                <v-text-field class = 'ma-3 mt-n8' v-model = 'courseCode' label = 'Course Code' single-line type="number" hide-details></v-text-field>
                 </v-col>
            </v-row>
            <v-row>
                 <v-col cols="4"></v-col>
                 <v-col cols="3">
                <v-text-field class = 'ma-3 mt-n8' v-model = 'class_credits' label = 'Credits' single-line type="number" hide-details></v-text-field>
                 </v-col>
            </v-row>
            
            <v-row>
                <v-col cols="3"></v-col>
                <v-col cols="3">
                <v-text-field v-model="prereq_current"></v-text-field>
                </v-col>
                <v-btn @click="prereq_list.push(prereq_current)" >Add PreReq Course Code</v-btn>
                <v-btn @click="prereq_list.pop()" >Undo</v-btn>
            </v-row>
            <v-chip 
                v-for="prereq in prereq_list" 
                :key="prereq.id" 
                v-model="prereq.isOpen"
                >
                {{prereq}}
                </v-chip>
            <v-row>
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
        class_desc: '',
        class_credits: null,
        prereq_list: [],
        isCore: false,
        courseCode: null,
        name: " "
  }),
    //createCourse() {
    //      axios.post(??, {
    //          class_name: this.class_name,    
    //          class_desc: this.class_desc,    
    //          class_credits: this.class_credits
    //      }).then(function (response) {
    //          console.log(response);
    //      })
    //      .catch(function (error) {
    //          console.log(error);
    //      });
    //      
    //},
    beforeMount(){
      axios
      .get('/user/getName')
      .then(response => {
        this.name = response.data.firstName + " " + response.data.lastName;
      }).bind(this)
      .catch(error => {
        console.log(error)
      })
  }
};
</script>
