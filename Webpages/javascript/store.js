const store = new Vuex.Store({
    state: {
        message: 'student',
        uid: "916000000"
    },
    mutations: {
        set_uid(state, value) {
            state.uid=value;
        }
    },
    getters: {
        message(state) {
            return state.message.toUpperCase();
        },
        get_uid(state) {
            return state.uid;
        }
    } 
});

new Vue({
    el: '#app1',
    data() {
        return {
            welcome: 'Hello World'
        }
    },
    computed: {
        message() {
            return store.getters.message;
        },
        get_uid() {
            return store.getters.get_uid;
        },
    },
    methods: {
        press_set_uid() {
            store.commit('set_uid', document.getElementById('uid_input').value);
        }
    }
})    