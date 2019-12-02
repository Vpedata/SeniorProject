<template>
    <div class="chat-app">
        <Conversation :contact="selectedContact" :messages="messages" @new="saveNewMessage"/>
        <ContactsList :contacts="contacts" :user="user" @selected="startConversationWith"/>
    </div>
</template>

<script>
    import Conversation from './Conversation';
    import ContactsList from "./ContactsList";

    export default {
        props: {
            user: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                selectedContact: null,
                messages: [],
                contacts: [],
            };
        },
        mounted() {
            Echo.private(`messages.${this.user.user_ID}`)
                .listen('NewMessage', (e) => {
                    console.log(e.message);
                    this.handleIncoming(e.message);
                });
            axios.get('/messenger/contacts')
                .then((response) => {
                    // console.log(response.data);
                    this.contacts = response.data;
                    // console.log(this.contacts);
            });
        },
        methods: {
            startConversationWith(contact) {
                this.updateUnreadCount(contact, true);

                axios.get(`/messenger/conversation/${contact.user_ID}`)
                    .then((response) => {
                        this.messages = response.data;
                        this.selectedContact = contact;
                    });
            },
            saveNewMessage(message) {
                this.messages.push(message);
            },
            handleIncoming(message) {
                if (this.selectedContact && message.sender == this.selectedContact.user_ID) {
                    this.saveNewMessage(message);
                    return;
                }

                this.$root.$emit('updateMessages');
                this.updateUnreadCount(message.from_contact, false);
            },
            updateUnreadCount(contact, reset) {
                this.contacts = this.contacts.map((single) => {
                    if(single.user_ID !== contact.user_ID) {
                        return single;
                    }

                    if(reset) {
                        single.unread = 0;
                    } else {
                        single.unread += 1;
                    }

                    return single;
                })
            }
        },
        components: {Conversation, ContactsList}
    }
</script>

<style lang="scss" scoped>
    .chat-app {
        display: flex;
    }
</style>
