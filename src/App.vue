<template lang="pug">
#app
  site-header
  router-view
  site-footer
</template>

<script>
	
import Vue from 'vue'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
export default {
  name: 'App',
  data () {
    return {
      navLinks: [],
      documentId: '',
      alternate_languages: '',
      fields: {
        title: null
      }
    }
  },
  methods: {
    getContent(lang) {
      // console.log('LOADING NAV', lang);
    }
  },
  created () {  
    this.getContent(Vue.config.lang)
  },
  beforeRouteUpdate (to, from, next) {
    this.getContent(Vue.config.lang)
    next()
  },
  components: {
    SiteFooter,
    SiteHeader
  }
}
</script>

<style lang="scss">
@import "./assets/css/site";
</style>
