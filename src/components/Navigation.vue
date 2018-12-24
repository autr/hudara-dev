<template lang="pug">

.pageHeader: .container
  div(role="navigation").navbar.navbar-default
    .container-fluid
      .navbar-header
        a.logo(href='/') Hudara
      .collapse.navbar-collapse
        ul.nav.navbar-nav.navbar-left
          li(v-for='link in navLinks') 
            router-link(:to='`${link.item.slug}`') {{link.item.slug}}
</template>

<script>
export default {
  name: 'Navigation',
  data () {
    return {
      navLinks: []
    }
  },
  methods: {
    getNavigation() {

    this.$prismic.client.query(
      this.$prismic.Predicates.at('document.type', 'menu'),
      { lang:  '*' }

    ).then((response) => {
      const document = response.results[0]
      console.log('DOCUMENT', response, document.data.links);
      this.navLinks = document.data.links;
      // document contains the document content
    });

      // this.$prismic.client.getSingle('Navigation')
      //   .then((document) => {
      //     console.log('GET SINGLE', document);
      //     if (document) {
      //       console.log('woooo', document);
      //     } else {
      //       // this.$router.push({ name: 'not-found' })
      //     }
      //   }).catch( (err) => {
      //     console.log(err);
      //   });
    }
  },
  created () {  
    console.log('CREATED');
    this.getNavigation()
  },
  beforeRouteUpdate (to, from, next) {
    this.getNavigation()
    next()
  }
}
</script>

<style scoped>
</style>
