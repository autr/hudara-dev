import Vue from 'vue'
import PrismicVue from 'prismic-vue'
import linkResolver from './prismic/link-resolver'
import htmlSerializer from './prismic/html-serializer'
import App from './App.vue'
import router from './router'
import { VueGrid } from '@liqueflies/vue-grid'
import GoCardless from 'gocardless-api'



Vue.config.productionTip = false


Vue.use(VueGrid, {
	gutter: 24
})

Vue.use(PrismicVue, {
  endpoint: window.prismic.endpoint,
  linkResolver,
  htmlSerializer
})

Vue.config.lang = 'en';
console.log(Vue.config.lang);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
