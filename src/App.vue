<template lang="pug">
#app
  navigation
  .container.light.topMargin.bottomMargin
    router-view

  app-footer
</template>

<script>
	
import Vue from 'vue'
import AppFooter from './components/AppFooter.vue'
import Navigation from './components/Navigation.vue'
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
      console.log('LOADING NAV', lang);
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
    AppFooter,
    Navigation
  }
}
</script>

<style lang="scss">
@import "./assets/css/site";
</style>
