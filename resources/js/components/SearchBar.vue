<template>
    <div class="search-bar">
        <form class="searchbar">
            <div class="input-group">
                <input type="text" class="form-control" name="q" placeholder="Search Users" @keydown.enter="getSearchResults">
                <span class="input-group-btn">
                    <button type="submit" class="btn btn-default" style="background-color: #cccccc;" @click="getSearchResults">
                        <img style="max-height: 20px;" src="https://freeiconshop.com/wp-content/uploads/edd/search-solid.png">
                    </button>
                </span>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                contacts: [],
                results: []
            };
        },
        mounted() {
            axios.get('/contacts')
                .then((response) => {
                    this.contacts = response.data;
                });
        },
        methods: {
            getSearchResults() {

            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
