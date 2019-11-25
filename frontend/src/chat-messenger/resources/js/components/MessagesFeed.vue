<template>
    <div class="feed" ref="feed">
        <ul v-if="contact">
            <li v-for="message in messages" :class="`message${message.isFromUser ? (message.receiver == contact.user_ID ? ' sent' : ' received') : ' system'}`" :key="message.message_ID">
                <div class="text">
                    {{ message.content }}
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            contact: {
                type: Object
            },
            messages: {
                type: Array,
                required: true
            }
        },
        methods: {
            scrollToBottom() {
                setTimeout(() => {
                    this.$refs.feed.scrollTop = this.$refs.feed.scrollHeight - this.$refs.feed.clientHeight;
                }, 50);
            }
        },
        watch: {
            contact(contact) {
                this.scrollToBottom();
            },
            messages(messages) {
                this.scrollToBottom();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .feed {
        background: #f0f0f0;
        height: 100%;
        max-height: 470px;
        overflow: auto;

        ul {
            list-style-type: none;
            padding: 5px;

            li {
                &.message {
                    margin: 10px 0;
                    width: 100%;

                    .text {
                        max-width: 300px;
                        border-radius: 5px;
                        padding: 12px;
                        display: inline-block;
                    }

                    &.received {
                        text-align: left;

                        .text {
                            background: #602e00;
                            color: #ffffff;
                        }
                    }

                    &.sent {
                        text-align: right;

                        .text {
                            background: #ffee00;
                        }
                    }

                    &.system {
                        text-align: center;
                        border-top-style: solid;
                        border-bottom-style: solid;
                        border-color: #000000;
                        border-width: 2px;

                        .text {
                            background: transparent;
                            color: #555555;
                        }
                    }
                }
            }
        }
    }
</style>
