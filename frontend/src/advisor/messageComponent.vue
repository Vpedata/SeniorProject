<template>
    <v-list-item>
            <v-list-item-content>
                <v-list-item-title>
                    <span :class="whichFloat">
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
    computed:function() {
        let user = ""
        let whichFloat = ""
        if(this.message.sender === this.student.user_ID){
            user = this.student.name;
            whichFloat = "float-left";
        }
        else{
            user = this.name;
            whichFloat = "float-right";
        }


    },
    data: function() {
        return {
            user="",
        } 
    }
}
</script>