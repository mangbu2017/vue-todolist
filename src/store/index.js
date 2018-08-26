import Vue from 'vue';
import Vuex from 'vuex';
import {
    SET_ISEDITING, 
    SET_BEFOREEDITING, 
    SET_VIEW, 
    PUSH_LIST, 
    DELETE_LIST,
} from './mutation-types';

Vue.use(Vuex);

var myLocalStorage = {
    save(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    get(key) {
        return JSON.parse(localStorage.getItem(key));
    }
}

export default new Vuex.Store({
    state: {
        list: myLocalStorage.get('todolist'),
        inputValue: '',
        isEditing: '',
        beforeEditing: '',
        view: 'all',
    },
    mutations: {
        [SET_ISEDITING](state, data) {
            state.isEditing = data;
        },
        [SET_BEFOREEDITING](state, data) {
            state.beforeEditing = data;
        },
        [SET_VIEW](state, data) {
            state.view = data;
        },
        [PUSH_LIST](state, data) {
            state.list.push(data);
        },
        [DELETE_LIST](state, data) {
            var index = state.list.indexOf(data);
            state.list.splice(index, 1);
        } 
    }
});