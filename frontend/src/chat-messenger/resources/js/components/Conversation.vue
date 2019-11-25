<template>
    <div class="conversation">
        <h1>{{ contact ? contact.firstName + ' ' + contact.lastName : 'Select a Contact'}}</h1>
        <MessagesFeed :contact="contact" :messages="messages" />
        <MessageComposer @send="sendMessage" v-if="contact" />
    </div>
</template>

<script>
    import MessageComposer from './MessageComposer';
    import MessagesFeed from './MessagesFeed';

    export default {
        props: {
            contact: {
                type: Object,
                default: null
            },
            messages: {
                type: Array,
                default: []
            },
        },
        methods: {
            sendMessage(text) {
                if (!this.contact) {
                    return;
                }

                axios.post('/conversation/send', {
                    contact_id: this.contact.user_ID,
                    text: text,
                    isFromUser: 1,
                }).then((response) => {
                    this.$emit('new', response.data);
                });

                this.$root.$emit('updateMessages');
            }
        },
        components: {MessagesFeed, MessageComposer}
    }
</script>

<style lang="scss" scoped>
    .conversation {
        flex: 5;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        h1 {
            font-size: 20px;
            padding: 10px;
            margin: 0;
            border-bottom: 1px dashed #dddddd;
        }
    }
</style>
