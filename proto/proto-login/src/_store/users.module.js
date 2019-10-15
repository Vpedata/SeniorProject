/**
  * Builds the users module that stores the users registered
  */

//imports 'userService' constant exported from the 'user.service.js' file in the '../_services' folder, exported by the 'index.js' file in the same folder
import { userService } from '../_services';

//constant 'state' that contains 'all' users and defaults to empty
const state = {
    all: {}
};

// constant 'actions' that contains the actons of the users storage data structure
const actions = {
    //getAll() action function that makes a request to get all users and calls the userService.getAll() function to do so, resulting in either 'users' being passed 'users' upon success or 'error' being passed 'error' upon failure
    getAll({ commit }) {
        commit('getAllRequest');

        userService.getAll()
            .then(
                users => commit('getAllSuccess', users),
                error => commit('getAllFailure', error)
            );
    },

    //delete() action function that deletes the user with 'id' and calls the userService.delete() function to do so, resulting in either 'user' being passed 'id' upon success or 'error' being passed 'id' and 'error: error.toString()' upon failure
    delete({ commit }, id) {
        commit('deleteRequest', id);

        userService.delete(id)
            .then(
                user => commit('deleteSuccess', id),
                error => commit('deleteFailure', { id, error: error.toString() })
            );
    }
};

const mutations = {
    getAllRequest(state) {
        state.all = { loading: true };
    },
    getAllSuccess(state, users) {
        state.all = { items: users };
    },
    getAllFailure(state, error) {
        state.all = { error };
    },
    deleteRequest(state, id) {
        // add 'deleting:true' property to user being deleted
        state.all.items = state.all.items.map(user =>
            user.id === id
                ? { ...user, deleting: true }
                : user
        )
    },
    deleteSuccess(state, id) {
        // remove deleted user from state
        state.all.items = state.all.items.filter(user => user.id !== id)
    },
    deleteFailure(state, { id, error }) {
        // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
        state.all.items = state.items.map(user => {
            if (user.id === id) {
                // make copy of user without 'deleting:true' property
                const { deleting, ...userCopy } = user;
                // return copy of user with 'deleteError:[error]' property
                return { ...userCopy, deleteError: error };
            }

            return user;
        })
    }
};

export const users = {
    namespaced: true,
    state,
    actions,
    mutations
};
