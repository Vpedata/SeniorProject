<template>
    <div class="search-bar">
        <div class="input" @click="toggleVisible" v-text="'Search...'"></div>
        <div class="popover" v-if="visible">
            <input type="text" v-model="query" @keydown.up="up" @keydown.down="down" @keydown.enter="selectContact" placeholder="Search Users...">
            <div class="options" ref="optionsList">
                <ul>
                    <li v-for="(match, index) in matches" :key="index" :class="{ 'selected': (selected == index) }" @click="userClicked(index)">
                        <div class ="contact">
                            <p class="name">{{ match.name }}</p>
                            <p class="email">{{ match.email }}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
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
                selectedContact: null,
                selected: 0,
                visible: false,
                query: ''
            };
        },
        mounted() {

        },
        methods: {
            toggleVisible() {
                this.visible = !this.visible;
                console.log(this.contacts);
            },
            userClicked(index) {
                this.selected = index;
                this.selectContact();
            },
            selectContact() {
                this.selectedContact = this.matches[this.selected];
                this.visible = false;
                this.query = '';
                this.selected = 0;
                this.$root.$emit('selectedResult', this.selectedContact);
            },
            up() {
                if(this.selected === 0) {
                    return;
                }

                this.selected -= 1;
                this.scrollToItem();
            },
            down() {
                if(this.selected >= this.matches.length-1) {
                    return;
                }

                this.selected += 1;
                this.scrollToItem();
            },
            scrollToItem() {
                this.$refs.optionsList.scrollTop = this.selected * 65;
            }
        },
        computed: {
            matches() {
                if(this.query == '') {
                    return [];
                }

                var results = [];

                for(let i = 0; i < this.contacts.length; i++) {
                    if(this.contacts[i].name.toLowerCase().includes(this.query.toLowerCase()) || this.contacts[i].email.toLowerCase().includes(this.query.toLowerCase())) {
                        results.push(this.contacts[i]);
                    }
                }

                //console.log(this.contacts.filter((contact) => contact[name].toLowerCase()).includes(this.query.toLowerCase()));
                //return this.contacts.filter((contact) => (contact[name].toLowerCase()).includes(this.query.toLowerCase()));
                return results;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .search-bar {
        width: 100%;
        position: relative;
    }

    .input {
        height: 40px;
        border-radius: 3px;
        border: 2px solid lightgray;
        box-shadow: 0 0 10px #eceaea;
        font-size: 18px;
        padding-left: 10px;
        padding-top: 7px;
        cursor: pointer;
    }

    .popover {
        min-height: 50px;
        border: 2px solid lightgray;
        position:absolute;
        top:0px;
        left:0px;
        right:0px;
        background: #ffffff;
        border-radius: 3px;
        text-align: center;
    }

    .popover input {
        width: 95%;
        margin-top: 5px;
        height: 40px;
        font-size: 16px;
        border-radius: 3px;
        border: 1px solid lightgray;
        padding-left: 8px;
    }

    .options {
        max-height: 150px;
        overflow-y: scroll;
        margin-top: 5px;
        border: 1px solid black;

        ul {
            list-style-type: none;
            text-align: left;
            padding-left: 0;
            border-right: 1px solid gray;

            li {
                border-bottom: 1px solid gray;

                padding: 10px;
                cursor: pointer;
                background: #f1f1f1;

                p {
                    font-size: 14px;
                    margin: 0;
                }


            }

            li.selected {
                background: #1762ff;
                color: #ffffff;
                font-weight: bold;
            }
        }
    }
</style>
