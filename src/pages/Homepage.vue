<template lang="pug">
.wrapper
  h1.title
</template>

<script>
import Vue from 'vue'
export default {
  name: 'Homepage',
  data () {
    return {
    }
  },
  methods: {
    getContent (uid) {

    this.$prismic.client.query(
      this.$prismic.Predicates.at('document.type', 'menu'),
      { lang:  '*' }

    ).then((response) => {
      const document = response.results[0]
    }
  },
  created () {  
    console.log('CREATED');
    this.getContent(this.$route.params.uid)
  },
  beforeRouteUpdate (to, from, next) {
    this.getContent(to.params.uid)
    next()
  }
}
</script>

<style>
</style>