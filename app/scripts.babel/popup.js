import Vue from 'vue';
import Popup from './components/popup.vue';

const MrfOption = Vue.component('mrf-option', require('./components/MrfOption.vue'));
const MrfLink = Vue.component('mrf-link', require('./components/MrfLink.vue'));

new Vue({
    el: '#app',
    render: c => c(Popup)
});
