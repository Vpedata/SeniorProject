<template>
    <div id="app">
    <v-app id="inspire">
        <div class="amber lighten-5 pa-4">
            <v-row>
                <v-toolbar color="amber darken-1" dark>
                <v-toolbar-title class="brown--text">
                    {{account.user.firstName}} {{account.user.lastName}}
                </v-toolbar-title>
                </v-toolbar>
            </v-row>
            <v-row>
                <v-col cols="2"></v-col>
                <v-col cols="10" lg="8">
                <v-card class="mt-n16 mx-auto" elevation="12" height="800px">
                    <v-toolbar flat>
                        <v-toolbar-title class="grey--text">Select Completed Classes</v-toolbar-title>
                    </v-toolbar>
                    <p>List: {{ selected_courses }} {{course_grades}} </p>
                    <v-list style="max-height: 600px" class="overflow-y-auto">
                        <v-list-item>
                            <v-list-item-content>
                                <v-checkbox class="ml-4" v-model="selected_courses[0]" label="Intro to Object-Oriented Programming" value=IOOP></v-checkbox>
                            </v-list-item-content>
                        </v-list-item>
                        <div v-if ="selected_courses.indexOf('IOOP') > -1">
                            <v-item-group v-model="course_grades[0]">
                                <v-item
                                    class="mt-n12"
                                    v-for="n in ['A','A-','B+','B','B-','C+','C','C-','D+','D','D-','F']"
                                    :key="n"
                                    v-slot:default="{ active, toggle }"
                                >
                                    <v-chip label
                                    class="mt-n12 ms-1"
                                    active-class="green--text"
                                    :input-value="active"
                                    @click="toggle"
                                    >
                                    {{ n }}
                                    </v-chip>
                                </v-item>
                            </v-item-group>
                        </div>
            
                        <v-list-item>
                            <v-list-item-content>
                                <v-checkbox class="ml-4" v-model="selected_courses[1]" label="Object-Oriented Programming and Data Abstraction" value="OOPDA"></v-checkbox>
                            </v-list-item-content>
                        </v-list-item>
                        <div v-if ="selected_courses.indexOf('OOPDA') > -1">
                            <v-item-group v-model="course_grades[1]">
                                <v-item
                                    class="mt-n12"
                                    v-for="n in ['A','A-','B+','B','B-','C+','C','C-','D+','D','D-','F']"
                                    :key="n"
                                    v-slot:default="{ active, toggle }"
                                >
                                    <v-chip label
                                    class="mt-n12 ms-1"
                                    active-class="green--text"
                                    :input-value="active"
                                    @click="toggle"
                                    >
                                    {{ n }}
                                    </v-chip>
                                </v-item>
                            </v-item-group>
                        </div>

                        <v-list-item>
                            <v-list-item-content>
                                <v-checkbox class="ml-4" v-model="selected_courses[2]" label="Data Structures and Algorithms" value="DSA"></v-checkbox>
                            </v-list-item-content>
                        </v-list-item>
                        <div v-if ="selected_courses.indexOf('DSA') > -1">
                            <v-item-group v-model="course_grades[2]">
                                <v-item
                                    class="mt-n12"
                                    v-for="n in ['A','A-','B+','B','B-','C+','C','C-','D+','D','D-','F']"
                                    :key="n"
                                    v-slot:default="{ active, toggle }"
                                >
                                    <v-chip label
                                    class="mt-n12 ms-1"
                                    active-class="green--text"
                                    :input-value="active"
                                    @click="toggle"
                                    >
                                    {{ n }}
                                    </v-chip>
                                </v-item>
                            </v-item-group>
                        </div>

                        <v-list-item>
                            <v-list-item-content>
                                <v-checkbox class="ml-4" v-model="selected_courses[3]" label="Design and Analysis of Algorithms" value="DAA"></v-checkbox>
                            </v-list-item-content>
                        </v-list-item>
                        <div v-if ="selected_courses.indexOf('DAA') > -1">
                            <v-item-group v-model="course_grades[3]">
                                <v-item
                                    class="mt-n12"
                                    v-for="n in ['A','A-','B+','B','B-','C+','C','C-','D+','D','D-','F']"
                                    :key="n"
                                    v-slot:default="{ active, toggle }"
                                >
                                    <v-chip label
                                    class="mt-n12 ms-1"
                                    active-class="green--text"
                                    :input-value="active"
                                    @click="toggle"
                                    >
                                    {{ n }}
                                    </v-chip>
                                </v-item>
                            </v-item-group>
                        </div>

                        <v-list-item>
                            <v-list-item-content>
                                <v-checkbox class="ml-4" v-model="selected_courses[4]" label="Computer Lab Techniques" value="CLT"></v-checkbox>
                            </v-list-item-content>
                        </v-list-item>
                        <div v-if ="selected_courses.indexOf('CLT') > -1">
                            <v-item-group v-model="course_grades[4]">
                                <v-item
                                    class="mt-n12"
                                    v-for="n in ['A','A-','B+','B','B-','C+','C','C-','D+','D','D-','F']"
                                    :key="n"
                                    v-slot:default="{ active, toggle }"
                                >
                                    <v-chip label
                                    class="mt-n12 ms-1"
                                    active-class="green--text"
                                    :input-value="active"
                                    @click="toggle"
                                    >
                                    {{ n }}
                                    </v-chip>
                                </v-item>
                            </v-item-group>
                        </div>

                        <v-list-item>
                            <v-list-item-content>
                                <v-checkbox class="ml-4" v-model="selected_courses[5]" label="Foundations of Computer Science" value="Foundations"></v-checkbox>
                            </v-list-item-content>
                        </v-list-item>
                        <div v-if ="selected_courses.indexOf('Foundations') > -1">
                            <v-item-group v-model="course_grades[5]">
                                <v-item
                                    class="mt-n12"
                                    v-for="n in ['A','A-','B+','B','B-','C+','C','C-','D+','D','D-','F']"
                                    :key="n"
                                    v-slot:default="{ active, toggle }"
                                >
                                    <v-chip label
                                    class="mt-n12 ms-1"
                                    active-class="green--text"
                                    :input-value="active"
                                    @click="toggle"
                                    >
                                    {{ n }}
                                    </v-chip>
                                </v-item>
                            </v-item-group>
                        </div>

                        <v-list-item>
                            <v-list-item-content>
                                <v-checkbox class="ml-4" v-model="selected_courses[6]" label="Computer Organization" value="Comp Org"></v-checkbox>
                            </v-list-item-content>
                        </v-list-item>
                        <div v-if ="selected_courses.indexOf('Comp Org') > -1">
                            <v-item-group v-model="course_grades[6]">
                                <v-item
                                    class="mt-n12"
                                    v-for="n in ['A','A-','B+','B','B-','C+','C','C-','D+','D','D-','F']"
                                    :key="n"
                                    v-slot:default="{ active, toggle }"
                                >
                                    <v-chip label
                                    class="mt-n12 ms-1"
                                    active-class="green--text"
                                    :input-value="active"
                                    @click="toggle"
                                    >
                                    {{ n }}
                                    </v-chip>
                                </v-item>
                            </v-item-group>
                        </div>

                        <v-list-item>
                            <v-list-item-content>
                                <v-checkbox class="ml-4" v-model="selected_courses[7]" label="Cyber Security" value="Cyber Security"></v-checkbox>
                            </v-list-item-content>
                        </v-list-item>
                        <div v-if ="selected_courses.indexOf('Cyber Security') > -1">
                            <v-item-group v-model="course_grades[7]">
                                <v-item
                                    class="mt-n12"
                                    v-for="n in ['A','A-','B+','B','B-','C+','C','C-','D+','D','D-','F']"
                                    :key="n"
                                    v-slot:default="{ active, toggle }"
                                >
                                    <v-chip label
                                    class="mt-n12 ms-1"
                                    active-class="green--text"
                                    :input-value="active"
                                    @click="toggle"
                                    >
                                    {{ n }}
                                    </v-chip>
                                </v-item>
                            </v-item-group>
                        </div>

                        <v-list-item>
                            <v-list-item-content>
                                <v-checkbox class="ml-4" v-model="selected_courses[8]" label="Operating Systems" value="OS"></v-checkbox>
                            </v-list-item-content>
                        </v-list-item>
                        <div v-if ="selected_courses.indexOf('OS') > -1">
                            <v-item-group v-model="course_grades[8]">
                                <v-item
                                    class="mt-n12"
                                    v-for="n in ['A','A-','B+','B','B-','C+','C','C-','D+','D','D-','F']"
                                    :key="n"
                                    v-slot:default="{ active, toggle }"
                                >
                                    <v-chip label
                                    class="mt-n12 ms-1"
                                    active-class="green--text"
                                    :input-value="active"
                                    @click="toggle"
                                    >
                                    {{ n }}
                                    </v-chip>
                                </v-item>
                            </v-item-group>
                        </div>

                        <v-list-item>
                            <v-list-item-content>
                                <v-checkbox class="ml-4" v-model="selected_courses[9]" label="Programming Languages" value="PL"></v-checkbox>
                            </v-list-item-content>
                        </v-list-item>
                        <div v-if ="selected_courses.indexOf('PL') > -1">
                            <v-item-group v-model="course_grades[9]">
                                <v-item
                                    class="mt-n12"
                                    v-for="n in ['A','A-','B+','B','B-','C+','C','C-','D+','D','D-','F']"
                                    :key="n"
                                    v-slot:default="{ active, toggle }"
                                >
                                    <v-chip label
                                    class="mt-n12 ms-1"
                                    active-class="green--text"
                                    :input-value="active"
                                    @click="toggle"
                                    >
                                    {{ n }}
                                    </v-chip>
                                </v-item>
                            </v-item-group>
                        </div>

                        <v-list-item>
                            <v-list-item-content>
                                <v-checkbox class="ml-4" v-model="selected_courses[10]" label="Software Engineering" value="SWENG"></v-checkbox>
                            </v-list-item-content>
                        </v-list-item>
                        <div v-if ="selected_courses.indexOf('SWENG') > -1">
                            <v-item-group v-model="course_grades[10]">
                                <v-item
                                    class="mt-n12"
                                    v-for="n in ['A','A-','B+','B','B-','C+','C','C-','D+','D','D-','F']"
                                    :key="n"
                                    v-slot:default="{ active, toggle }"
                                >
                                    <v-chip label
                                    class="mt-n12 ms-1"
                                    active-class="green--text"
                                    :input-value="active"
                                    @click="toggle"
                                    >
                                    {{ n }}
                                    </v-chip>
                                </v-item>
                            </v-item-group>
                        </div>

                        <v-list-item>
                            <v-list-item-content>
                                <v-checkbox class="ml-4" v-model="selected_courses[11]" label="Computers and Society" value="Comp and Soc"></v-checkbox>
                            </v-list-item-content>
                        </v-list-item>
                        <div v-if ="selected_courses.indexOf('Comp and Soc') > -1">
                            <v-item-group v-model="course_grades[11]">
                                <v-item
                                    class="mt-n12"
                                    v-for="n in ['A','A-','B+','B','B-','C+','C','C-','D+','D','D-','F']"
                                    :key="n"
                                    v-slot:default="{ active, toggle }"
                                >
                                    <v-chip label
                                    class="mt-n12 ms-1"
                                    active-class="green--text"
                                    :input-value="active"
                                    @click="toggle"
                                    >
                                    {{ n }}
                                    </v-chip>
                                </v-item>
                            </v-item-group>
                        </div>
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
        selected_courses: [],
        course_grades: []
    }
  ),
};
</script>
