import Vue from 'vue';
import MuseUI from 'muse-ui';
import VConsole from 'vconsole';
import 'muse-ui/dist/muse-ui.css';

import App from './App.vue';

(window as any).vc = new VConsole();

Vue.use(MuseUI);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
