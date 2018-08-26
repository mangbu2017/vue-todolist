import Router from 'vue-router';
import Vue from 'vue';
import All from '@/components/all.vue';
import Finished from '@/components/finished.vue';
import Unfinished from '@/components/unfinished.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'all',
            component: All,
        }, {
            path: '/finished',
            name: 'finished',
            component: Finished
        }, {
            path: '/unfinished',
            name: 'unfinished',
            component: Unfinished
        }
    ]
})