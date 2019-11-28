<template>
    <v-list-item>
            <v-list-item-content>
                <v-list-item-title>
                    <span :class="classObject">
                        <small>{{user}}</small>:{{message.content}}
                    </span>
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item> 
</template>

<script>
import axios from 'axios';
export default { 
    name: "messageComponent",
    props: {
        message: Object,
        student: Object,
        name: String
    },
    computed: {
        classObject: function() {
            if(this.message.sender === this.student.user_ID){
             return "float-left"
            }
            else{
                return "float-right";
            }
        }

    },
    data: function() {
        return {
        } 
    }
}
</script>