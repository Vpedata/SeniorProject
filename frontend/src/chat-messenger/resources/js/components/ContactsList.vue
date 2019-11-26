<template>
    <div class="contacts-list">
        <SearchBar :contacts="contacts" :user="user" v-if="!studentUser"></SearchBar>
        <div class="conlist">
            <ul>
                <li v-for="contact in sortedContacts" :key="contact.user_ID" @click="selectContact(contact)" :class="{ 'selected': contact == selected }">

<!--                    <div class="avatar">-->
<!--                        <img :src="contact.profile_image" :alt="contact.name">-->
<!--                    </div>-->
                    <div class ="contact">
                        <p class="name">{{ contact.firstName }} {{ contact.lastName }}</p>
                        <p class="email">{{ contact.email }}</p>
                    </div>
                    <span class="unread" v-if="contact.unread">{{ contact.unread }}</span>
                    <span v-for="onlineContact in onlineContacts" class="online" v-if="contact.user_ID == onlineContact.user_ID && onlineContact.online"></span>
                    <span v-for="onlineContact in onlineContacts" class="offline" v-if="contact.user_ID == onlineContact.user_ID && !onlineContact.online"></span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import SearchBar from "./SearchBar";
    export default {
        props: {
            contacts: {
                type: Array,
                default: []
            },
            user: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                selected: this.contacts.length ? this.contacts[0] : null,
                messages: [],
                onlineContacts: [],
                studentUser: true
            };
        },
        mounted() {
            this.$root.$on('updateMessages', () => {
                this.updateMessages();
                });
            axios.get('/messages')
                .then((response) => {
                    // console.log(response.data);
                    this.messages = response.data;
                });
            this.interval = setInterval(() => this.updateOnline(), 1000);
            this.$root.$on('stopOnline', () => {
               this.interval = clearInterval();
                });
            this.$root.$on('selectedResult', (contact) => {
                    this.selectContact(contact);
                });
            this.checkStudent();
        },
        methods: {
            selectContact(contact) {
                this.selected = contact;
                this.$emit('selected', contact);
            },
            updateMessages() {
                    axios.get('/messages')
                        .then((response) => {
                            this.messages = response.data;
                        });
            },
            updateOnline() {
                axios.get('/contacts/onlineContacts')
                    .then((response) => {
                        this.onlineContacts = response.data;
                    });
            },
            checkStudent() {
                if(this.user.IsStudent === 1) {
                    this.studentUser = true;
                } else {
                    this.studentUser = false;
                }
            }
        },
        computed: {
            sortedContacts() {
                // return _.sortBy(this.contacts, [(contact) => {
                //     // if(contact == this.selected) {
                //     //     return Infinity;
                //     // }
                //
                //     return contact.unread;
                // }]).reverse();


                var notContacts = [];
                //console.log('-------- NEW --------');
                var temp = _.sortBy(this.contacts, [(contact) => {
                    // console.log(contact.firstName + ': ' + contact.user_ID);
                    // console.log('contact: ' + contact.user_ID);
                    var recent = -1;
                    for(let i in this.messages) {
                        var message = this.messages[i];
                        // console.log(message.message_ID + ': sender -> ' + message.sender + ' | reciever -> ' + message.reciever);
                        // if(i == 1) {console.log(message);}
                        if((message.reciever === contact.user_ID && message.sender === this.user.user_ID) || (message.reciever === this.user.user_ID && message.sender === contact.user_ID)) {
                            if(message.message_ID > recent) {
                                recent = message.message_ID;
                            }
                        }
                    }

                    if(recent === -1) {
                        // console.log(contact.firstName + ' - ' + contact.user_ID);
                        notContacts.push(contact);
                        // console.log(notContacts);
                    }
                    // console.log('Message ID: ' + recent);
                    return recent;
                }]).reverse();

                for(let i in notContacts) {
                    var con = notContacts[i];
                    var index = temp.indexOf(con);
                    temp.splice(index);
                }

                // console.log(temp);
                return temp;


                // return this.contacts.sort(function (a, b) {
                //     return new Date(b.updated_at) - new Date(a.updated_at);
                // });
            }
        },
        components: {SearchBar}
    }
</script>

<style lang="scss" scoped>
    .contacts-list {
        flex: 2;
        height: 600px;
        border-left: 1px solid #a6a6a6;

        .conlist {
            max-height: 560px;
            overflow: auto;
            ul {
                list-style-type: none;
                padding-left: 0;

                li {
                    display: flex;
                    padding: 2px;
                    border-bottom: 1px solid #aaaaaa;
                    height: 80px;
                    position: relative;
                    cursor: pointer;

                    &.selected {
                        background: #dfdfdf;
                    }

                    span.unread {
                        background: #82e0a8;
                        color: #ffffff;
                        position: absolute;
                        right: 11px;
                        top: 20px;
                        display: flex;
                        font-weight: 700;
                        min-width: 20px;
                        justify-content: center;
                        align-items: center;
                        line-height: 20px;
                        font-size: 12px;
                        padding: 0 4px;
                        border-radius: 3px;
                    }

                    span.online {
                        height: 10px;
                        width: 10px;
                        background-color: #01ff00;
                        border-radius: 50%;
                        display: inline-block;
                        position: absolute;
                        right: 10px;
                        top: 10px;
                    }

                    span.offline {
                        height: 10px;
                        width: 10px;
                        background-color: #777777;
                        border-radius: 50%;
                        display: inline-block;
                        position: absolute;
                        right: 10px;
                        top: 10px;
                    }

                    /*.avatar {*/
                    /*    flex: 1;*/
                    /*    display: flex;*/
                    /*    align-items: center;*/

                    /*    img {*/
                    /*        width: 35px;*/
                    /*        border-radius: 50%;*/
                    /*        margin: 0 auto;*/
                    /*    }*/
                    /*}*/

                    .contact {
                        flex: 3;
                        font-size: 12px;
                        overflow: hidden;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;

                        p {
                            margin: 0;
                            margin-left: 5px;

                            &.name {
                                font-weight: bold;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
