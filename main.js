import Vue from 'vue'
import App from './App'

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom);
import TnCustom from './components/TnCustom/TnCustom.vue'
Vue.component('tn-custom', TnCustom)
import bookItem from './components/book/book-item.vue'
Vue.component('book-item', bookItem)
import activityList from './components/activity/activity-list.vue'
Vue.component('activity-list', activityList)
import tagList from './components/tag-list/tag-list.vue'
Vue.component('tag-list', tagList)
import gongduList from './components/gongdu/gongdu-list.vue'
Vue.component('gongdu-list', gongduList)
import shareList from './components/share/share-list.vue'
Vue.component('share-list', shareList)

// 引入:uView-UI
import uView from 'uview-ui';
Vue.use(uView);

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
